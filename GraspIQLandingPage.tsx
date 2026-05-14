"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CheckIcon,
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  Mic,
  MessageCircle,
  FileText,
  BookOpen,
  HelpCircle,
  Timer,
  Star,
  Users,
  TrendingUp,
  Play,
  Github,
  Mail,
  Phone,
  MapPin,
  Bot,
  Brain,
  BarChart3,
  Target,
  Zap,
  Download,
  Video,
  Calendar,
  CheckCircle,
  TrendingUp as Analytics,
  Lightbulb,
  Clock,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Utils function
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// NumberFlow component implementation
interface NumberFlowProps {
  value: number;
  format?: Intl.NumberFormatOptions;
  className?: string;
}

const NumberFlow: React.FC<NumberFlowProps> = ({
  value,
  format,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const duration = 300;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;

      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, displayValue]);

  const formattedValue = format
    ? new Intl.NumberFormat("en-US", format).format(displayValue)
    : displayValue.toString();

  return <span className={className}>{formattedValue}</span>;
};

// Hero Section Component
const HeroSection = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.querySelectorAll(".animation-line").forEach((path) => {
      const len = (path as SVGPathElement).getTotalLength();
      (path as SVGPathElement).style.strokeDasharray = `${len}px`;
      (path as SVGPathElement).style.strokeDashoffset = `${len}px`;

      setTimeout(() => {
        (path as SVGPathElement).style.transition =
          "stroke-dashoffset 2s ease-in-out";
        (path as SVGPathElement).style.strokeDashoffset = "0px";
      }, 500);
    });
  }, []);

  return (
    <>
      {/* Styles moved to globals.css to prevent hydration mismatch */}

      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-sans overflow-hidden relative"
        id="hero"
      >
        <div className="container text-center z-10 relative p-10 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl leading-tight m-0 relative z-20 mb-6">
            Your Personalized AI Tutor,
            <br />
            <span className="gradient-text inline-block relative z-10">
              Anytime, Anywhere
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            GRASP IQ makes learning interactive, engaging, and tailored to your
            style. Talk, ask, and study with your AI-powered tutor.
          </p>
          <Link href={user ? "/dashboard" : "/sign-up"}>
            <Button className="mt-6 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg cursor-pointer text-xl transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px] pulse-animation">
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="line-group absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
          <svg
            className="line-wrapper absolute w-full h-full"
            viewBox="0 0 177 159"
            preserveAspectRatio="none"
          >
            <path
              className="animation-line"
              d="M176 1L53.5359 1C52.4313 1 51.5359 1.89543 51.5359 3L51.5359 56C51.5359 57.1046 50.6405 58 49.5359 58L0 58"
            />
          </svg>
        </div>

        <div
          className="pattern absolute w-[200%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)] animate-patternScroll"
          style={{ top: "-50%", left: "-50%" }}
        ></div>
      </div>
    </>
  );
};

