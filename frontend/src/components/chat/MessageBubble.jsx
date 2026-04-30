import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import { getAccentStyles } from "../../utils/personaStyles";

export function MessageBubble({ isLoading = false, message, persona }) {
  const accent = getAccentStyles(persona);
  const isUser = message.role === "user";

  return (
    <article
      className={clsx(
        "max-w-[min(820px,92%)] rounded-lg px-4 py-3 shadow-sm",
        isUser ? `self-end text-white ${accent.bar}` : "self-start border border-slate-200 bg-white text-slate-800"
      )}
    >
      <span className={clsx("block text-xs font-extrabold", isUser ? "text-white/75" : "text-slate-500")}>
        {isUser ? "You" : persona.name}
      </span>
      <p className="mt-2 flex items-center gap-2 whitespace-pre-wrap leading-7">
        {isLoading && <Loader2 className="animate-spin" size={16} aria-hidden="true" />}
        {message.content}
      </p>
    </article>
  );
}
