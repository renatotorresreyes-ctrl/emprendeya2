// Plantillas .xlsx reales, guardadas en public/plantillas/. p:1 = premium.
// Nota: el candado premium solo oculta el botón. Para bloqueo real hay que servir el archivo desde una función con login.
export const TEMPLATES = [
  { id: "plantilla-financiera-emprendedores", t: "Plantilla financiera completa", c: "Panel completo", p: 0, h: ["Dashboard", "Movimientos", "Costeo y precios", "Presupuesto"], destacada: true },
  { id: "registro-de-ventas", t: "Registro de ventas", c: "Ventas", p: 0, h: ["Fecha", "Producto", "Cantidad", "Precio unitario", "Total"] },
  { id: "control-de-gastos", t: "Control de gastos", c: "Costos", p: 0, h: ["Fecha", "Categoría", "Descripción", "Monto", "Método de pago"] },
  { id: "costos-por-producto", t: "Costos por producto", c: "Costos", p: 0, h: ["Producto", "Costo variable", "Precio de venta", "Margen"] },
  { id: "punto-de-equilibrio", t: "Punto de equilibrio", c: "Costos", p: 0, h: ["Precio", "Costo variable", "Costos fijos", "Unidades de equilibrio"] },
  { id: "flujo-de-caja", t: "Flujo de caja mensual", c: "Flujo de caja", p: 0, h: ["Mes", "Saldo inicial", "Ingresos", "Egresos", "Saldo final"] },
  { id: "inventario", t: "Control de inventario", c: "Inventario", p: 0, h: ["Código", "Producto", "Existencias", "Mínimo", "Costo", "Valor total"] },
  { id: "presupuesto-mensual", t: "Presupuesto mensual", c: "Presupuesto", p: 0, h: ["Rubro", "Presupuestado", "Real", "Diferencia"] },
  { id: "plan-financiero-12-meses", t: "Plan financiero a 12 meses", c: "Presupuesto", p: 1, h: ["Mes", "Ventas", "Costos", "Gastos", "Utilidad"] }
];

export const CATEGORIAS = ["Todas", "Panel completo", "Ventas", "Costos", "Flujo de caja", "Inventario", "Presupuesto"];
