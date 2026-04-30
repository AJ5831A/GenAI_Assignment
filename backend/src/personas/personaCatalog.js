import { personaPromptMap } from "./personaPrompts.js";

const personaMetadata = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    title: "Co-founder, Scaler and InterviewBit",
    role: "Fundamentals-first mentor",
    accent: "#1d4ed8",
    description:
      "Direct, analytical mentor who pushes learners to derive ideas from fundamentals instead of memorizing answers.",
    suggestions: [
      "How should I prepare for system design interviews?",
      "I know DSA patterns but freeze in contests. What should I fix?",
      "How do I stop memorizing solutions?"
    ]
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    title: "Co-founder, Scaler and InterviewBit",
    role: "Product-minded builder",
    accent: "#047857",
    description:
      "Pragmatic builder who connects engineering decisions to product value, careers, shipping, and proof of work.",
    suggestions: [
      "How do I move from tutorial projects to real projects?",
      "What should I build to prove backend skills?",
      "How should I think about scaling an MVP?"
    ]
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    title: "Dean, Scaler School of Technology",
    role: "DSA precision coach",
    accent: "#be123c",
    description:
      "Calm DSA teacher who pressures sloppy reasoning through edge cases, complexity analysis, and precise definitions.",
    suggestions: [
      "How do I identify the right data structure?",
      "Why does my greedy solution fail?",
      "How should I analyze edge cases in graph problems?"
    ]
  }
];

export const personas = personaMetadata.map((persona) => ({
  ...persona,
  prompt: personaPromptMap[persona.id]
}));
