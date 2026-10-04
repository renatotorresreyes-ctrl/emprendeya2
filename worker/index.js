// Punto de entrada para el flujo de WORKERS de Cloudflare (Workers Builds + Static Assets).
// Reutiliza exactamente la misma lógica de functions/api/chat.js (la de Pages).
// En el flujo de Pages esta carpeta se ignora.
import { onRequestPost, onRequest } from "../functions/api/chat.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/chat") {
      return request.method === "POST" ? onRequestPost({ request, env }) : onRequest();
    }
    // Todo lo demás (la página, las plantillas .xlsx) sale de la carpeta dist.
    return env.ASSETS.fetch(request);
  }
};
