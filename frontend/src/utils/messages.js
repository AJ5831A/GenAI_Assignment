export function createMessage(role, content) {
  return {
    id: crypto.randomUUID(),
    role,
    content
  };
}

export function createWelcomeMessage(persona) {
  return createMessage(
    "assistant",
    `You are now chatting with the ${persona.name} persona. Ask about preparation, projects, DSA, system design, or career decisions.`
  );
}

export function toApiMessages(messages) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map(({ role, content }) => ({ role, content }));
}
