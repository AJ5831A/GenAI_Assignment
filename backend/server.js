import "dotenv/config";
import { buildContainer } from "./src/container.js";

const { app, config } = buildContainer();

app.listen(config.port, () => {
  console.log(`Persona chatbot API running on http://localhost:${config.port}`);
});
