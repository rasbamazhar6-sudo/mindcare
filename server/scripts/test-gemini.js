import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY;
const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.5-flash-preview-05-20", "gemini-2.5-flash"];

for (const model of models) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: "Hi" }] }],
      generationConfig: { maxOutputTokens: 32 },
    }),
  });
  const body = await res.json();
  const reply = body?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log(model, res.status, reply ? `OK: ${reply.slice(0, 40)}` : body?.error?.message?.slice(0, 80));
}
