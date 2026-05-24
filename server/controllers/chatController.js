import ChatSession from "../models/ChatSession.js";
import { generateChatReply, getFallbackReply } from "../services/geminiService.js";

const CRISIS_PATTERNS = [
  /suicid/i,
  /kill myself/i,
  /end my life/i,
  /want to die/i,
  /self[- ]?harm/i,
  /hurt myself/i,
];

const WELCOME =
  "Hello—I'm MindCare Assistant. I'm here to listen and share gentle coping ideas. I can't diagnose conditions. How are you feeling today?";

function detectCrisis(text) {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

function crisisReply() {
  return `I'm really glad you reached out. Your safety matters. I can't provide emergency care, but please contact someone now:
• Police: 15
• Rescue (where available): 1122
• Umang mental health helpline: 0311-7786264
• Taskeen: 0316-8275336
• Rozan (toll-free): 0800-22444

If you can, speak with a trusted person or go to the nearest hospital emergency. You deserve support.`;
}

async function resolveAssistantReply(history, userText) {
  if (detectCrisis(userText)) {
    return { text: crisisReply(), source: "crisis" };
  }

  try {
    const { text, model } = await generateChatReply(history, userText);
    return { text, source: "gemini", model };
  } catch (err) {
    console.error("[Chat] Gemini error:", err.type || "unknown", err.message || err);
    return { text: getFallbackReply(), source: "fallback", errorType: err.type };
  }
}

async function getOrCreateSession(userId) {
  let session = await ChatSession.findOne({ user: userId });
  if (!session) {
    session = await ChatSession.create({
      user: userId,
      messages: [{ role: "assistant", text: WELCOME }],
    });
  }
  return session;
}

export async function getChatHistory(req, res, next) {
  try {
    const session = await getOrCreateSession(req.userId);
    res.json({ messages: session.messages });
  } catch (err) {
    next(err);
  }
}

/** Unified chat: guests + optional JWT (saves history when authenticated). */
export async function chat(req, res, next) {
  try {
    const { message, history = [] } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }
    const userText = message.trim();

    if (req.userId) {
      const session = await getOrCreateSession(req.userId);
      session.messages.push({ role: "user", text: userText });

      const priorHistory = session.messages.slice(-12, -1);
      const { text, source, model, errorType } = await resolveAssistantReply(priorHistory, userText);

      session.messages.push({ role: "assistant", text });
      if (session.messages.length > 50) {
        session.messages = session.messages.slice(-50);
      }
      await session.save();

      return res.json({
        reply: text,
        messages: session.messages,
        source,
        model: model || null,
        errorType: errorType || null,
      });
    }

    const trimmedHistory = Array.isArray(history)
      ? history.slice(-10).filter((m) => m.role && m.text)
      : [];

    const { text, source, model, errorType } = await resolveAssistantReply(trimmedHistory, userText);

    return res.json({
      reply: text,
      source,
      model: model || null,
      errorType: errorType || null,
    });
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const session = await getOrCreateSession(req.userId);
    session.messages.push({ role: "user", text: message.trim() });

    const priorHistory = session.messages.slice(-12, -1);
    const { text, source, model, errorType } = await resolveAssistantReply(priorHistory, message.trim());

    session.messages.push({ role: "assistant", text });
    if (session.messages.length > 50) {
      session.messages = session.messages.slice(-50);
    }
    await session.save();

    res.json({
      reply: text,
      messages: session.messages,
      source,
      model: model || null,
      errorType: errorType || null,
    });
  } catch (err) {
    next(err);
  }
}

export async function sendMessagePublic(req, res, next) {
  req.userId = undefined;
  return chat(req, res, next);
}
