import { useState } from "react";
import Chips from "./Chips.jsx";
import { ESTADOS, LEGAL } from "../data/legal.js";
import { CONFIG } from "../lib/config.js";

export default function Legal() {
  const [f, setF] = useState("Todos");
  const items = LEGAL.filter((x) => f === "Todos" || ESTADOS[x.s] === f);
  return (
    <section className="panel">
      <h2>Trámites legales: qué necesitas y qué no</h2>
      <p className="lead">Guía general para {CONFIG.PAIS}, ordenada por obligación.</p>
      <p className="note">No es asesoría legal. Confirma montos, plazos y requisitos vigentes con Hacienda, CCSS, MEIC y tu municipalidad.</p>
      <Chips label="Filtrar por obligación" options={["Todos", ...Object.values(ESTADOS)]} value={f} onChange={setF} />
      {items.map((x) => (
        <div key={x.t} className={"card o-" + x.s}>
          <span className={"badge b-" + x.s}>{ESTADOS[x.s]}</span>
          <h3>{x.t}</h3>
          <p>{x.d}</p>
          {x.w && (
            <p className="meta">
              <b>Dónde:</b> {x.w}
              <br />
              <b>Qué llevar:</b> {x.doc}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
