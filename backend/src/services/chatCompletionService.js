import { badGateway, serverError } from "../http/errors.js";

export class ChatCompletionService {
  constructor({ client, apiKey, model }) {
    this.client = client;
    this.apiKey = apiKey;
    this.model = model;
  }

  async createReply({ persona, messages }) {
    if (!this.apiKey) {
      throw serverError("The chatbot API key is not configured. Add GROQ_API_KEY on the server.");
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: this.model,
        temperature: 0.7,
        max_tokens: 500,
        messages: [{ role: "system", content: persona.prompt }, ...messages]
      });

      const reply = completion.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        throw badGateway("The model returned an empty response. Please try again.");
      }

      return reply;
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }

      console.error("Chat completion failed:", error);
      throw badGateway("The AI service is unavailable right now. Please wait a moment and try again.");
    }
  }
}
