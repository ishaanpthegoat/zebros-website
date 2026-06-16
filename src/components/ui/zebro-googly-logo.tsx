'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * The Zebros emblem (sunglasses removed) with two cartoon eyes that act as the
 * zebra's eyes and follow the cursor. Positions are percentages of the logo
 * box, placed where the eyes sit on /img/logo-eyes.png.
 */
type Eye = { x: number; y: number; size: number }

const EYES: Eye[] = [
  { x: 61.0, y: 43.0, size: 13.5 }, // back eye (left), toward the snout
  { x: 73.5, y: 39.0, size: 15.0 }, // front eye (right), toward the snout
]

export function ZebroGooglyLogo({ className }: { className?: string }) {
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
        const reach = (r.width / 2) * 0.5
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

  return (
    <div className={cn('zebro-googly relative select-none', className)}>
      <img
        src="/img/logo-eyes.png"
        alt="Team 30415 Zebros logo"
        className="block w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(255,31,143,0.45)]"
        draggable={false}
      />
      {EYES.map((eye, i) => (
        <span
          key={i}
          className="zebro-eye"
          style={{ left: `${eye.x}%`, top: `${eye.y}%`, width: `${eye.size}%`, animationDelay: `${0.15 + i * 0.1}s` }}
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
