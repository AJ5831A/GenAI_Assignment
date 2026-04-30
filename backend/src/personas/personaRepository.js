import { personas } from "./personaCatalog.js";

export class PersonaRepository {
  constructor(initialPersonas = personas) {
    this.personaById = new Map(initialPersonas.map((persona) => [persona.id, persona]));
  }

  findById(id) {
    return this.personaById.get(id) ?? null;
  }

  listSummaries() {
    return Array.from(this.personaById.values()).map(({ prompt, ...summary }) => summary);
  }
}
