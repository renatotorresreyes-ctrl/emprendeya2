// Configuración general. Aquí se cambia todo lo "de negocio".
export const CONFIG = {
  PREMIUM_MODE: false,    // true = bloquea lo marcado como premium. Hoy todo es gratis.
  USER_IS_PREMIUM: false, // más adelante conéctalo a tu login o pago
  PAIS: "Costa Rica",
  CHAT_ENDPOINT: "/api/chat",
  MAX_CHARS: 500,          // largo máximo de cada pregunta
  MAX_MESSAGES: 30,        // preguntas por visita (límite de cortesía; el límite real está en el servidor)
  AI_TIMEOUT_MS: 20000
};

export const isLocked = (item) => CONFIG.PREMIUM_MODE && item.p && !CONFIG.USER_IS_PREMIUM;
