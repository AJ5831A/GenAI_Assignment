import { MessageBubble } from "./MessageBubble";

export function MessageList({ isLoading, messages, persona }) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 lg:px-8" aria-live="polite">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-end gap-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} persona={persona} />
        ))}

        {isLoading && (
          <MessageBubble
            isLoading
            message={{ id: "loading", role: "assistant", content: "Thinking through the response..." }}
            persona={persona}
          />
        )}
      </div>
    </div>
  );
}
