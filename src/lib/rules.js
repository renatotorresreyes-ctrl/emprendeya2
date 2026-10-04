// Asistente por reglas: funciona sin internet y sin IA. Es el respaldo cuando la IA falla o se acaba el cupo.
// Para enseñarle algo nuevo, agrega un bloque a KB con sus palabras clave (sin tildes, en minúscula).
import { LEGAL } from "../data/legal.js";

const norm = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ").trim();

const AVISO = "\n\nEs información general: confirma montos y requisitos vigentes con la institución o con un contador.";

const KB = [
  {
    k: ["saludo", "hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey"],
    a: "¡Hola! Puedo ayudarte con precios, costos, margen, punto de equilibrio, flujo de caja, presupuesto, Excel y trámites para formalizar tu negocio. ¿Qué quieres saber?"
  },
  {
    k: ["gracias", "muchas gracias", "excelente", "perfecto"],
    a: "¡Con gusto! Si tienes otra duda sobre tu negocio, aquí estoy."
  },
  {
    k: ["precio de venta", "precio", "cobrar", "cuanto cobro", "fijar el precio", "poner precio", "precio sugerido"],
    a: "Una forma sencilla de fijar el precio es:\n\nPrecio = Costo total / (1 − margen deseado)\n\nEjemplo: si un producto te cuesta ₡2 000 en total y quieres ganar 40 % sobre la venta:\n₡2 000 / (1 − 0,40) = ₡2 000 / 0,60 = ₡3 333.\n\nEl costo total incluye materiales, mano de obra, otros costos variables y una parte de tus gastos fijos (alquiler, servicios). La plantilla «Costeo y precios» del archivo completo hace este cálculo por ti."
  },
  {
    k: ["costos fijos", "costos variables", "costo fijo", "costo variable", "fijos y variables", "costos", "costo"],
    a: "Costos fijos: los pagas igual vendas mucho o poco. Ejemplo: alquiler del local ₡150 000, internet, salario fijo.\n\nCostos variables: suben o bajan con lo que vendes. Ejemplo: si cada pastel lleva ₡1 200 de ingredientes y vendes 100, tu costo variable es ₡120 000.\n\nSeparar ambos te permite calcular tu margen y tu punto de equilibrio."
  },
  {
    k: ["margen", "ganancia", "utilidad", "cuanto gano", "rentabilidad", "markup"],
    a: "Margen de ganancia = (Precio − Costo) / Precio.\n\nEjemplo: vendes a ₡3 500 y el costo variable es ₡1 200. Ganas ₡2 300 por unidad, o sea 65,7 % de margen.\n\nUtilidad del negocio = Ingresos − Gastos. Para que sea real, registra solo movimientos del negocio y mantén tus finanzas personales aparte."
  },
  {
    k: ["punto de equilibrio", "equilibrio", "cuantas unidades debo vender", "recuperar costos"],
    a: "Punto de equilibrio = Costos fijos / (Precio − Costo variable).\n\nEjemplo: costos fijos de ₡1 800 000 al mes, precio ₡3 500 y costo variable ₡1 200:\n₡1 800 000 / (₡3 500 − ₡1 200) = 783 unidades al mes.\n\nPor debajo de eso pierdes dinero; por encima, ganas. Hay una plantilla «Punto de equilibrio» lista para descargar."
  },
  {
    k: ["flujo de caja", "flujo", "liquidez", "me falta plata", "proyectar", "proyeccion"],
    a: "Flujo de caja = el dinero que realmente entra y sale cada mes. Para armarlo a 3 meses:\n\n1. Anota tu saldo inicial (lo que tienes hoy).\n2. Estima los ingresos que de verdad vas a cobrar cada mes.\n3. Estima todos los egresos: proveedores, alquiler, salarios, impuestos.\n4. Saldo final = saldo inicial + ingresos − egresos. Ese saldo es el inicial del mes siguiente.\n\nSi un mes sale negativo, ya sabes cuándo necesitarás financiamiento o recortar gastos. Descarga la plantilla «Flujo de caja mensual»."
  },
  {
    k: ["presupuesto", "presupuestar", "gastos mensuales", "controlar gastos", "ahorrar"],
    a: "Un presupuesto mensual tiene 3 pasos:\n\n1. Lista tus rubros (alquiler, materia prima, servicios, transporte, marketing...).\n2. Escribe cuánto planeas gastar en cada uno.\n3. Al cierre del mes compara con lo real y mira la diferencia.\n\nEmpieza con los gastos de los últimos 2 o 3 meses como referencia. La plantilla «Presupuesto mensual» calcula la diferencia y el % usado."
  },
  {
    k: ["excel", "formula", "formulas", "suma", "buscarv", "tabla dinamica", "tablas dinamicas", "hoja de calculo", "celdas"],
    a: "Para tu negocio, aprende las fórmulas en este orden:\n\n1. SUMA y PROMEDIO: totales de ventas y gastos.\n2. SI: decisiones simples, por ejemplo «Reponer» si el inventario está bajo.\n3. SUMAR.SI: total de ventas por producto o gastos por categoría.\n4. BUSCARV (o BUSCARX): traer el precio de un producto por su código.\n5. Tablas dinámicas: analizar ventas por mes o producto.\n\nEn la pestaña Excel tienes lecciones por nivel y en Plantillas, archivos listos para usar."
  },
  {
    k: ["inventario", "existencias", "stock", "mercaderia", "reponer"],
    a: "Para controlar tu inventario anota por producto: código, existencias, mínimo y costo unitario. Valor del inventario = existencias × costo. Cuando las existencias lleguen al mínimo, toca reponer.\n\nLa plantilla «Control de inventario» ya marca «Reponer» automáticamente."
  },
  {
    k: ["credito", "prestamo", "financiamiento", "tasa de interes", "interes", "cuota", "banco"],
    a: "Antes de pedir un crédito mira el costo real, no solo la cuota:\n\n• Costo total aproximado = cuota × número de cuotas.\n• Costo del crédito = total pagado − monto recibido.\n• Pregunta por comisiones, seguros y gastos de formalización.\n\nEjemplo: pides ₡1 000 000 y pagas 12 cuotas de ₡95 000: pagas ₡1 140 000, o sea ₡140 000 de costo.\n\nRegla práctica: la cuota debe salir de tu flujo de caja con holgura, sin dejarte sin capital de trabajo."
  },
  {
    k: ["separar", "dinero personal", "finanzas personales", "mezclar", "sueldo propio"],
    a: "Separa el dinero personal del negocio: usa una cuenta distinta y págate un monto fijo (tu «salario») cada mes. Así sabes si el negocio es rentable de verdad y no confundes retiros personales con gastos."
  },
  {
    k: ["plantilla", "plantillas", "descargar", "descarga", "archivo excel", "xlsx"],
    a: "En la pestaña Plantillas puedes descargar archivos .xlsx listos para abrir en Excel: la plantilla financiera completa (dashboard, movimientos, costeo y presupuesto), registro de ventas, control de gastos, costos por producto, punto de equilibrio, flujo de caja, inventario y presupuesto mensual."
  },
  {
    k: ["tramite", "tramites", "formalizar", "formalizacion", "legal", "permisos", "requisitos", "abrir un negocio", "empezar un negocio"],
    a: () => {
      const ob = LEGAL.filter((x) => x.s === "ob").map((x) => "• " + x.t).join("\n");
      return "Lo básico y obligatorio para formalizar tu negocio en Costa Rica:\n" + ob + "\n\nSegún tu caso también puedes necesitar uso de suelo, permiso sanitario, patente municipal o la póliza del INS si tienes empleados. Mira la pestaña Trámites legales para el detalle de dónde ir y qué llevar." + AVISO;
    }
  }
];

