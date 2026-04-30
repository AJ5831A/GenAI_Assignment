import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AlertCircle, Bot, Loader2, MessageSquareText, Send, Sparkles } from "lucide-react";
import "./styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const PERSONAS = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    role: "Fundamentals-first mentor",
    title: "Co-founder, Scaler and InterviewBit",
    accent: "#1d4ed8",
    description: "Direct, rigorous guidance that pushes you to derive answers from first principles.",
    suggestions: [
      "How should I prepare for system design interviews?",
      "I know DSA patterns but freeze in contests. What should I fix?",
      "How do I stop memorizing solutions?"
    ]
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    role: "Product-minded builder",
    title: "Co-founder, Scaler and InterviewBit",
    accent: "#047857",
    description: "Practical advice around shipping, users, deployment, and proof of work.",
    suggestions: [
      "How do I move from tutorial projects to real projects?",
      "What should I build to prove backend skills?",
      "How should I think about scaling an MVP?"
    ]
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    role: "DSA precision coach",
    title: "Dean, Scaler School of Technology",
    accent: "#be123c",
    description: "Calm pressure on invariants, edge cases, complexity, and technical precision.",
    suggestions: [
      "How do I identify the right data structure?",
      "Why does my greedy solution fail?",
      "How should I analyze edge cases in graph problems?"
    ]
  }
];

function createWelcomeMessage(persona) {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content: `You are now chatting with the ${persona.name} persona. Ask about preparation, projects, DSA, system design, or career decisions.`
  };
}

function App() {
  const [activePersonaId, setActivePersonaId] = useState(PERSONAS[0].id);
  const activePersona = useMemo(
    () => PERSONAS.find((persona) => persona.id === activePersonaId) ?? PERSONAS[0],
    [activePersonaId]
  );
  const [messages, setMessages] = useState(() => [createWelcomeMessage(PERSONAS[0])]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    const userMessage = { id: crypto.randomUUID(), role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: activePersona.id,
          messages: nextMessages
            .filter((message) => message.role === "user" || message.role === "assistant")
            .map(({ role, content }) => ({ role, content }))
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "The chatbot could not answer right now.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.reply
        }
      ]);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <main className="appShell" style={{ "--accent": activePersona.accent }}>
      <section className="sidebar" aria-label="Persona selector">
        <div className="brandBlock">
          <div className="brandIcon">
            <Sparkles size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Scaler AI Lab</p>
            <h1>Persona Chatbot</h1>
          </div>
        </div>

        <div className="personaList" role="tablist" aria-label="Choose a persona">
          {PERSONAS.map((persona) => (
            <button
              key={persona.id}
              className={`personaButton ${persona.id === activePersona.id ? "active" : ""}`}
              type="button"
              role="tab"
              aria-selected={persona.id === activePersona.id}
              onClick={() => switchPersona(persona)}
            >
              <span className="personaSwatch" style={{ background: persona.accent }} />
              <span>
                <strong>{persona.name}</strong>
                <small>{persona.role}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="chatPanel" aria-label={`${activePersona.name} chat`}>
        <header className="chatHeader">
          <div>
            <p className="eyebrow">Active persona</p>
            <h2>{activePersona.name}</h2>
            <p>{activePersona.title}</p>
          </div>
          <div className="statusBadge">
            <Bot size={18} aria-hidden="true" />
            {activePersona.role}
          </div>
        </header>

        <div className="personaContext">
          <MessageSquareText size={20} aria-hidden="true" />
          <p>{activePersona.description}</p>
        </div>

        <div className="suggestions" aria-label="Suggested questions">
          {activePersona.suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>

        <div className="messages" aria-live="polite">
          {messages.map((message) => (
            <article key={message.id} className={`message ${message.role}`}>
              <span>{message.role === "user" ? "You" : activePersona.name}</span>
              <p>{message.content}</p>
            </article>
          ))}
          {isLoading && (
            <article className="message assistant loading">
              <span>{activePersona.name}</span>
              <p>
                <Loader2 size={16} aria-hidden="true" />
                Thinking through the response...
              </p>
            </article>
          )}
        </div>

        {error && (
          <div className="errorBanner" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            {error}
          </div>
        )}

        <form className="composer" onSubmit={handleSubmit}>
          <label className="srOnly" htmlFor="chat-input">
            Message {activePersona.name}
          </label>
          <textarea
            id="chat-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder={`Ask ${activePersona.name}...`}
            rows={2}
          />
          <button type="submit" disabled={!draft.trim() || isLoading} aria-label="Send message">
            {isLoading ? <Loader2 size={20} aria-hidden="true" /> : <Send size={20} aria-hidden="true" />}
          </button>
        </form>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
