import { useState } from "react";
import Chips from "./Chips.jsx";
import { LESSONS, NIVELES } from "../data/lessons.js";
import { isLocked } from "../lib/config.js";

export default function Courses({ area, titulo, lead, onPlay }) {
  const [f, setF] = useState("Todos");
  const niveles = NIVELES.filter((n) => f === "Todos" || f === n);
  return (
    <section className="panel">
      <h2>{titulo}</h2>
      <p className="lead">{lead}</p>
      <Chips label="Filtrar por nivel" options={["Todos", ...NIVELES]} value={f} onChange={setF} />
      {niveles.map((n) => {
        const items = LESSONS.filter((l) => l.area === area && l.nivel === n);
        return (
          <details key={n} open>
            <summary>
              Nivel {n} · {items.length} lecciones
            </summary>
            <ul>
              {items.map((l) => (
                <li key={l.id}>
                  <span>{l.t}</span>
                  <span className="dur">{l.min} min</span>
                  {isLocked(l) ? (
                    <span className="lock">🔒 Premium</span>
                  ) : (
                    <button type="button" className="btn sm" onClick={() => onPlay(l.id)}>
                      ▶ Ver video
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </section>
  );
}
