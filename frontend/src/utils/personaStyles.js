export const accentStyles = {
  blue: {
    bar: "bg-blue-600",
    border: "border-blue-600",
    button: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-600",
    chip: "hover:border-blue-400 hover:text-blue-700 focus-visible:ring-blue-600",
    text: "text-blue-700"
  },
  emerald: {
    bar: "bg-emerald-600",
    border: "border-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-600",
    chip: "hover:border-emerald-400 hover:text-emerald-700 focus-visible:ring-emerald-600",
    text: "text-emerald-700"
  },
  rose: {
    bar: "bg-rose-600",
    border: "border-rose-600",
    button: "bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-600",
    chip: "hover:border-rose-400 hover:text-rose-700 focus-visible:ring-rose-600",
    text: "text-rose-700"
  }
};

export function getAccentStyles(persona) {
  return accentStyles[persona.accent] ?? accentStyles.blue;
}
