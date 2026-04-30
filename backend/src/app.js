import cors from "cors";
import express from "express";
import { normalizeOrigin } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./http/errorMiddleware.js";

export function createApp({ config, apiRouter }) {
  const app = express();
  const allowedOrigins = new Set(config.clientOrigins);

  const corsOptions = {
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    }
  };

  app.use(cors(corsOptions));
  app.options(/.*/, cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