// Proof Section Component
const ProofSection = () => {
  const stats = [
    { number: 50000, label: "Active Students", suffix: "+" },
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 24, label: "Hours Available", suffix: "/7" },
    { number: 1000, label: "Topics Covered", suffix: "+" },
  ];

  return (
    <section className="py-16 bg-background" id="proof">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-muted-foreground">
            Join thousands of learners who have transformed their education with
            GRASP IQ
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <NumberFlow value={stat.number} />
                {stat.suffix}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Study Visuals Section Component (Premium Showcase Redesign)
const StudyVisualsSection = () => {
  const chatMessages = [
    { role: "user", text: "What is gradient descent?" },
    {
      role: "ai",
      text: "An optimization algorithm that iteratively adjusts parameters to minimise loss.",
    },
    { role: "user", text: "Why can it overshoot?" },
    {
      role: "ai",
      text: "If the learning rate is too high, steps jump past the minimum.",
    },
  ];

  const notes = [
    "Core definition compressed",
    "Intuition & analogy added",
    "Key formula isolated",
    "Common pitfall highlighted",
  ];

  const practiceAnswers = [
    "Very high learning rate",
    "Zero initialization always",
    "Dropout for convolution layers",
    "Ignore validation loss",
  ];

  const masteryBars = [45, 58, 72, 86, 93];

  return (
    <section
      id="study-visuals"
      className="relative overflow-hidden py-40 bg-[radial-gradient(circle_at_30%_20%,#1e293b_0%,#0f172a_55%,#020617_100%)] text-slate-100"
    >
      {/* Ambient gradients & glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-fuchsia-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[70%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_60%),repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_6px)]" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 bg-clip-text text-transparent"
          >
            Study Flow, Reimagined
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed"
          >
            Each interaction refines context. Knowledge turns into retention.
            Effort becomes momentum.
          </motion.p>
        </div>

        {/* Layout grid */}
        <div className="grid xl:grid-cols-12 gap-10 items-start">
          {/* Hero Chat (dominant card) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="xl:col-span-6 relative group"
          >
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-indigo-500/30 via-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border border-slate-700/60 backdrop-blur-xl p-8 flex flex-col overflow-hidden shadow-[0_4px_40px_-8px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-indigo-600/40">
                  AI
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-slate-100">
                    Conversational Context
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Adaptive Tutor Engine
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-sm leading-relaxed pr-2">
                {chatMessages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: i * 0.18, ease: "easeOut" }}
                    className={cn(
                      "max-w-[82%] px-4 py-3 rounded-2xl text-[0.85rem] shadow/20 shadow-black/40 ring-1 backdrop-blur-lg",
                      m.role === "user"
                        ? "self-end bg-gradient-to-br from-indigo-600/90 to-blue-600/90 text-slate-50 ring-indigo-400/30"
                        : "self-start bg-slate-900/50 ring-slate-600/40 text-slate-200"
                    )}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Context memory improving relevance
              </div>
              <div className="absolute right-4 bottom-4 w-40 h-40 bg-gradient-to-tr from-indigo-500/10 via-blue-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Vertical stack: Notes + Practice */}
          <div className="xl:col-span-3 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 0.05 }}
              className="relative group"
            >
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-amber-400/40 via-orange-400/25 to-pink-500/30 opacity-0 group-hover:opacity-100 blur-xl transition" />
              <div className="relative rounded-3xl p-7 bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/60 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)] flex flex-col">
                <h3 className="text-lg font-medium mb-4 tracking-tight text-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" /> Smart Notes
                </h3>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.14 } },
                  }}
                  className="space-y-3 text-[0.8rem]"
                >
                  {notes.map((n, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="flex items-start gap-2 rounded-xl px-3 py-2 bg-slate-900/40 ring-1 ring-slate-600/40 text-slate-300"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                      <span>{n}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-5 text-[0.65rem] tracking-wide uppercase text-slate-500">
                  Generated in under 2s
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-emerald-400/40 via-teal-400/25 to-cyan-500/30 opacity-0 group-hover:opacity-100 blur-xl transition" />
              <div className="relative rounded-3xl p-7 bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/60 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)] flex flex-col">
                <h3 className="text-lg font-medium mb-4 tracking-tight text-slate-100 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" /> Adaptive
                  Practice
                </h3>
                <p className="text-[0.8rem] text-slate-400 mb-4">
                  Which factor most affects gradient descent convergence?
                </p>
                <div className="space-y-2">
                  {practiceAnswers.map((ans, i) => (
                    <motion.button
                      key={i}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor:
                          ans === practiceAnswers[0]
                            ? undefined
                            : "rgba(255,255,255,0.05)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-[0.75rem] ring-1 transition shadow-sm",
                        ans === practiceAnswers[0]
                          ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 ring-emerald-400/40 text-emerald-200"
                          : "ring-slate-600/40 bg-slate-900/30 text-slate-300 hover:ring-slate-500/60"
                      )}
                    >
                      {ans}
                    </motion.button>
                  ))}
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                  className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-6"
                />
                <div className="mt-3 text-[0.6rem] tracking-wide uppercase text-slate-500 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Difficulty adapting in real time
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column analytics */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.95, ease: "easeOut", delay: 0.15 }}
            className="xl:col-span-3 flex flex-col gap-10"
          >
            {/* Mastery progression */}
            <div className="relative group">
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-blue-500/40 via-indigo-500/25 to-sky-500/30 opacity-0 group-hover:opacity-100 blur-xl transition" />
              <div className="relative rounded-3xl p-7 h-full bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/60 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)] flex flex-col">
                <h3 className="text-lg font-medium mb-5 tracking-tight text-slate-100 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" /> Concept
                  Mastery
                </h3>
                <div className="flex items-end gap-2 h-40">
                  {masteryBars.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: `${v}%`, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        delay: i * 0.15,
                        type: "spring",
                        stiffness: 110,
                        damping: 18,
                      }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-600/30 via-indigo-400/50 to-sky-400/70 shadow-inner"
                    />
                  ))}
                </div>
                <div className="mt-5 text-[0.65rem] tracking-wide uppercase text-slate-500">
                  Weekly progression
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Feature Spotlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="mt-28 grid md:grid-cols-3 gap-8"
        >
          {/* Voice-Enabled AI Tutor */}
          <div className="group relative">
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-violet-500/40 via-purple-500/25 to-indigo-500/30 opacity-0 group-hover:opacity-100 blur-xl transition" />
            <div className="relative h-full rounded-3xl p-7 bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/60 backdrop-blur-xl flex flex-col shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/40">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium tracking-tight text-slate-100">
                  Voice-Enabled AI Tutor
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Natural voice sessions that adapt tone, pace and depth to your
                learning patterns.
              </p>
              <div className="relative h-12 flex items-end gap-1 mb-2">
                {[5, 12, 8, 16, 10, 18, 7, 15, 6, 12].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0.2, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                    }}
                    className="flex-1 origin-bottom rounded-full bg-gradient-to-t from-indigo-700/30 via-violet-500/50 to-violet-300/70"
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-b-3xl pointer-events-none" />
              </div>
              <div className="text-[0.6rem] tracking-wide uppercase text-slate-500">
                Adaptive prosody engine
              </div>
            </div>
          </div>

          {/* Study Resource Recommendation */}
          <div className="group relative">
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-amber-400/40 via-orange-400/25 to-pink-500/30 opacity-0 group-hover:opacity-100 blur-xl transition" />
            <div className="relative h-full rounded-3xl p-7 bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/60 backdrop-blur-xl flex flex-col shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/40">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium tracking-tight text-slate-100">
                  Study Resource Recommendation
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Curated multi-source learning paths: video, article, paper +
                spaced reinforcement.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4 text-[0.65rem]">
                {[
                  "YouTube",
                  "Docs",
                  "Playlists",
                  "Blogs",
                  "Roadmaps",
                  "Papers",
                ].map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: i * 0.07 }}
                    className="px-2 py-1 rounded-lg bg-slate-900/40 ring-1 ring-slate-600/40 text-slate-300 text-center"
                  >
                    {t}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="h-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500"
              />
              <div className="mt-3 text-[0.6rem] tracking-wide uppercase text-slate-500">
                Relevance ranking v2
              </div>
            </div>
          </div>

          {/* Productivity Tools */}
          <div className="group relative">
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-cyan-400/40 via-teal-400/25 to-emerald-500/30 opacity-0 group-hover:opacity-100 blur-xl transition" />
            <div className="relative h-full rounded-3xl p-7 bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/60 backdrop-blur-xl flex flex-col shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40">
                  <Timer className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium tracking-tight text-slate-100">
                  Productivity Tools
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Focus sessions, streak logic, spaced reminders & micro-habit
                reinforcement.
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    l: "Pomodoro cycles",
                    v: 70,
                    c: "from-emerald-400 to-teal-500",
                  },
                  {
                    l: "Habit adherence",
                    v: 82,
                    c: "from-cyan-400 to-sky-500",
                  },
                  {
                    l: "Daily streak",
                    v: 95,
                    c: "from-teal-400 to-emerald-500",
                  },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-24 text-[0.65rem] tracking-wide uppercase text-slate-500">
                      {row.l}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.v}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                          delay: 0.15 + i * 0.1,
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${row.c}`}
                      />
                    </div>
                    <span className="text-[0.65rem] text-slate-400 tabular-nums">
                      {row.v}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[0.6rem] tracking-wide uppercase text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Focus engine stable
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice-Enabled AI Tutor",
      description:
        "Chat or speak with a tutor that remembers your learning style and adapts to your pace. Motivational prompts and explanations make studying feel interactive and human-like.",
      benefits: [
        "Adaptive learning pace",
        "Personalized explanations",
        "Voice or text interaction",
        "Motivational support",
      ],
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Chatbot Tutors",
      description:
        "Focused on AI & Data Science topics. Get answers, clarifications, and step-by-step guidance instantly for complex technical concepts.",
      benefits: [
        "Subject-specific expertise",
        "Step-by-step explanations",
        "Instant availability",
        "Technical concept clarity",
      ],
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Notes Creator",
      description:
        "Turn lectures, PDFs, or text into concise summaries. Generate flashcards or export notes to PDF/Markdown for efficient studying.",
      benefits: [
        "Automatic summarization",
        "Flashcard generation",
        "Multiple export formats",
        "Time-saving organization",
      ],
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Study Resource Recommendation",
      description:
        "Enter a topic and receive curated YouTube videos, playlists, web resources, and a learning roadmap. Helps you cover concepts efficiently without searching endlessly.",
      benefits: [
        "Curated learning paths",
        "Video recommendations",
        "Structured roadmaps",
        "Saves research time",
      ],
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Past Year Questions (PYQ)",
      description:
        "Practice with adaptive difficulty questions. Instant feedback and performance analytics help you identify strengths and weaknesses.",
      benefits: [
        "Adaptive difficulty",
        "Performance analytics",
        "Instant feedback",
        "Weakness identification",
      ],
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Timer className="w-8 h-8" />,
      title: "Productivity Tools",
      description:
        "Pomodoro timers, reminders, and habit trackers to help you stay disciplined. Integrated with your dashboard for quick access.",
      benefits: [
        "Pomodoro timers",
        "Smart reminders",
        "Habit tracking",
        "Dashboard integration",
      ],
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Personal Dashboard",
      description:
        "Track your learning progress with graphs, goals, and streaks. Personalized widgets let you prioritize tasks and study smarter.",
      benefits: [
        "Progress tracking",
        "Goal management",
        "Learning streaks",
        "Personalized widgets",
      ],
      color: "from-cyan-500 to-blue-600",
    },
  ];

  // Smoothly scroll to the premium Study Visuals showcase
  const scrollToStudyVisuals = useCallback(() => {
    const el = document.getElementById("study-visuals");
    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update the hash without adding a new history entry
        if (history.replaceState) {
          history.replaceState(null, "", "#study-visuals");
        }
      } catch {
        // Fallback just in case smooth scroll not supported
        el.scrollIntoView();
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToStudyVisuals();
      }
    },
    [scrollToStudyVisuals]
  );

  return (
    <section className="py-20 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Powerful Features for Effective Learning
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto tracking-tight">
            Everything you need to accelerate your learning journey and achieve
            your academic goals with AI-powered tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View study flow details - ${feature.title}`}
              onClick={scrollToStudyVisuals}
              onKeyDown={handleKeyDown}
              data-feature-scroll
              className="group border-border hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-1.5">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center gap-2 text-sm leading-snug"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Instant Learning
            </h3>
            <p className="text-sm text-muted-foreground">
              Get immediate answers and explanations for any topic, anytime
            </p>
          </div>

          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Proven Results
            </h3>
            <p className="text-sm text-muted-foreground">
              95% of students improve their grades within the first month
            </p>
          </div>

          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              24/7 Available
            </h3>
            <p className="text-sm text-muted-foreground">
              Your AI tutor never sleeps - learn whenever inspiration strikes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section Component (repaired)
