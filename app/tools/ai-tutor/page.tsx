"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message { role: "user" | "ai"; text: string; }
interface Bot {
  id: string;
  name: string;
  subject: string;
  desc: string;
  samplePrompts: string[];
  avatar?: string; // placeholder future
}

const bots: Bot[] = [
  {
    id: "math",
    name: "Math Mentor",
    subject: "Mathematics",
    desc: "Explain problems & derivations",
    samplePrompts: [
      "Explain the intuition behind eigenvalues",
      "How to approach limits with L'Hospital?",
      "Derive quadratic formula briefly",
    ],
  },
  {
    id: "cs",
    name: "CS Coach",
    subject: "Computer Science",
    desc: "Algorithms & complexity",
    samplePrompts: [
      "Difference between BFS and DFS?",
      "What is dynamic programming?",
      "Explain Big-O for binary search",
    ],
  },
  {
    id: "ml",
    name: "ML Guide",
    subject: "Machine Learning",
    desc: "Models & training",
    samplePrompts: [
      "Why use regularization?",
      "Gradient descent vs Adam?",
      "Overfitting detection methods",
    ],
  },
  {
    id: "phy",
    name: "Physics Pro",
    subject: "Physics",
    desc: "Conceptual clarity & problems",
    samplePrompts: [
      "Explain simple harmonic motion",
      "Intuition for conservation of momentum",
      "Work-energy theorem example",
    ],
  },
  {
    id: "chem",
    name: "Chem Catalyst",
    subject: "Chemistry",
    desc: "Reactions & mechanisms",
    samplePrompts: [
      "Why does equilibrium shift?",
      "SN1 vs SN2 difference",
      "pH vs pKa explanation",
    ],
  },
  {
    id: "bio",
    name: "Bio Buddy",
    subject: "Biology",
    desc: "Processes & pathways",
    samplePrompts: [
      "Explain photosynthesis steps",
      "What is transcription?",
      "Role of mitochondria",
    ],
  },
];

export default function AITutorPage() {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  // Maintain messages per bot id in a dictionary
  const [chatState, setChatState] = useState<Record<string, Message[]>>({});

  const messages = selectedBot
    ? chatState[selectedBot.id] || [
        { role: "ai", text: `Hi! I'm ${selectedBot.name}. ${selectedBot.desc}.` },
      ]
    : [];

  const send = async () => {
    if (!selectedBot || !prompt.trim()) return;
    const userMsg: Message = { role: "user", text: prompt };
    setChatState((prev) => {
      const existing = prev[selectedBot.id] || messages;
      return { ...prev, [selectedBot.id]: [...existing, userMsg] };
    });
    setPrompt("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setChatState((prev) => {
      const existing = prev[selectedBot.id] || messages;
      return {
        ...prev,
        [selectedBot.id]: [
          ...existing,
          userMsg,
          { role: "ai", text: `(${selectedBot.name}) Answer about: ${userMsg.text}` },
        ],
      };
    });
    setLoading(false);
  };

  return (
    <div className="pt-20 md:pt-24 max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
      {!selectedBot && (
        <div className="pb-16">
          <h1 className="text-2xl font-semibold mb-6">AI Tutor Bots</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBot(b)}
                className="group relative text-left rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/70 hover:border-slate-700 p-5 flex flex-col gap-3 transition shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white shadow-inner">
                    {b.name.split(" ")[0][0]}{b.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-200 text-sm tracking-wide">{b.name}</span>
                    <span className="text-[11px] text-slate-400">{b.subject}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">{b.desc}</p>
                <span className="text-[11px] font-medium text-blue-400/80 group-hover:text-blue-300">Open Chat →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedBot && (
        <div className="flex flex-col lg:flex-row gap-8 pb-16 min-h-[70vh]">
          {/* Sidebar for switching bots */}
            <aside className="hidden md:flex w-52 lg:w-56 flex-col shrink-0 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-4 gap-2 h-max sticky top-24 self-start">
              {bots.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBot(b)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    b.id === selectedBot.id
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-semibold text-white">
                    {b.name.split(" ")[0][0]}{b.name.split(" ")[1]?.[0] || ""}
                  </span>
                  {b.name}
                </button>
              ))}
            </aside>

          {/* Chat Area */}
          <div className="flex-1 relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 flex flex-col">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-wide text-slate-200">{selectedBot.name}</h2>
                <button
                  onClick={() => setSelectedBot(null)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  Back
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{selectedBot.desc}</p>
            </div>
            <div className="text-xs text-slate-400 mb-4 space-y-1">
              <p className="font-medium text-slate-300">Suggested questions:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                {selectedBot.samplePrompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-md max-w-[75%] text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="text-[11px] text-slate-500">Thinking...</div>
              )}
            </div>
            <div className="mt-5 flex items-stretch gap-3">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask a question..."
                className="h-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
              />
              <Button onClick={send} disabled={loading} className="h-12 px-6">Send</Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating create new bot button */}
      <button
        onClick={() => alert("Custom bot creation coming soon")}
        className="fixed bottom-8 right-6 md:right-10 w-12 h-12 rounded-xl rotate-45 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center text-2xl font-light"
        aria-label="Create new bot"
      >
        <span className="-rotate-45">+</span>
      </button>
    </div>
  );
}
