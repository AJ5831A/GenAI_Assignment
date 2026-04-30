import { getAccentStyles } from "../../utils/personaStyles";

export function SuggestionChips({ disabled, persona, onPick }) {
  const accent = getAccentStyles(persona);

  return (
    <div className="flex flex-wrap gap-2 px-5 pt-5 lg:px-8" aria-label="Suggested questions">
      {persona.suggestions.map((suggestion) => (
        <button
          key={suggestion}
          className={`rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-300 shadow-lg shadow-black/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50 ${accent.chip}`}
          type="button"
          disabled={disabled}
          onClick={() => onPick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
