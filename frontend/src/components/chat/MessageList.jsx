import { MessageBubble } from "./MessageBubble";

export function MessageList({ isLoading, messages, persona }) {
  return (
    <div className="flex min-h-[320px] flex-1 flex-col gap-4 overflow-y-auto px-5 py-5 lg:px-8" aria-live="polite">
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
  );
}
