import React from "react";
import {
  Mic,
  Bot,
  Brain,
  Lightbulb,
  Target,
  Timer,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const allFeatures = [
  {
    icon: Mic,
    title: "Voice-Enabled AI Tutor",
    desc: "Conversational tutoring that adapts to you",
    bullets: ["Understands context", "Motivational prompts", "Explains simply"],
  },
  {
    icon: Bot,
    title: "AI Chatbot Tutors",
    desc: "Subject-specialized AI mentors",
    bullets: ["AI & DS focus", "Always on", "Step-by-step logic"],
  },
  {
    icon: Brain,
    title: "Smart Notes Creator",
    desc: "Turn raw content into refined study assets",
    bullets: ["Summaries", "Flashcards", "Export PDF/MD"],
  },
  {
    icon: Lightbulb,
    title: "Study Resource Recommendation",
    desc: "Curated learning path in seconds",
    bullets: ["Videos & playlists", "Roadmaps", "Quality filtered"],
  },
  {
    icon: Target,
    title: "Past Year Questions",
    desc: "Adaptive practice that sharpens weaknesses",
    bullets: ["Adaptive difficulty", "Instant feedback", "Exam mode"],
  },
  {
    icon: Timer,
    title: "Productivity Tools",
    desc: "Stay disciplined effortlessly",
    bullets: ["Pomodoro", "Habits", "Reminders"],
  },
  {
    icon: BarChart3,
    title: "Personal Dashboard",
    desc: "Visualize, track, and optimize progress",
    bullets: ["Goals & streaks", "Analytics", "Widgets"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">All Features</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything inside GRASP IQ designed to accelerate mastery and sustain
          motivation.
        </p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allFeatures.map((f) => (
          <Card key={f.title} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
