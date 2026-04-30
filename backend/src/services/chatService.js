import { badRequest } from "../http/errors.js";

export class ChatService {
  constructor({ personaRepository, messageSanitizer, completionService }) {
    this.personaRepository = personaRepository;
    this.messageSanitizer = messageSanitizer;
    this.completionService = completionService;
  }

  listPersonas() {
    return this.personaRepository.listSummaries();
  }

  async replyTo({ personaId, messages }) {
    const persona = this.personaRepository.findById(personaId);

    if (!persona) {
      throw badRequest("Choose a valid persona before sending a message.");
    }

    const sanitizedMessages = this.messageSanitizer.sanitize(messages);

    if (sanitizedMessages.length === 0) {
      throw badRequest("Send at least one message to start the conversation.");
    }

    if (sanitizedMessages.at(-1)?.role !== "user") {
      throw badRequest("The latest chat message must come from the user.");
    }

    return this.completionService.createReply({
      persona,
      messages: sanitizedMessages
    });
  }
}
