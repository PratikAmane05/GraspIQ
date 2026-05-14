"use client";
import { useState, useId } from "react";
import { featureItems, FeatureItem } from "@/components/data/features";
import { cn } from "@/components/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface FeatureShowcaseProps {
  className?: string;
}

export const FeatureShowcase = ({ className }: FeatureShowcaseProps) => {
  const [active, setActive] = useState<string>(featureItems[0].id);
  const idBase = useId();
  const current = featureItems.find((f) => f.id === active)!;

  return (
    <div className={cn("relative", className)}>
      {/* gradient background ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_60%)]" />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Tabs */}
        <div
          className="lg:w-64 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 -mx-2 px-2"
          role="tablist"
          aria-orientation="vertical"
        >
          {featureItems.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`${idBase}-panel-${item.id}`}
                id={`${idBase}-tab-${item.id}`}
                onClick={() => setActive(item.id)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors min-w-[220px] lg:min-w-0",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                  selected
                    ? "border-slate-600 bg-slate-800/70 text-white shadow-sm"
                    : "border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 text-slate-300"
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-200 shadow-inner ring-1 ring-slate-700 group-hover:scale-105 transition-transform">
                  {item.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </span>
                  {item.tagline && (
                    <span className="text-[11px] text-slate-400 leading-tight">
                      {item.tagline}
                    </span>
                  )}
                </span>
                {selected && (
                  <span className="absolute -left-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow">
                    •
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Panel */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              role="tabpanel"
              id={`${idBase}-panel-${current.id}`}
              aria-labelledby={`${idBase}-tab-${current.id}`}
              className="relative rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/20 backdrop-blur-xl p-8 overflow-hidden"
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-r",
                  current.gradient
                )}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-300 mb-4">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  FEATURE SPOTLIGHT
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">
                  {current.title}
                </h3>
                {current.tagline && (
                  <p className="text-sm text-slate-300 mb-5 leading-relaxed max-w-lg">
                    {current.tagline}
                  </p>
                )}
                <p className="text-base leading-relaxed text-slate-300/90 max-w-2xl mb-6">
                  {current.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {current.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-200"
                    >
                      <span className="mt-1 text-blue-400">
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 text-[11px] font-medium text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/70">
                    Adaptive
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/70">
                    AI Powered
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/70">
                    Productivity
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/70">
                    Learner Focused
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