const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Sign up and set preferences",
      description:
        "Create your account and tell us about your learning style, goals, and subjects you want to focus on.",
      benefits: [
        "Personalized learning profile",
        "Goal setting and tracking",
        "Learning style assessment",
      ],
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Meet your AI tutor",
      description:
        "Connect with your personalized AI tutor and choose your study topics from our comprehensive curriculum.",
      benefits: [
        "AI-powered tutor matching",
        "Interactive conversation",
        "Topic selection guidance",
      ],
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Get personalized content",
      description:
        "Receive smart notes, study resources, and practice questions tailored specifically to your learning needs.",
      benefits: [
        "Customized study materials",
        "Adaptive learning paths",
        "Progress-based recommendations",
      ],
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Track and improve",
      description:
        "Monitor your progress with detailed analytics and continuously improve your learning efficiency.",
      benefits: [
        "Performance analytics",
        "Learning insights",
        "Continuous optimization",
      ],
    },
  ];

  return (
    <section className="py-20 bg-background" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How GRASP IQ Works
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto tracking-tight">
            Get started with your personalized AI learning experience in just
            four simple steps
          </p>
        </div>

        <div className="relative mx-auto mb-8 w-full max-w-6xl">
          <div className="absolute left-[12.5%] top-1/2 h-0.5 w-[75%] -translate-y-1/2 bg-border hidden md:block" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-primary text-primary-foreground font-semibold ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                <CardDescription className="mb-4 leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {step.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section Component (restored)
const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Approximate INR pricing
  const plans = [
    {
      name: "Free",
      level: "free" as const,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with AI-powered learning",
      features: [
        "5 AI tutor sessions per month",
        "Basic smart notes",
        "Limited topic resources",
        "Community support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      level: "pro" as const,
      price: { monthly: 1499, yearly: 1499 * 12 * 0.8 }, // 20% off yearly
      description: "For serious learners who want unlimited tutoring",
      features: [
        "Unlimited AI tutor sessions",
        "Advanced smart notes & flashcards",
        "Full resource recommendations",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Premium",
      level: "premium" as const,
      price: { monthly: 2999, yearly: 2999 * 12 * 0.75 }, // 25% off yearly
      description: "All features plus advanced analytics and voice tutoring",
      features: [
        "Everything in Pro",
        "Voice tutor & speaking mode",
        "Personalized study analytics",
        "Early access to new features",
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI
            tutoring features.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 text-sm bg-background rounded-lg p-1 border">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                !isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              Annual (Save {isYearly ? "" : "up to 25%"})
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative border-border",
                plan.popular && "ring-2 ring-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-bold tabular-nums">
                    ₹
                    <NumberFlow
                      value={Math.round(
                        isYearly ? plan.price.yearly : plan.price.monthly
                      )}
                    />
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full mb-6"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
interface Testimonial {
  name: string;
  role: string;
  review: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Tarang Shah",
      role: "AI & Data Enthusiast",
      review:
        "What clicked for me was how GRASP IQ turns vague curiosity into structured learning. I stopped context switching between videos, PDFs and random notes—now everything lives in one adaptive flow and I finally feel consistent.",
      avatar: "/logo.png",
      rating: 5,
    },
    {
      name: "Raza Shaikh",
      role: "Software Engineer (Transitioning into AI)",
      review:
        "I’ve tried plenty of learning platforms. This is the first where the AI actually remembers the way I ask questions and builds on that. The voice tutoring plus generated practice prompts saved me hours every week.",
      avatar: "/logo.png",
      rating: 5,
    },
    {
      name: "Chetan Shabadi",
      role: "Working Professional – Upskilling in ML",
      review:
        "My biggest blocker was momentum. The streak tracker + smart revision cycles inside GRASP IQ keep me honest. I no longer just consume—I retain and apply.",
      avatar: "/logo.png",
      rating: 5,
    },
    {
      name: "Sanjali Sonawane",
      role: "Student – Preparing for Tech Interviews",
      review:
        "I used to rewrite the same notes before interviews. Now the platform auto-summarizes, flags weak areas, and lets me drill with precise follow‑ups. It feels like a coach that actually watches how I learn.",
      avatar: "/logo.png",
      rating: 5,
    },
  ];

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-background" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of successful learners who trust GRASP IQ
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-xl text-foreground mb-6 italic">
                  "{currentTestimonial.review}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>

          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI tutor work?",
      answer:
        "Our AI tutor uses advanced natural language processing to understand your questions and provide personalized explanations. It adapts to your learning style and pace, offering step-by-step guidance just like a human tutor would.",
    },
    {
      question: "Can I use GRASP IQ for any subject?",
      answer:
        "Currently, GRASP IQ specializes in AI, Data Science, Computer Science, and Mathematics. We're continuously expanding our subject coverage based on user demand.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a free plan that includes 5 AI tutor sessions per month and basic features. You can upgrade to Pro or Premium anytime for unlimited access.",
    },
    {
      question: "How accurate are the AI explanations?",
      answer:
        "Our AI tutor is trained on verified educational content and continuously updated. While highly accurate, we recommend cross-referencing important information with your course materials.",
    },
    {
      question: "Can I access GRASP IQ on mobile devices?",
      answer:
        "Absolutely! GRASP IQ works seamlessly across all devices - desktop, tablet, and mobile. Your learning progress syncs automatically across all platforms.",
    },
    {
      question: "What makes GRASP IQ different from other learning platforms?",
      answer:
        "GRASP IQ combines voice interaction, personalized AI tutoring, smart note generation, and comprehensive study resources in one platform. Our AI adapts to your unique learning style for maximum effectiveness.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about GRASP IQ
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="item-0"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-2 md:px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-muted-foreground">
                    support@graspiq.com
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <div className="text-muted-foreground">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Address</div>
                  <div className="text-muted-foreground">
                    123 Learning Street, Education City, EC 12345
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                We'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
const GraspIQLandingPage = () => {
  // Ensure initial load always starts at the hero (unless a hash is specified)
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      // Use auto to avoid scroll animation flash
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ProofSection />
      <StudyVisualsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default GraspIQLandingPage;
