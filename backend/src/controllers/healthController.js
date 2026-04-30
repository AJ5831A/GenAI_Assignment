export class HealthController {
  show(_req, res) {
    res.json({ ok: true, service: "persona-chatbot-api" });
  }
}
