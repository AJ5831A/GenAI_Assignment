import { Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { getAccentStyles } from "../../utils/personaStyles";

export function PersonaSidebar({ activePersona, personas, onSelect }) {
  return (
    <aside className="shrink-0 overflow-y-auto border-b border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/30 lg:h-dvh lg:border-b-0 lg:border-r lg:p-7">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-lg bg-white text-slate-950 shadow-lg shadow-sky-500/10">
          <Sparkles size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-slate-400">Scaler AI Lab</p>
          <h1 className="text-xl font-bold tracking-tight text-white">Persona Chatbot</h1>
        </div>
      </div>

      <div className="mt-7 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm font-semibold text-white">Choose a mentor mode</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Switching personas resets the thread so the system prompt stays focused.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1" role="tablist" aria-label="Choose a persona">
        {personas.map((persona) => {
          const accent = getAccentStyles(persona);
          const isActive = persona.id === activePersona.id;

          return (
            <button
              key={persona.id}
              className={clsx(
                "group grid min-h-24 grid-cols-[10px_1fr] gap-3 rounded-lg border bg-white/[0.04] p-4 text-left shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:grid-cols-1 lg:grid-cols-[10px_1fr]",
                isActive ? `${accent.border} bg-white/[0.08]` : "border-white/10"
              )}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(persona)}
            >
              <span className={clsx("h-full min-h-12 w-2 rounded-full sm:h-1 sm:w-full lg:h-full lg:w-2", accent.bar)} />
              <span>
                <span className="block font-semibold text-white">{persona.name}</span>
                <span className="mt-1 block text-sm leading-5 text-slate-400">{persona.role}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
