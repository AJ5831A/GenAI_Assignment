import { Bot, MessageSquareText } from "lucide-react";
import { getAccentStyles } from "../../utils/personaStyles";

export function PersonaHeader({ persona }) {
  const accent = getAccentStyles(persona);

  return (
    <header className={`border-b border-white/10 bg-gradient-to-br ${accent.glow} px-5 py-7 lg:px-8`}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-slate-400">Active persona</p>
          <h2 className="mt-1 text-4xl font-black tracking-tight text-white md:text-5xl">{persona.name}</h2>
          <p className="mt-2 text-slate-300">{persona.title}</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-slate-100 shadow-lg shadow-black/10 backdrop-blur">
          <Bot className={accent.text} size={18} aria-hidden="true" />
          {persona.role}
        </div>
      </div>

      <div className="mt-6 flex max-w-4xl items-start gap-3 rounded-lg border border-white/10 bg-slate-950/40 p-4 text-slate-300 shadow-xl shadow-black/10 backdrop-blur">
        <MessageSquareText className={accent.text} size={20} aria-hidden="true" />
        <p className="leading-6">{persona.description}</p>
      </div>
    </header>
  );
}