// Preguntas puntuales sobre un trámite: se responden con los datos de la pestaña Trámites.
const LEGAL_KEYS = [
  { k: ["hacienda", "rut", "tribu", "contribuyente"], t: "Inscripción en Hacienda" },
  { k: ["ccss", "caja costarricense", "seguro social", "cargas sociales", "planilla"], t: "Inscripción en la CCSS" },
  { k: ["renta", "iva", "declaracion", "declaraciones", "impuesto", "impuestos"], t: "Declaraciones e impuestos" },
  { k: ["factura", "facturar", "facturacion", "factura electronica"], t: "Factura electrónica (régimen tradicional)" },
  { k: ["ins", "poliza", "riesgos del trabajo", "asegurar empleados"], t: "Póliza de Riesgos del Trabajo" },
  { k: ["uso de suelo"], t: "Uso de suelo" },
  { k: ["permiso sanitario", "ministerio de salud", "sanitario"], t: "Permiso Sanitario de Funcionamiento" },
  { k: ["patente", "municipalidad"], t: "Patente municipal" },
  { k: ["sociedad", "sa", "srl", "s a", "s r l", "persona juridica", "notario"], t: "Crear una sociedad" },
  { k: ["meic", "pyme", "siec"], t: "Registro PYME del MEIC" },
  { k: ["regimen simplificado", "simplificado"], t: "Factura electrónica en el régimen simplificado" }
];

function legalAnswer(item) {
  const partes = [`${item.t}: ${item.d}`];
  if (item.w) partes.push(`Dónde: ${item.w}`);
  if (item.doc) partes.push(`Qué llevar: ${item.doc}`);
  return partes.join("\n") + AVISO;
}

function score(keys, text) {
  let s = 0;
  for (const key of keys) {
    const hit = key.length <= 3 ? ` ${text} `.includes(` ${key} `) : text.includes(key); // claves cortas: palabra completa
    if (hit) s += key.includes(" ") ? 3 : 1;
  }
  return s;
}

export const AYUDA =
  "No tengo una respuesta preparada para eso. Puedo ayudarte con: precios, costos fijos y variables, margen, punto de equilibrio, flujo de caja, presupuesto, inventario, créditos, fórmulas de Excel y trámites para formalizar tu negocio. Prueba con una de esas preguntas.";

export function answerByRules(question) {
  const text = norm(question);
  let best = { s: 0, a: null };

  for (const e of KB) {
    const s = score(e.k, text);
    if (s > best.s) best = { s, a: e.a };
  }
  for (const e of LEGAL_KEYS) {
    const hits = score(e.k, text);
    const s = hits > 0 ? hits + 0.5 : 0; // desempata a favor del trámite puntual, solo si hubo coincidencia
    if (s > best.s) {
      const item = LEGAL.find((x) => x.t.startsWith(e.t));
      if (item) best = { s, a: legalAnswer(item) };
    }
  }
  if (!best.a) return AYUDA;
  return typeof best.a === "function" ? best.a() : best.a;
}
