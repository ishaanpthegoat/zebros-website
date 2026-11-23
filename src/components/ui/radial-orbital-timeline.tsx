"use client";
import { useState, useId } from "react";
import { motion } from "framer-motion";
import { useOrbitalMotion } from "@/hooks/use-orbital-motion";
import { NeuralField } from "@/components/ui/neural-field";
import "./neural-network.css";
import { ArrowRight, Pause, Play, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  href?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerContent?: React.ReactNode;
}

export default function RadialOrbitalTimeline({ timelineData, centerContent }: RadialOrbitalTimelineProps) {
  const networkId = useId().replace(/:/g, "");
  const [activeId, setActiveId] = useState(timelineData[0]?.id);
  const [showOverview, setShowOverview] = useState(false);
  const [rotating, setRotating] = useState(false);
  const { reducedMotion, pointerX, pointerY, x, y, rotateX, rotateY, rotation, counterRotation, trackPointer, resetPointer } = useOrbitalMotion(rotating);

  const recent = timelineData.filter((item) => item.id >= 100);
  const earlier = timelineData.filter((item) => item.id < 100);
  const active = timelineData.find((item) => item.id === activeId) ?? timelineData[0];
  const select = (id: number) => {
    setActiveId(id);
    setShowOverview(false);
    setRotating(false);
  };
  const position = (item: TimelineItem) => {
    const ring = item.id >= 100 ? recent : earlier;
    const radius = item.id >= 100 ? 175 : 295;
    const radians = ((ring.indexOf(item) / ring.length) * 360 - 90) * Math.PI / 180;
    return { x: 360 + radius * Math.cos(radians), y: 360 + radius * Math.sin(radians) };
  };

  return (
    <section className="neural-network container pb-12" aria-label="Connected season timeline">
      <div className="mx-auto mb-4 flex max-w-5xl items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-pink-200/70"><Activity className="h-4 w-4 text-pink-300" /><span>Neural archive <span className="mx-2 text-primary/40">/</span> {timelineData.length} connected records</span></div>
        <Button variant="outline" size="sm" disabled={reducedMotion} onClick={() => setRotating(!rotating)} aria-pressed={rotating && !reducedMotion}>
          {rotating && !reducedMotion ? <Pause className="mr-2 h-3 w-3" /> : <Play className="mr-2 h-3 w-3" />}
          {rotating && !reducedMotion ? "Pause" : "Rotate"}
        </Button>
      </div>
      <div className="neural-console mx-auto grid max-w-6xl items-center gap-6 p-5 lg:grid-cols-[minmax(0,720px)_minmax(260px,1fr)]">
        <div className="relative mx-auto aspect-square w-full max-w-[720px] [perspective:1000px]" onPointerMove={trackPointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer} onFocusCapture={() => { setRotating(false); resetPointer(); }}>
          <div aria-hidden="true" className="pointer-events-none absolute left-4 top-4 z-20 font-mono text-[9px] uppercase tracking-[0.25em] text-pink-300/40">ZB / 30415<br /><span className="text-pink-100/60">Season intelligence</span></div>
          <motion.div className="absolute inset-0" style={{ x, y, rotateX, rotateY }}>
          <NeuralField pointerX={pointerX} pointerY={pointerY} reducedMotion={reducedMotion} />
          <div className="neural-core-halo pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />
          <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
          <svg viewBox="0 0 720 720" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <radialGradient id={`${networkId}-glow`}><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" /></radialGradient>
            </defs>
            <circle cx="360" cy="360" r="330" fill={`url(#${networkId}-glow)`} />
            {[112, 175, 240, 295, 330].map((radius, index) => <circle key={radius} cx="360" cy="360" r={radius} fill="none" stroke="currentColor" className="text-pink-300/15" strokeWidth={index === 4 ? 2 : 0.6} strokeDasharray={index % 2 ? "3 10" : "1 18"} />)}
            <circle cx="360" cy="360" r="80" fill="none" className="text-pink-300/40 neural-scan-ring" stroke="currentColor" strokeWidth="1" strokeDasharray="70 80 15 130" />
            <motion.g key={showOverview ? "overview" : activeId} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: showOverview ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
            {active?.relatedIds.map((id) => {
              const related = timelineData.find((item) => item.id === id);
              if (!related) return null;
              const from = position(active), to = position(related);
              const dx = to.x - from.x, dy = to.y - from.y, length = Math.hypot(dx, dy);
              const path = Array.from({ length: 9 }, (_, i) => {
                const t = i / 8, offset = i === 0 || i === 8 ? 0 : Math.sin(i * 8 + id) * 5;
                return `${i ? "L" : "M"}${from.x + dx * t - dy / length * offset},${from.y + dy * t + dx / length * offset}`;
              }).join(" ");
              return <g key={id}><path d={path} fill="none" className="stroke-pink-300/15" strokeWidth="5" /><path d={path} fill="none" className="neural-synapse stroke-pink-200/80" strokeWidth="1.2" /><circle cx={to.x} cy={to.y} r="5" fill="none" className="stroke-pink-200/60" /></g>;
            })}
            </motion.g>
          </svg>
          {timelineData.map((item) => {
            const point = position(item);
            const selected = item.id === activeId && !showOverview;
            const related = active?.relatedIds.includes(item.id);
            const Icon = item.icon;
            return (
              <button type="button" key={item.id} onClick={() => select(item.id)} aria-pressed={selected} aria-controls="season-node-detail" aria-label={`${item.title}, ${item.date}`} className="group absolute z-10 flex w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300" style={{ left: `${point.x / 7.2}%`, top: `${point.y / 7.2}%` }}>
                <motion.span style={{ rotate: counterRotation }} className="flex flex-col items-center gap-2">
                <span className={`grid h-10 w-10 place-items-center rounded-full neural-node border transition-transform [transition-duration:var(--dur)] [transition-timing-function:var(--ease-out)] motion-safe:group-hover:scale-[1.06] motion-safe:group-active:scale-[0.97] ${selected ? "border-pink-100 bg-pink-200 text-background shadow-[0_0_28px_rgba(255,31,143,0.5)]" : related ? "border-pink-300/70 bg-card/80 text-pink-200 shadow-[0_0_18px_rgba(255,31,143,0.2)]" : "border-pink-300/30 bg-background/90 text-pink-100"}`}><Icon className="h-4 w-4" /></span>
                <span className={`rounded bg-background/50 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide leading-tight ${selected ? "text-pink-300" : "text-muted-foreground group-hover:text-foreground"}`}>{item.title}</span>
                </motion.span>
              </button>
            );
          })}
          </motion.div>
          <button type="button" onClick={() => { setShowOverview(true); setRotating(false); }} className="absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full border neural-core border-pink-200/60 bg-background/90 text-center shadow-[0_0_45px_rgba(255,31,143,0.25)] transition-transform [transition-duration:var(--dur)] [transition-timing-function:var(--ease-out)] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300" aria-label="Show latest season overview">
            <span className="font-mono text-3xl font-light tracking-tighter text-pink-100">Z</span><span className="mt-1 font-mono text-[8px] tracking-[0.18em] text-pink-300/70">NEURAL CORE</span>
          </button>
          </motion.div>
        </div>
        <aside id="season-node-detail" aria-live="polite" className="neural-detail relative z-20 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md p-6">
          <motion.div key={showOverview ? "overview" : activeId} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}>
          {showOverview ? centerContent : active && <>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-pink-300">{active.category}</span>
            <h3 className="mt-2 text-2xl font-bold text-foreground">{active.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{active.date}</p>
            <span className="mt-4 inline-block rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{active.status === "completed" ? "Recorded milestone" : active.status === "in-progress" ? "Work in progress" : "Pending"}</span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.content}</p>
            {active.href && <a href={active.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pink-300 underline underline-offset-4">Full update <ArrowRight className="h-3 w-3" /></a>}
            <div className="mt-6 border-t border-border pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connected updates</p>
              <div className="flex flex-wrap gap-2">
                {active.relatedIds.map((id) => {
                  const related = timelineData.find((item) => item.id === id);
                  return related && <Button key={id} variant="outline" size="sm" onClick={() => select(id)}>{related.title}<ArrowRight className="ml-2 h-3 w-3" /></Button>;
                })}
              </div>
            </div>
          </>}
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
