const ALLOWED_ROLES = new Set(["user", "assistant"]);
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 3000;

export class MessageSanitizer {
  sanitize(messages) {
    if (!Array.isArray(messages)) {
      return [];
    }

    return messages
      .filter((message) => message && ALLOWED_ROLES.has(message.role))
      .slice(-MAX_HISTORY_MESSAGES)
      .map((message) => ({
        role: message.role,
        content: String(message.content ?? "").slice(0, MAX_MESSAGE_LENGTH).trim()
      }))
      .filter((message) => message.content.length > 0);
  }
}
