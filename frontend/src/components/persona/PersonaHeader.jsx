import { Bot, MessageSquareText } from "lucide-react";
import { getAccentStyles } from "../../utils/personaStyles";

export function PersonaHeader({ persona }) {
  const accent = getAccentStyles(persona);

  return (
    <header className="border-b border-slate-200 px-5 py-6 lg:px-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-slate-500">Active persona</p>
          <h2 className="mt-1 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{persona.name}</h2>
          <p className="mt-2 text-slate-600">{persona.title}</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm">
          <Bot className={accent.text} size={18} aria-hidden="true" />
          {persona.role}
        </div>
      </div>

      <div className="mt-5 flex max-w-4xl items-start gap-3 rounded-lg border border-slate-200 bg-white/80 p-4 text-slate-700 shadow-sm">
        <MessageSquareText className={accent.text} size={20} aria-hidden="true" />
        <p className="leading-6">{persona.description}</p>
      </div>
    </header>
  );
}
