"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Target, Clock, Mic, Activity, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  // Static placeholder data (would be fetched in real app)
  const recentChats = [
    { topic: "Backpropagation", time: "2h ago" },
    { topic: "SQL Optimization", time: "1d" },
    { topic: "Recursion", time: "2d" },
  ];

  return (
    <div className="flex pt-20 md:pt-24 max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 gap-6 min-h-[calc(100vh-6rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 lg:w-60 flex-col shrink-0 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-5 gap-6 h-[calc(100vh-7rem)] sticky top-20">
        <nav className="flex flex-col gap-1 text-sm font-medium">
          <SidebarLink href="/dashboard" label="Dashboard" icon={Activity} active />
          <SidebarLink href="/tools/ai-tutor" label="AI Tutor" icon={Brain} />
          <SidebarLink href="/tools/notes" label="Smart Notes" icon={BookOpen} />
          <SidebarLink href="/pyq" label="PYQ" icon={Target} />
          <SidebarLink href="/study-flow" label="Study Flow" icon={Clock} />
        </nav>
        <div className="mt-auto text-[11px] leading-relaxed text-slate-400 bg-slate-800/60 rounded-md p-3">
          Tip: Start with a focused 25m sprint. Momentum beats motivation.
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col gap-6 pb-16">
        {/* Top row: Voice assistant + productivity features */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 h-[420px] flex flex-col border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Mic className="w-4 h-4 text-blue-400" /> Voice Assistant
              </CardTitle>
              <p className="text-xs text-slate-400">Speak or type. Your AI tutor responds here.</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden">
              <div className="flex-1 rounded-lg border border-slate-800/80 bg-slate-900/40 p-3 text-xs text-slate-400 overflow-auto space-y-2">
                <div className="text-slate-300">Tutor: Ask me anything related to your study plan.</div>
                <div>You: Explain gradient descent simply.</div>
                <div className="text-slate-300">Tutor: Gradient descent iteratively adjusts parameters...</div>
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Type your question..."
                  className="flex-1 text-sm rounded-md bg-slate-800/70 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium">Send</button>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 h-[420px] border-slate-800 bg-slate-900/60 backdrop-blur flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Productivity Features</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
              <FeatureTile icon={Brain} label="AI Tutor" desc="Chat & clarify doubts" href="/tools/ai-tutor" />
              <FeatureTile icon={BookOpen} label="Smart Notes" desc="Generate summaries" href="/tools/notes" />
              <FeatureTile icon={Target} label="Flashcards" desc="Active recall" href="/tools/flashcards" />
              <FeatureTile icon={Clock} label="Focus" desc="Pomodoro timer" href="/tools/focus" />
              <FeatureTile icon={Activity} label="Quiz Builder" desc="Auto practice" href="/tools/quiz" />
              <FeatureTile icon={MessageSquare} label="Recent Sessions" desc="Jump back in" href="/tools/ai-tutor" />
            </CardContent>
          </Card>
        </div>

        {/* Metrics row */}
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard title="Notes Generated" value="12" accent="from-indigo-500/40 to-indigo-600/10" />
          <MetricCard title="Study Hours" value="5.2" accent="from-blue-500/40 to-blue-600/10" />
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recent Tutor Chats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {recentChats.map((c) => (
                <div key={c.topic} className="flex items-center justify-between rounded-md bg-slate-800/60 px-3 py-2">
                  <span>{c.topic}</span>
                  <span className="text-slate-400">{c.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------- Helper Components ----------------
const SidebarLink: React.FC<{ href: string; label: string; icon: any; active?: boolean }> = ({ href, label, icon: Icon, active }) => (
  <a
    href={href}
    className={"flex items-center gap-2 px-3 py-2 rounded-md transition-colors " + (active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60")}
  >
    <Icon className="w-4 h-4 text-blue-400" /> {label}
  </a>
);

const FeatureTile: React.FC<{ icon: any; label: string; desc: string; href: string }> = ({ icon: Icon, label, desc, href }) => (
  <a
    href={href}
    className="group rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800/70 hover:border-slate-700 p-4 flex flex-col gap-2 shadow-sm transition"
  >
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-blue-400" />
      <span className="font-medium text-slate-200 text-[13px]">{label}</span>
    </div>
    <p className="text-[11px] text-slate-400 leading-snug">{desc}</p>
    <span className="mt-auto text-[11px] font-medium text-blue-400/80 group-hover:text-blue-300">Open →</span>
  </a>
);

const MetricCard: React.FC<{ title: string; value: string; accent: string }> = ({ title, value, accent }) => (
  <Card className="relative overflow-hidden border-slate-800 bg-slate-900/60">
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-40`} />
    <CardHeader className="pb-2 relative z-10">
      <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="text-4xl font-semibold tracking-tight">{value}</div>
    </CardContent>
  </Card>
);
