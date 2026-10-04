// [Tema, Nivel, Título, premium (1), URL de YouTube]
// Para activar un video, pon la URL de YouTube como quinto valor. Ejemplo:
// ["Excel", "Básico", "Conoce Excel: celdas, filas y columnas", 0, "https://youtu.be/XXXXXXXXXXX"]
const RAW = [
  ["Excel", "Básico", "Conoce Excel: celdas, filas y columnas"],
  ["Excel", "Básico", "Fórmulas esenciales: SUMA, PROMEDIO, MAX y MIN"],
  ["Excel", "Básico", "Formato y tablas para ordenar tus datos"],
  ["Excel", "Básico", "Tu registro de ingresos y gastos"],
  ["Excel", "Intermedio", "Funciones SI, SUMAR.SI y CONTAR.SI"],
  ["Excel", "Intermedio", "BUSCARV y BUSCARX para tu catálogo"],
  ["Excel", "Intermedio", "Tablas dinámicas para analizar ventas"],
  ["Excel", "Intermedio", "Gráficos que se entienden"],
  ["Excel", "Avanzado", "Power Query: limpia datos automáticamente"],
  ["Excel", "Avanzado", "Buscar objetivo y escenarios"],
  ["Excel", "Avanzado", "Macros para tareas repetitivas", 1],
  ["Excel", "Avanzado", "Dashboard financiero de tu negocio", 1],
  ["Finanzas", "Básico", "Dinero personal vs. dinero del negocio"],
  ["Finanzas", "Básico", "Costos fijos y costos variables"],
  ["Finanzas", "Básico", "Margen de ganancia y cómo calcularlo"],
  ["Finanzas", "Básico", "Tu primer presupuesto mensual"],
  ["Finanzas", "Intermedio", "Cómo fijar el precio de venta"],
  ["Finanzas", "Intermedio", "Punto de equilibrio paso a paso"],
  ["Finanzas", "Intermedio", "Flujo de caja: proyecta 3 meses"],
  ["Finanzas", "Intermedio", "Leer un estado de resultados"],
  ["Finanzas", "Avanzado", "Capital de trabajo y ciclo de caja"],
  ["Finanzas", "Avanzado", "Créditos: tasa, plazo y costo real"],
  ["Finanzas", "Avanzado", "Evaluar inversiones: ROI, VAN y TIR", 1],
  ["Finanzas", "Avanzado", "Plan financiero a 12 meses", 1]
];

// Solo se aceptan IDs de YouTube de 11 caracteres; cualquier otra cosa se ignora.
export function youtubeId(url) {
  const m = String(url || "").match(/^https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:[?&#].*)?$/);
  return m ? m[1] : null;
}

export const LESSONS = RAW.map((a, i) => ({
  id: i,
  area: a[0],
  nivel: a[1],
  t: a[2],
  p: a[3] || 0,
  video: youtubeId(a[4]),
  min: 5 + ((i * 7) % 6)
}));

export const NIVELES = ["Básico", "Intermedio", "Avanzado"];
