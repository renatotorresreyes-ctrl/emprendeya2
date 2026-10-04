import { useEffect, useRef, useState } from "react";
import { LESSONS, NIVELES } from "../data/lessons.js";
import { isLocked } from "../lib/config.js";

function Player({ lesson }) {
  const ref = useRef(null);
  useEffect(() => {
    if (lesson) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [lesson]);
  if (!lesson) return <div ref={ref} />;
  return (
    <div className="player" ref={ref}>
      <h3>{lesson.t}</h3>
      {lesson.video ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${lesson.video}`}
          title={lesson.t}
          sandbox="allow-scripts allow-same-origin allow-presentation"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen"
          allowFullScreen
        />
      ) : (
        <div className="ph">
          <p>
            <b>Video de {lesson.min} min (espacio reservado)</b>
            <br />
            Agrega la URL de YouTube de esta lección en <code>src/data/lessons.js</code>.
          </p>
        </div>
      )}
    </div>
  );
}

export default function Videos({ currentId }) {
  const [area, setArea] = useState("Todas");
  const [nivel, setNivel] = useState("Todos");
  const [selected, setSelected] = useState(currentId);
  useEffect(() => setSelected(currentId), [currentId]);

  const lessons = LESSONS.filter((l) => (area === "Todas" || l.area === area) && (nivel === "Todos" || l.nivel === nivel));
  return (
    <section className="panel">
      <h2>Videos</h2>
      <p className="lead">Lecciones cortas de 5 a 10 minutos.</p>
      <Player lesson={selected == null ? null : LESSONS[selected]} />
      <div className="bar">
        <label>
          Tema{" "}
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            {["Todas", "Excel", "Finanzas"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          Nivel{" "}
          <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
            {["Todos", ...NIVELES].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid">
        {lessons.length === 0 && <p>Sin resultados.</p>}
        {lessons.map((l) => (
          <div key={l.id} className="card">
            <h3>{l.t}</h3>
            <p className="meta">
              {l.area} · {l.nivel} · {l.min} min
            </p>
            {isLocked(l) ? (
              <span className="lock">🔒 Premium</span>
            ) : (
              <button type="button" className="btn sm" onClick={() => setSelected(l.id)}>
                ▶ Ver
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
