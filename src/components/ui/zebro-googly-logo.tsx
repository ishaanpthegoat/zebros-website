'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * The Zebros emblem with two cartoon eyes. The eyes stay hidden at the top of
 * the page and fade in as you scroll down, peeking over the top of the
 * sunglasses, and the pupils follow the cursor. Positions are percentages of
 * the logo box, tuned to the two lenses in /img/logo-mark.png.
 */
type Eye = { x: number; y: number; size: number }

const EYES: Eye[] = [
  { x: 47.0, y: 37.0, size: 8.0 }, // back eye, peeking over the rim
  { x: 59.5, y: 40.5, size: 9.0 }, // front eye, peeking over the rim
]

export function ZebroGooglyLogo({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pupilRefs = useRef<Array<HTMLSpanElement | null>>([])

  // Pupils follow the cursor.
  useEffect(() => {
    let raf = 0
    let tx = 0
    let ty = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const apply = () => {
      raf = 0
      for (const pupil of pupilRefs.current) {
        if (!pupil) continue
        const eye = pupil.parentElement as HTMLElement
        const r = eye.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = tx - cx
        const dy = ty - cy
        const angle = Math.atan2(dy, dx)
        const reach = (r.width / 2) * 0.48
        const dist = Math.min(reach, Math.hypot(dx, dy))
        pupil.style.transform = `translate(${(Math.cos(angle) * dist).toFixed(1)}px, ${(Math.sin(angle) * dist).toFixed(1)}px)`
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Eyes appear as you scroll down.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let raf = 0
    const update = () => {
      raf = 0
      const reveal = Math.min(Math.max((window.scrollY - 20) / 150, 0), 1)
      wrap.style.setProperty('--eye-reveal', reveal.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapRef} className={cn('zebro-googly relative select-none', className)} style={{ ['--eye-reveal' as string]: 0 }}>
      <img
        src="/img/logo-mark.png"
        alt="Team 30415 Zebros logo"
        className="block w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(255,31,143,0.45)]"
        draggable={false}
      />
      {EYES.map((eye, i) => (
        <span
          key={i}
          className="zebro-eye"
          style={{ left: `${eye.x}%`, top: `${eye.y}%`, width: `${eye.size}%` }}
        >
          <span
            className="zebro-pupil"
            ref={(el) => {
              pupilRefs.current[i] = el
            }}
          />
        </span>
      ))}
    </div>
  )
}
