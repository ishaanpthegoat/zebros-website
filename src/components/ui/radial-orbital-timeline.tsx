"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useOrbitalMotion } from "@/hooks/use-orbital-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
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
  const [activeId, setActiveId] = useState(timelineData[0]?.id);
  const [showOverview, setShowOverview] = useState(false);
  const [rotating, setRotating] = useState(false);
  const { reducedMotion, x, y, rotateX, rotateY, rotation, counterRotation, trackPointer, resetPointer } = useOrbitalMotion(rotating);

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
    <section className="container pb-12" aria-label="Connected season timeline">
      <div className="mx-auto mb-4 flex max-w-5xl items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>{timelineData.length} connected updates · Inner ring: fall progress · Outer ring: earlier milestones</p>
        <Button variant="outline" size="sm" disabled={reducedMotion} onClick={() => setRotating(!rotating)} aria-pressed={rotating && !reducedMotion}>
          {rotating && !reducedMotion ? <Pause className="mr-2 h-3 w-3" /> : <Play className="mr-2 h-3 w-3" />}
          {rotating && !reducedMotion ? "Pause" : "Rotate"}
        </Button>
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,720px)_minmax(260px,1fr)]">
        <div className="relative mx-auto aspect-square w-full max-w-[720px] [perspective:1200px]" onPointerMove={trackPointer} onPointerLeave={resetPointer} onPointerCancel={resetPointer} onFocusCapture={() => { setRotating(false); resetPointer(); }}>
          <motion.div className="absolute inset-0" style={{ x, y, rotateX, rotateY }}>
          <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
          <svg viewBox="0 0 720 720" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <circle cx="360" cy="360" r="175" fill="none" className="stroke-primary/20" />
            <circle cx="360" cy="360" r="295" fill="none" className="stroke-border" />
            <motion.g key={showOverview ? "overview" : activeId} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: showOverview ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
            {active?.relatedIds.map((id) => {
              const related = timelineData.find((item) => item.id === id);
              if (!related) return null;
              const from = position(active), to = position(related);
              return <line key={id} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="stroke-primary/60" strokeWidth="1.5" />;
            })}
            </motion.g>
          </svg>
          {timelineData.map((item) => {
            const point = position(item);
            const selected = item.id === activeId && !showOverview;
            const related = active?.relatedIds.includes(item.id);
            const Icon = item.icon;
            return (
              <button type="button" key={item.id} onClick={() => select(item.id)} aria-pressed={selected} aria-controls="season-node-detail" aria-label={`${item.title}, ${item.date}`} className="group absolute z-10 flex w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" style={{ left: `${point.x / 7.2}%`, top: `${point.y / 7.2}%` }}>
                <motion.span style={{ rotate: counterRotation }} className="flex flex-col items-center gap-2">
                <span className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-transform [transition-duration:var(--dur)] [transition-timing-function:var(--ease-out)] motion-safe:group-hover:scale-[1.06] motion-safe:group-active:scale-[0.97] ${selected ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" : related ? "border-primary/60 bg-card text-primary" : "border-border bg-card text-foreground"}`}><Icon className="h-4 w-4" /></span>
                <span className={`text-[11px] font-semibold leading-tight ${selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>{item.title}</span>
                </motion.span>
              </button>
            );
          })}
          </motion.div>
          <button type="button" onClick={() => { setShowOverview(true); setRotating(false); }} className="absolute left-1/2 top-1/2 z-10 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full border border-primary/50 bg-card text-center shadow-lg shadow-primary/10 transition-transform [transition-duration:var(--dur)] [transition-timing-function:var(--ease-out)] motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label="Show latest season overview">
            <span className="text-xl font-bold text-primary">26/27</span><span className="text-[10px] text-muted-foreground">THE SEASON</span>
          </button>
          </motion.div>
        </div>
        <aside id="season-node-detail" aria-live="polite" className="relative z-20 rounded-2xl border border-border bg-card/95 p-6">
          <motion.div key={showOverview ? "overview" : activeId} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}>
          {showOverview ? centerContent : active && <>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{active.category}</span>
            <h3 className="mt-2 text-2xl font-bold text-foreground">{active.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{active.date}</p>
            <span className="mt-4 inline-block rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{active.status === "completed" ? "Recorded milestone" : active.status === "in-progress" ? "Work in progress" : "Pending"}</span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.content}</p>
            {active.href && <a href={active.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Full update <ArrowRight className="h-3 w-3" /></a>}
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
