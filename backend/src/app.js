import cors from "cors";
import express from "express";
import { errorHandler, notFoundHandler } from "./http/errorMiddleware.js";

export function createApp({ config, apiRouter }) {
  const app = express();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || origin === config.clientOrigin) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin not allowed by CORS"));
      }
    })
  );

  app.use(express.json({ limit: "1mb" }));
  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
