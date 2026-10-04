import { useEffect, useRef, useState } from "react";
import { QUICK } from "../data/quick.js";
import { askAssistant } from "../lib/assistant.js";
import { CONFIG } from "../lib/config.js";

const HOLA = {
  role: "assistant",
  content: "¡Hola! Soy el asistente de emprende.ya. Pregúntame sobre precios, costos, Excel, flujo de caja o trámites.",
  source: null
};

export default function Assistant() {
  const [msgs, setMsgs] = useState([HOLA]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [count, setCount] = useState(0);
  const box = useRef(null);

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [msgs]);

  const limitReached = count >= CONFIG.MAX_MESSAGES;

  async function ask(raw) {
    const q = raw.trim().slice(0, CONFIG.MAX_CHARS);
    if (!q || busy || limitReached) return;
    const history = msgs.filter((m) => m !== HOLA).map(({ role, content }) => ({ role, content }));
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setText("");
    setBusy(true);
    setCount((c) => c + 1);
    const r = await askAssistant(history, q);
    setMsgs((m) => [...m, { role: "assistant", content: r.text, source: r.source }]);
    setBusy(false);
  }

  return (
    <section className="panel">
      <h2>Asistente virtual</h2>
      <p className="lead">Responde con IA (Llama 3.1) y, si no está disponible, con respuestas preparadas por el equipo.</p>
      <div className="bar" role="group" aria-label="Preguntas rápidas">
        {Object.keys(QUICK).map((k) => (
          <button key={k} type="button" className="chip" disabled={busy || limitReached} onClick={() => ask(QUICK[k])}>
            {k}
          </button>
        ))}
      </div>
      <div className="chat" ref={box} aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={"msg " + (m.role === "user" ? "u" : "a")}>
            {m.content}
            {m.source === "reglas" && <span className="src">Respuesta preparada (modo sin IA)</span>}
          </div>
        ))}
        {busy && <div className="msg a">Pensando…</div>}
      </div>
      {limitReached && <p className="note">Llegaste al límite de preguntas de esta visita. Recarga la página para seguir.</p>}
      <div className="row">
        <input
          value={text}
          maxLength={CONFIG.MAX_CHARS}
          placeholder="Escribe tu pregunta…"
          aria-label="Pregunta"
          disabled={limitReached}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(text)}
        />
        <button type="button" className="btn" disabled={busy || limitReached} onClick={() => ask(text)}>
          Enviar
        </button>
      </div>
      <p className="meta small">No compartas datos personales, contraseñas ni números de cuenta. No es asesoría legal ni fiscal.</p>
    </section>
  );
}
