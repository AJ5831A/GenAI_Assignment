export const accentStyles = {
  blue: {
    bar: "bg-sky-400",
    border: "border-sky-400/80 shadow-sky-500/10",
    button: "bg-sky-500 hover:bg-sky-400 focus-visible:ring-sky-400",
    chip: "hover:border-sky-400/70 hover:bg-sky-400/10 hover:text-sky-100 focus-visible:ring-sky-400",
    glow: "from-sky-500/20 to-cyan-400/10",
    text: "text-sky-300"
  },
  emerald: {
    bar: "bg-emerald-400",
    border: "border-emerald-400/80 shadow-emerald-500/10",
    button: "bg-emerald-500 hover:bg-emerald-400 focus-visible:ring-emerald-400",
    chip: "hover:border-emerald-400/70 hover:bg-emerald-400/10 hover:text-emerald-100 focus-visible:ring-emerald-400",
    glow: "from-emerald-500/20 to-teal-400/10",
    text: "text-emerald-300"
  },
  rose: {
    bar: "bg-rose-400",
    border: "border-rose-400/80 shadow-rose-500/10",
    button: "bg-rose-500 hover:bg-rose-400 focus-visible:ring-rose-400",
    chip: "hover:border-rose-400/70 hover:bg-rose-400/10 hover:text-rose-100 focus-visible:ring-rose-400",
    glow: "from-rose-500/20 to-fuchsia-400/10",
    text: "text-rose-300"
  }
};

export function getAccentStyles(persona) {
  return accentStyles[persona.accent] ?? accentStyles.blue;
}
