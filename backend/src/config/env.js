const DEFAULT_PORT = 8080;
const DEFAULT_CLIENT_ORIGINS = "http://localhost:5173,https://scaler-persona-bot.netlify.app";
const DEFAULT_MODEL = "llama-3.1-8b-instant";

function readNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function loadConfig(env = process.env) {
  return {
    port: readNumber(env.PORT, DEFAULT_PORT),
    clientOrigins: parseOrigins(env.CLIENT_ORIGIN || env.CLIENT_ORIGINS || DEFAULT_CLIENT_ORIGINS),
    groqApiKey: env.GROQ_API_KEY || "",
    groqModel: env.GROQ_MODEL || DEFAULT_MODEL
  };
}

function parseOrigins(value) {
  return value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
}

export function normalizeOrigin(origin) {
  return String(origin ?? "").trim().replace(/\/$/, "");
}
