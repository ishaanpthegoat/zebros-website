'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * The Zebros emblem with two cartoon eyes that pop out of the zebra's
 * sunglasses and follow the cursor. Positions are percentages of the logo
 * box, tuned to the two lenses in /img/logo-mark.png.
 */
type Eye = { x: number; y: number; size: number }

const EYES: Eye[] = [
  { x: 46.5, y: 41.5, size: 12.5 }, // back lens (zebra's far eye)
  { x: 60.5, y: 46.0, size: 14.5 }, // front lens (near the snout)
]

export function ZebroGooglyLogo({ className }: { className?: string }) {
  const pupilRefs = useRef<Array<HTMLSpanElement | null>>([])

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
        // pupil travels at most ~24% of the eyeball radius toward the cursor
        const reach = (r.width / 2) * 0.48
        const dist = Math.min(reach, Math.hypot(dx, dy))
        const px = Math.cos(angle) * dist
        const py = Math.sin(angle) * dist
        pupil.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`
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
        src="/img/logo-mark.png"
        alt="Zebros — Team 30415 logo"
        className="block w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(255,31,143,0.45)]"
        draggable={false}
      />
      {EYES.map((eye, i) => (
        <span
          key={i}
          className="zebro-eye"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            width: `${eye.size}%`,
            animationDelay: `${0.6 + i * 0.12}s`,
          }}
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
