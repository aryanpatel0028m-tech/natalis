'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { Glyph } from '@/components/glyph'
import { content } from '@/lib/content'

const HOLD_MS = 1800

export function SurprisesScene({ onNext }: { onNext: () => void }) {
  const [starFound, setStarFound] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const [holdDone, setHoldDone] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const raf = useRef<number | null>(null)
  const start = useRef<number>(0)

  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 2600)
    return () => clearTimeout(t)
  }, [])

  const beginHold = () => {
    if (holdDone) return
    start.current = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start.current) / HOLD_MS)
      setHoldProgress(p)
      if (p >= 1) {
        setHoldDone(true)
        return
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  const endHold = () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    if (!holdDone) setHoldProgress(0)
  }

  useEffect(() => () => void (raf.current && cancelAnimationFrame(raf.current)), [])

  const circumference = 2 * Math.PI * 46

  return (
    <Scene scrollable>
      <div className="flex w-full max-w-md flex-col items-center gap-16 py-6 text-[#ffdce5]">
        <motion.p
          className="font-display text-3xl font-light text-white/90"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4 }}
        >
          {content.surprises.intro}
        </motion.p>

        {/* Hidden star */}
        <div className="flex min-h-[7rem] flex-col items-center justify-center gap-4">
          {!starFound ? (
            <motion.button
              type="button"
              onClick={() => setStarFound(true)}
              aria-label="A small glowing star"
              className="relative text-[#ffdce5] focus-visible:outline-none"
              animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileTap={{ scale: 0.8 }}
              style={{ filter: 'drop-shadow(0 0 12px rgba(255,220,229,0.9))' }}
            >
              <Glyph name="star" className="h-6 w-6" />
            </motion.button>
          ) : (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-xs tracking-[0.3em] text-white/60 uppercase">You found one.</p>
              <p className="max-w-xs text-balance font-display text-xl font-light text-white">
                {content.surprises.hiddenStar}
              </p>
            </motion.div>
          )}
        </div>

        <div className="h-px w-16 bg-white/15" />

        {/* Hold interaction */}
        <div className="flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {!holdDone ? (
              <motion.div
                key="hold"
                className="flex flex-col items-center gap-6"
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="max-w-xs text-balance text-sm leading-relaxed text-white/70">
                  {content.surprises.holdPrompt}
                </p>
                <button
                  type="button"
                  aria-label="Press and hold"
                  onPointerDown={beginHold}
                  onPointerUp={endHold}
                  onPointerLeave={endHold}
                  onPointerCancel={endHold}
                  className="relative grid h-28 w-28 touch-none place-items-center rounded-full focus-visible:outline-none"
                >
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#ffdce5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - holdProgress)}
                    />
                  </svg>
                  <motion.span
                    className="h-3 w-3 rounded-full bg-[#ffdce5]"
                    animate={{ scale: 1 + holdProgress * 1.4 }}
                    style={{ filter: 'drop-shadow(0 0 14px rgba(255,220,229,0.9))' }}
                  />
                  <span className="absolute bottom-[-1.8rem] text-[0.65rem] tracking-[0.25em] text-white/45 uppercase">
                    hold
                  </span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.1 }}
              >
                <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
                  Okay... this one&apos;s for you.
                </p>
                <p className="max-w-xs text-balance font-display text-2xl font-light text-white">
                  {content.surprises.holdReveal}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={showCta ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {showCta && (
            <ElegantButton tone="dark" onClick={onNext}>
              Continue
            </ElegantButton>
          )}
        </motion.div>
      </div>
    </Scene>
  )
}
