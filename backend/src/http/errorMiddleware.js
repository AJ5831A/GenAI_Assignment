import { HttpError } from "./errors.js";

export function notFoundHandler(_req, res) {
  res.status(404).json({ error: "Route not found." });
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error?.message === "Origin not allowed by CORS") {
    res.status(403).json({ error: "This origin is not allowed to call the API." });
    return;
  }

  console.error("Unhandled API error:", error);
  res.status(500).json({ error: "Something went wrong. Please try again." });
}
