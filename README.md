# emprende.ya

Plataforma gratuita con trámites legales, cursos de Excel y finanzas, plantillas `.xlsx`, videos y un asistente virtual.
Hecha con **React + Vite**, lista para **Cloudflare Pages**.

## Qué lleva

| Carpeta | Contenido |
|---|---|
| `src/data/` | Todo el contenido editable: trámites, lecciones, plantillas, preguntas rápidas |
| `src/lib/config.js` | Modo premium, país, límites del chat |
| `src/lib/rules.js` | Asistente por reglas (respaldo sin IA) |
| `functions/api/chat.js` | Lógica del asistente con Llama 3.1 (usada por Pages y por Workers) |
| `worker/index.js`, `wrangler.jsonc` | Entrada y configuración para el flujo de Workers |
| `public/plantillas/` | Los 9 archivos `.xlsx` (tu plantilla + 8 más) |
| `public/_headers` | Seguridad: CSP estricta y cabeceras |

## Probar en tu computadora

```bash
npm install
npm run dev
```

En este modo `/api/chat` no existe, así que el asistente responde con las reglas. Es lo esperado.
Para probar la IA, lo más simple es publicar (abajo) y probar en la URL de Cloudflare.

## Publicar en Cloudflare Pages

1. Sube esta carpeta a un repositorio de GitHub (`node_modules` y `dist` ya están ignorados).
2. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
3. Configuración de build:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Save and Deploy.** Cloudflare detecta la carpeta `functions/` y crea `/api/chat` solo.

## Publicar en Cloudflare con el flujo de WORKERS (pantalla "Set up your application")

El proyecto también funciona si Cloudflare te lleva al flujo de Workers. Ya incluye `wrangler.jsonc` y `worker/index.js`.

1. **Workers & Pages → Create application → Continue with GitHub** (o la opción de Git que veas) y elige el repositorio.
2. En **Set up your application** llena:
   - **Project name:** `emprende-ya` (debe ser igual al `name` de `wrangler.jsonc`; si usas otro nombre, cámbialo en ese archivo).
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Preview command** (ramas que no son la principal): déjalo como viene (normalmente `npx wrangler versions upload`).
   - **Root directory** (Advanced): vacío, salvo que `package.json` esté dentro de una subcarpeta.
3. **Deploy.**

Con este flujo, Workers AI (Llama 3.1) ya queda conectado por `wrangler.jsonc` (`"ai": {"binding": "AI"}`), sin pasos extra.
Los bindings se manejan desde `wrangler.jsonc`: si agregas el KV de límites (ver comentario dentro del archivo), hazlo ahí
y no solo en el panel, porque el panel puede sobrescribirse en el siguiente despliegue.

## Activar la IA del asistente (elige una)

**Opción A: Workers AI (recomendada, sin claves).** Corre Llama 3.1 8B dentro de Cloudflare.
1. En tu proyecto: **Settings → Bindings → Add → Workers AI**.
2. Nombre de variable: `AI`. Hazlo en Production (y en Preview si quieres).
3. Vuelve a desplegar (Deployments → Retry deployment).

**Opción B: Groq u OpenRouter (Llama 3.1 con clave).**
1. **Settings → Variables and Secrets** → agrega `AI_API_KEY` como **Secret**.
2. Opcional: `AI_URL` y `AI_MODEL` (por defecto usa Groq con `llama-3.1-8b-instant`).
   Para OpenRouter: `AI_URL=https://openrouter.ai/api/v1/chat/completions`, `AI_MODEL=meta-llama/llama-3.1-8b-instruct`.
3. Vuelve a desplegar.

Revisa en el catálogo de cada proveedor que el modelo siga disponible y cuánto cuesta el uso.

## Poner límite de uso (recomendado)

1. **Storage & Databases → KV → Create namespace** (por ejemplo `emprende-rate`).
2. En el proyecto: **Settings → Bindings → Add → KV namespace**, variable `RATE_KV`.
3. Opcional: variables `LIMIT_PER_HOUR` (por IP, por defecto 30) y `LIMIT_PER_DAY` (total, por defecto 1500).

Cuando se llega al límite, la página sigue respondiendo con el asistente por reglas.

## Cómo editar

- **Videos:** en `src/data/lessons.js`, agrega la URL de YouTube como quinto valor de cada lección.
- **Trámites:** `src/data/legal.js`. Revisa montos y versiones antes de publicar (los copié de tu versión original).
- **Respuestas del asistente sin IA:** agrega un bloque a `KB` en `src/lib/rules.js`.
- **Premium:** en `src/lib/config.js` pon `PREMIUM_MODE: true` y marca `p: 1` en lo que quieras bloquear.
  Ojo: hoy el candado solo oculta el botón. Los `.xlsx` de `public/` siguen siendo accesibles por URL directa.
  Para bloqueo real hay que servir esos archivos desde una función que verifique el login.
- **Plantillas:** reemplaza los archivos de `public/plantillas/` o regenera las 8 simples con `npm run plantillas`
  (requiere Python con `openpyxl`). Después ábrelas y guárdalas en Excel una vez para que traigan valores calculados.

## Seguridad incluida

- CSP estricta: solo scripts y estilos del propio sitio, y solo iframes de `youtube-nocookie.com`.
- Sin `onclick` en el HTML, sin `innerHTML`, sin scripts externos. React muestra el texto de la IA siempre como texto.
- Descargas como archivos `.xlsx` reales, sin generarlas con JavaScript.
- Iframes de YouTube con `sandbox`.
- La función solo acepta peticiones del mismo sitio, valida y recorta el contenido, y no devuelve detalles de errores.
