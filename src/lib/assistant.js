import { CONFIG } from "./config.js";
import { answerByRules } from "./rules.js";

// Intenta primero la IA (función /api/chat). Si algo falla (sin red, cupo agotado, límite, error),
// responde el asistente por reglas. El resultado dice cuál respondió, para mostrarlo en pantalla.
export async function askAssistant(history, question) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CONFIG.AI_TIMEOUT_MS);
  try {
    const res = await fetch(CONFIG.CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...history.slice(-6), { role: "user", content: question }] }),
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error("http " + res.status);
    const data = await res.json();
    if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("vacío");
    return { text: data.reply.trim(), source: "ia" };
  } catch {
    return { text: answerByRules(question), source: "reglas" };
  } finally {
    clearTimeout(timer);
  }
}
