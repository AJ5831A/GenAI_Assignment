export class ChatController {
  constructor(chatService) {
    this.chatService = chatService;
  }

  getPersonas = (_req, res) => {
    res.json({ personas: this.chatService.listPersonas() });
  };

  createReply = async (req, res) => {
    const reply = await this.chatService.replyTo(req.body ?? {});
    res.json({ reply });
  };
}
