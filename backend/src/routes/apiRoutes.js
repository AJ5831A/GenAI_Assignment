import { Router } from "express";
import { asyncHandler } from "../http/asyncHandler.js";

export function createApiRouter({ chatController, healthController }) {
  const router = Router();

  router.get("/health", healthController.show);
  router.get("/personas", chatController.getPersonas);
  router.post("/chat", asyncHandler(chatController.createReply));

  return router;
}
