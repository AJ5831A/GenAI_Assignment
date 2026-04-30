import { ChatComposer } from "./components/chat/ChatComposer";
import { ErrorBanner } from "./components/chat/ErrorBanner";
import { MessageList } from "./components/chat/MessageList";
import { SuggestionChips } from "./components/chat/SuggestionChips";
import { AppShell } from "./components/layout/AppShell";
import { PersonaHeader } from "./components/persona/PersonaHeader";
import { PersonaSidebar } from "./components/persona/PersonaSidebar";
import { usePersonaChat } from "./hooks/usePersonaChat";

export default function App() {
  const chat = usePersonaChat();

  return (
    <AppShell
      sidebar={
        <PersonaSidebar
          activePersona={chat.activePersona}
          personas={chat.personas}
          onSelect={chat.switchPersona}
        />
      }
    >
      <div className="flex min-h-screen flex-col">
        <PersonaHeader persona={chat.activePersona} />
        <SuggestionChips
          disabled={chat.isLoading}
          persona={chat.activePersona}
          onPick={chat.sendMessage}
        />
        <MessageList
          isLoading={chat.isLoading}
          messages={chat.messages}
          persona={chat.activePersona}
        />
        <ErrorBanner message={chat.error} />
        <ChatComposer
          draft={chat.draft}
          isLoading={chat.isLoading}
          persona={chat.activePersona}
          onChange={chat.setDraft}
          onSubmit={chat.sendMessage}
        />
      </div>
    </AppShell>
  );
}
