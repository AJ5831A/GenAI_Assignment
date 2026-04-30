const DEFAULT_PORT = 8080;
const DEFAULT_CLIENT_ORIGIN = "http://localhost:5173";
const DEFAULT_MODEL = "llama-3.1-8b-instant";

function readNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function loadConfig(env = process.env) {
  return {
    port: readNumber(env.PORT, DEFAULT_PORT),
    clientOrigin: env.CLIENT_ORIGIN || DEFAULT_CLIENT_ORIGIN,
    groqApiKey: env.GROQ_API_KEY || "",
    groqModel: env.GROQ_MODEL || DEFAULT_MODEL
  };
}
