import { useState } from "react";
import Legal from "./components/Legal.jsx";
import Courses from "./components/Courses.jsx";
import Templates from "./components/Templates.jsx";
import Videos from "./components/Videos.jsx";
import Assistant from "./components/Assistant.jsx";

const TABS = [
  ["legal", "Trámites legales"],
  ["excel", "Excel"],
  ["fin", "Finanzas"],
  ["plant", "Plantillas"],
  ["vid", "Videos"],
  ["ia", "Asistente"]
];

export default function App() {
  const [tab, setTab] = useState("legal");
  const [lesson, setLesson] = useState(null);

  const play = (id) => {
    setLesson(id);
    setTab("vid");
  };

  return (
    <>
      <header className="top">
        <div className="w">
          <span className="logo">
            emprende<span>.ya</span>
          </span>
          <span className="meta">Plataforma gratuita</span>
        </div>
      </header>

      <div className="hero">
        <div className="w">
          <span className="tag">100 % gratis</span>
          <h1>Aprende finanzas, Excel y trámites para tu negocio</h1>
          <p>Cursos por nivel, videos de 5 a 10 minutos, plantillas listas y un asistente virtual que responde tus dudas de emprendedor.</p>
          <button type="button" className="btn" onClick={() => setTab("legal")}>
            Empezar ahora
          </button>
        </div>
      </div>

      <nav className="tabs" aria-label="Secciones">
        <div className="w" role="tablist">
          {TABS.map(([k, n]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      <main className="w">
        {tab === "legal" && <Legal />}
        {tab === "excel" && <Courses area="Excel" titulo="Excel para emprendedores" lead="De tu primera hoja a un dashboard financiero." onPlay={play} />}
        {tab === "fin" && <Courses area="Finanzas" titulo="Cursos de finanzas para emprendedores" lead="Costos, precios, flujo de caja y financiamiento." onPlay={play} />}
        {tab === "plant" && <Templates />}
        {tab === "vid" && <Videos currentId={lesson} />}
        {tab === "ia" && <Assistant />}
      </main>

      <footer>
        <div className="w">emprende.ya · Proyecto educativo. La información legal es general y no sustituye a un profesional.</div>
      </footer>
    </>
  );
}
