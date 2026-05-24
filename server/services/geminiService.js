const SYSTEM_PROMPT = `You are MindCare Assistant, a calm emotional-support companion for users in Pakistan.
Rules:
- Never diagnose medical or psychiatric conditions.
- Never prescribe medication or claim to be a therapist.
- Offer empathy, grounding ideas, sleep hygiene, journaling prompts, and gentle encouragement.
- If the user mentions crisis, self-harm, or suicide, urge them to call Police 15, rescue 1122 where available, or Pakistani helplines: Umang 0311-7786264, Taskeen 0316-8275336, Rozan toll-free 0800-22444.
- Keep replies concise (2-4 short paragraphs max), warm, culturally respectful, and Islam-sensitive (no religious symbols or non-Islamic spiritual practices).
- Suggest professional help when distress is severe or persistent.`;

const MODEL_FALLBACKS = [
  process.env.GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-8b",
].filter(Boolean);

const FALLBACK_REPLIES = [
  "Thank you for sharing that with me. What you're feeling matters. I can't replace a therapist, but taking one small step today—water, a short walk, or texting someone you trust—can help. Pakistani helplines like Umang (0311-7786264) offer free support if you'd like to talk to a person.",
  "I hear you, and you're not alone in this. Stress and sadness are heavy, especially when family or money worries pile up. Professional therapy is normal and effective in Pakistan. Would you like a simple grounding exercise, or to explore our Resources page for helplines?",
  "It sounds like you've been carrying a lot. You deserve care—not judgment. If speaking with someone feels right, Taskeen (0316-8275336) and Rozan (0800-22444) are confidential options. I'm here to listen; what feels hardest right now?",
];

export function getApiKey() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return null;
  return key;
}

export function getFallbackReply() {
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

function parseGeminiError(status, bodyText) {
  let parsed;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    parsed = null;
  }
  const message = parsed?.error?.message || bodyText || "Unknown Gemini error";
  const code = parsed?.error?.status || status;

  if (status === 400 && /API key/i.test(message)) {
    return { type: "invalid_key", message: "Invalid Gemini API key. Update GEMINI_API_KEY in server/.env." };
  }
  if (status === 403) {
    return { type: "forbidden", message };
  }
  if (status === 429 || /quota|RESOURCE_EXHAUSTED/i.test(message)) {
    return { type: "quota", message: "Gemini quota exceeded. Try again later or switch GEMINI_MODEL to gemini-2.5-flash." };
  }
  if (status === 404) {
    return { type: "model_not_found", message: `Model not available: ${message}` };
  }
  return { type: "api_error", message, code };
}

function buildContents(history, userMessage) {
  const safeHistory = Array.isArray(history)
    ? history.filter((m) => m?.role && m?.text).slice(-12)
    : [];

  return [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I will follow these guidelines." }] },
    ...safeHistory.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: String(m.text).slice(0, 4000) }],
    })),
    { role: "user", parts: [{ text: String(userMessage).slice(0, 4000) }] },
  ];
}

function extractText(data) {
  const candidate = data?.candidates?.[0];
  if (!candidate) return null;

  const blocked = candidate.finishReason === "SAFETY" || candidate.finishReason === "RECITATION";
  if (blocked) return null;

  const parts = candidate.content?.parts;
  if (!Array.isArray(parts)) return null;

  const text = parts.map((p) => p.text || "").join("").trim();
  return text || null;
}

async function callModel(model, apiKey, history, userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: buildContents(history, userMessage),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
        topP: 0.95,
      },
    }),
  });

  const bodyText = await response.text();

  if (!response.ok) {
    const err = parseGeminiError(response.status, bodyText);
    err.status = response.status;
    throw err;
  }

  let data;
  try {
    data = JSON.parse(bodyText);
  } catch {
    throw { type: "malformed_response", message: "Could not parse Gemini JSON response" };
  }

  const text = extractText(data);
  if (!text) {
    throw { type: "empty_response", message: "Gemini returned no text (safety block or empty candidate)" };
  }

  return text;
}

/**
 * Call Gemini with model fallbacks. Returns { text, model } or throws typed error.
 */
export async function generateChatReply(history, userMessage) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw { type: "missing_key", message: "GEMINI_API_KEY is not set in server/.env" };
  }

  if (!userMessage?.trim()) {
    throw { type: "empty_prompt", message: "Message cannot be empty" };
  }

  const models = [...new Set(MODEL_FALLBACKS)];
  let lastError;

  for (const model of models) {
    try {
      const text = await callModel(model, apiKey, history, userMessage);
      console.log(`[Gemini] OK model=${model} chars=${text.length}`);
      return { text, model };
    } catch (err) {
      lastError = err;
      console.error(`[Gemini] model=${model} failed:`, err.type || "error", err.message || err);

      if (err.type === "invalid_key" || err.type === "forbidden") break;
      if (err.type === "empty_prompt") break;
    }
  }

  throw lastError || { type: "api_error", message: "All Gemini models failed" };
}

export { SYSTEM_PROMPT };
