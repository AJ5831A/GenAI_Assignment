import { Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { getAccentStyles } from "../../utils/personaStyles";

export function PersonaSidebar({ activePersona, personas, onSelect }) {
  return (
    <aside className="border-b border-slate-200 bg-white/95 p-5 lg:min-h-screen lg:border-b-0 lg:border-r lg:p-7">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-lg bg-slate-950 text-white">
          <Sparkles size={22} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-slate-500">Scaler AI Lab</p>
          <h1 className="text-xl font-bold tracking-tight">Persona Chatbot</h1>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1" role="tablist" aria-label="Choose a persona">
        {personas.map((persona) => {
          const accent = getAccentStyles(persona);
          const isActive = persona.id === activePersona.id;

          return (
            <button
              key={persona.id}
              className={clsx(
                "group grid min-h-24 grid-cols-[10px_1fr] gap-3 rounded-lg border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:grid-cols-1 lg:grid-cols-[10px_1fr]",
                isActive ? accent.border : "border-slate-200"
              )}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(persona)}
            >
              <span className={clsx("h-full min-h-12 w-2 rounded-full sm:h-1 sm:w-full lg:h-full lg:w-2", accent.bar)} />
              <span>
                <span className="block font-semibold text-slate-950">{persona.name}</span>
                <span className="mt-1 block text-sm leading-5 text-slate-500">{persona.role}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
