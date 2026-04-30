import "dotenv/config";
import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import { getPersona, personaSummaries } from "./prompts.js";

const app = express();
const port = Number(process.env.PORT) || 8080;
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    }
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "persona-chatbot-api" });
});

app.get("/api/personas", (_req, res) => {
  res.json({ personas: Object.values(personaSummaries) });
});

app.post("/api/chat", async (req, res) => {
  const { personaId, messages } = req.body ?? {};
  const persona = getPersona(personaId);

  if (!persona) {
    res.status(400).json({ error: "Choose a valid persona before sending a message." });
    return;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Send at least one message to start the conversation." });
    return;
  }

  const sanitizedMessages = messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: String(message.content ?? "").slice(0, 3000)
    }))
    .filter((message) => message.content.trim().length > 0);

  if (sanitizedMessages.length === 0 || sanitizedMessages.at(-1)?.role !== "user") {
    res.status(400).json({ error: "The latest chat message must come from the user." });
    return;
  }

  if (!process.env.GROQ_API_KEY) {
    res.status(500).json({
      error: "The chatbot API key is not configured. Add GROQ_API_KEY on the server."
    });
    return;
  }

  try {
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 500,
      messages: [{ role: "system", content: persona.prompt }, ...sanitizedMessages]
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      res.status(502).json({ error: "The model returned an empty response. Please try again." });
      return;
    }

    res.json({ reply });
  } catch (error) {
    console.error("Chat completion failed:", error);
    res.status(502).json({
      error: "The AI service is unavailable right now. Please wait a moment and try again."
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(port, () => {
  console.log(`Persona chatbot API running on http://localhost:${port}`);
});
