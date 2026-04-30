import { useMemo, useState } from "react";
import { PERSONAS } from "../data/personas";
import { chatApi } from "../services/chatApi";
import { createMessage, createWelcomeMessage, toApiMessages } from "../utils/messages";

export function usePersonaChat() {
  const [activePersonaId, setActivePersonaId] = useState(PERSONAS[0].id);
  const [messages, setMessages] = useState(() => [createWelcomeMessage(PERSONAS[0])]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const activePersona = useMemo(
    () => PERSONAS.find((persona) => persona.id === activePersonaId) ?? PERSONAS[0],
    [activePersonaId]
  );

  function switchPersona(persona) {
    setActivePersonaId(persona.id);
    setMessages([createWelcomeMessage(persona)]);
    setDraft("");
    setError("");
  }

  async function sendMessage(text = draft) {
    const content = text.trim();

    if (!content || isLoading) {
      return;
    }

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft("");
    setError("");
    setIsLoading(true);

    try {
      const reply = await chatApi.createReply({
        personaId: activePersona.id,
        messages: toApiMessages(nextMessages)
      });

      setMessages((currentMessages) => [...currentMessages, createMessage("assistant", reply)]);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    activePersona,
    draft,
    error,
    isLoading,
    messages,
    personas: PERSONAS,
    sendMessage,
    setDraft,
    switchPersona
  };
}
