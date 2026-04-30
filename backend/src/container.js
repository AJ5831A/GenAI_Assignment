import Groq from "groq-sdk";
import { createApp } from "./app.js";
import { loadConfig } from "./config/env.js";
import { ChatController } from "./controllers/chatController.js";
import { HealthController } from "./controllers/healthController.js";
import { PersonaRepository } from "./personas/personaRepository.js";
import { createApiRouter } from "./routes/apiRoutes.js";
import { ChatCompletionService } from "./services/chatCompletionService.js";
import { ChatService } from "./services/chatService.js";
import { MessageSanitizer } from "./services/messageSanitizer.js";

export function buildContainer() {
  const config = loadConfig();
  const groqClient = new Groq({ apiKey: config.groqApiKey });
  const personaRepository = new PersonaRepository();
  const messageSanitizer = new MessageSanitizer();
  const completionService = new ChatCompletionService({
    client: groqClient,
    apiKey: config.groqApiKey,
    model: config.groqModel
  });
  const chatService = new ChatService({
    personaRepository,
    messageSanitizer,
    completionService
  });
  const chatController = new ChatController(chatService);
  const healthController = new HealthController();
  const apiRouter = createApiRouter({ chatController, healthController });
  const app = createApp({ config, apiRouter });

  return { app, config };
}
