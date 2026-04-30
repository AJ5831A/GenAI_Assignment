import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import { getAccentStyles } from "../../utils/personaStyles";

export function MessageBubble({ isLoading = false, message, persona }) {
  const accent = getAccentStyles(persona);
  const isUser = message.role === "user";

  return (
    <article
      className={clsx(
        "max-w-[min(820px,92%)] rounded-lg px-4 py-3 shadow-xl shadow-black/15",
        isUser
          ? `self-end text-white ${accent.bar}`
          : "self-start border border-white/10 bg-white/[0.08] text-slate-100 backdrop-blur"
      )}
    >
      <span className={clsx("block text-xs font-extrabold", isUser ? "text-white/80" : "text-slate-400")}>
        {isUser ? "You" : persona.name}
      </span>
      <p className="mt-2 flex items-center gap-2 whitespace-pre-wrap leading-7">
        {isLoading && <Loader2 className="animate-spin" size={16} aria-hidden="true" />}
        {message.content}
      </p>
    </article>
  );
}
