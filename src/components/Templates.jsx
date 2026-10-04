import { useState } from "react";
import Chips from "./Chips.jsx";
import { CATEGORIAS, TEMPLATES } from "../data/templates.js";
import { isLocked } from "../lib/config.js";

export default function Templates() {
  const [f, setF] = useState("Todas");
  const items = TEMPLATES.filter((p) => f === "Todas" || p.c === f);
  return (
    <section className="panel">
      <h2>Plantillas de Excel de finanzas</h2>
      <p className="lead">Archivos .xlsx listos para abrir en Excel. Las celdas amarillas son las que tú llenas.</p>
      <Chips label="Filtrar por categoría" options={CATEGORIAS} value={f} onChange={setF} />
      <div className="grid">
        {items.map((p) => (
          <div key={p.id} className={"card" + (p.destacada ? " star" : "")}>
            <span className="badge b-caso">{p.c}</span>
            <h3>{p.t}</h3>
            <p className="meta">{p.h.join(" · ")}</p>
            {isLocked(p) ? (
              <span className="lock">🔒 Premium</span>
            ) : (
              <a className="btn sm" href={`/plantillas/${p.id}.xlsx`} download>
                Descargar .xlsx
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
