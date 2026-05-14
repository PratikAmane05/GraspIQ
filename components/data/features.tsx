import {
  Mic,
  Bot,
  Brain,
  Lightbulb,
  Target,
  Timer,
  BarChart3,
} from "lucide-react";
import { ReactNode } from "react";

export interface FeatureItem {
  id: string;
  icon: ReactNode;
  title: string;
  tagline?: string;
  description: string;
  bullets: string[];
  gradient: string; // tailwind gradient classes after bg-gradient-to-r
}

export const featureItems: FeatureItem[] = [
  {
    id: "voice-tutor",
    icon: <Mic className="w-6 h-6" />,
    title: "Voice-Enabled AI Tutor",
    tagline: "Natural, conversational learning",
    description:
      "Speak or type. Your tutor adapts to your learning rhythm, remembers prior context, and keeps you motivated with progressive scaffolding.",
    bullets: [
      "Understands follow-up questions",
      "Adaptive explanation depth",
      "Voice + text seamlessly",
      "Retention oriented prompts",
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
  },
  {
    id: "chatbot-tutors",
    icon: <Bot className="w-6 h-6" />,
    title: "AI Chatbot Tutors",
    tagline: "Specialized domain intelligence",
    description:
      "Multiple subject-focused tutors for AI, Data Science & more. Get targeted conceptual clarity without information overload.",
    bullets: [
      "Domain-tuned reasoning",
      "Instant clarifications",
      "Structured breakdowns",
      "Edge-case handling",
    ],
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
  },
  {
    id: "smart-notes",
    icon: <Brain className="w-6 h-6" />,
    title: "Smart Notes Creator",
    tagline: "Summaries that stick",
    description:
      "Turn dense sources into concise, linkable knowledge units. Export, regenerate flashcards, and build iterative understanding.",
    bullets: [
      "Flashcard extraction",
      "Multi-format export",
      "Semantic chunking",
      "Time-saving automation",
    ],
    gradient: "from-orange-400 via-pink-500 to-red-500",
  },
  {
    id: "resource-recommendation",
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Study Resource Recommendation",
    tagline: "Curated learning paths",
    description:
      "Stop endless searching. Get mapped sequences of videos, docs & practice flows aligned to your current competency.",
    bullets: [
      "Roadmaps auto-generated",
      "Quality-ranked sources",
      "Gap-aware suggestions",
      "Time efficiency focus",
    ],
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
  },
  {
    id: "pyq",
    icon: <Target className="w-6 h-6" />,
    title: "Past Year Questions (PYQ)",
    tagline: "Practice that adapts",
    description:
      "Adaptive difficulty & instant feedback builds confidence while analytics expose weak zones before they cost you.",
    bullets: [
      "Adaptive progression",
      "Immediate rationale",
      "Weakness surfacing",
      "Progress charts",
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-pink-500",
  },
  {
    id: "productivity-tools",
    icon: <Timer className="w-6 h-6" />,
    title: "Productivity Tools",
    tagline: "Stay consistent daily",
    description:
      "Integrated Pomodoro, habit loops & reminder layering to convert intent into sustained learning routines.",
    bullets: [
      "Structured sprints",
      "Habit reinforcement",
      "Contextual nudges",
      "Workflow integration",
    ],
    gradient: "from-indigo-500 via-blue-500 to-sky-500",
  },
  {
    id: "personal-dashboard",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Personal Dashboard",
    tagline: "Clarity through visibility",
    description:
      "Visualize trends, streaks & focus allocation. Dynamic widgets help triage where to invest the next study block.",
    bullets: [
      "Multi-metric insight",
      "Goal alignment",
      "Streak optimization",
      "Widget personalization",
    ],
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
  },
];
