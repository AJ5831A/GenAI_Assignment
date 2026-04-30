import { Loader2, Send } from "lucide-react";
import { getAccentStyles } from "../../utils/personaStyles";

export function ChatComposer({ draft, isLoading, persona, onChange, onSubmit }) {
  const accent = getAccentStyles(persona);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="mx-5 mb-5 grid grid-cols-[1fr_52px] gap-3 rounded-lg border border-white/10 bg-slate-950/80 p-3 shadow-2xl shadow-black/35 backdrop-blur lg:mx-8" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-input">
        Message {persona.name}
      </label>
      <textarea
        id="chat-input"
        className="min-h-13 max-h-40 resize-y bg-transparent leading-6 text-slate-100 outline-none placeholder:text-slate-500"
        value={draft}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
          }
        }}
        placeholder={`Ask ${persona.name}...`}
        rows={2}
      />
      <button
        className={`grid size-13 place-items-center rounded-lg text-white shadow-lg shadow-black/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-45 ${accent.button}`}
        type="submit"
        disabled={!draft.trim() || isLoading}
        aria-label="Send message"
      >
        {isLoading ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Send size={20} aria-hidden="true" />}
      </button>
    </form>
  );
}
