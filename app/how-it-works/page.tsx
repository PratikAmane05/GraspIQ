import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Users, MessageCircle, BookOpen, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Create Profile",
    desc: "Define goals & learning style",
  },
  {
    icon: MessageCircle,
    title: "Meet AI Tutor",
    desc: "Conversational onboarding",
  },
  {
    icon: BookOpen,
    title: "Get Resources",
    desc: "Smart notes & curated content",
  },
  {
    icon: TrendingUp,
    title: "Track & Improve",
    desc: "Analytics & continuous adaptation",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="container py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">How GRASP IQ Works</h1>
        <p className="text-muted-foreground">
          From curiosity to mastery in four adaptive, AI-powered steps.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s) => (
          <Card key={s.title} className="relative">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <s.icon className="w-7 h-7" />
              </div>
              <CardTitle>{s.title}</CardTitle>
              <CardDescription>{s.desc}</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Adaptive engines refine content as you interact.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
