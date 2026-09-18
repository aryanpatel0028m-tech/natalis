'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { Glyph } from '@/components/glyph'
import { content } from '@/lib/content'

export function ChooseOneScene({ onNext }: { onNext: () => void }) {
  const [picked, setPicked] = useState<string | null>(null)
  const chosen = content.chooseOne.cards.find((c) => c.id === picked)

  return (
    <Scene>
      <div className="flex w-full max-w-lg flex-col items-center gap-12 text-[#ffdce5]">
        <motion.p
          className="font-display text-3xl font-light text-white/90"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4 }}
        >
          {content.chooseOne.prompt}
        </motion.p>

        <AnimatePresence mode="wait">
          {!chosen ? (
            <motion.div
              key="cards"
              className="flex flex-wrap items-center justify-center gap-5"
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            >
              {content.chooseOne.cards.map((card, i) => (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => setPicked(card.id)}
                  aria-label={`Choose card ${i + 1}`}
                  className="group relative grid h-40 w-28 place-items-center rounded-2xl border border-white/20 bg-white/[0.04] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdce5]/60"
                  initial={{ opacity: 0, y: 24, rotate: i === 0 ? -4 : i === 2 ? 4 : 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.2 }}
                  whileHover={{ y: -8, borderColor: 'rgba(255,220,229,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'rgba(184,92,117,0.35)' }}
                  />
                  <motion.span
                    className="relative text-[#ffdce5]"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
                    style={{ filter: 'drop-shadow(0 0 10px rgba(255,220,229,0.7))' }}
                  >
                    <Glyph name={card.glyph} className="h-8 w-8" />
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-[#ffdce5]"
                style={{ filter: 'drop-shadow(0 0 14px rgba(255,220,229,0.8))' }}
              >
                <Glyph name={chosen.glyph} className="h-10 w-10" />
              </span>
              <p className="text-xs tracking-[0.3em] text-white/60 uppercase">{chosen.label}</p>
              <p className="max-w-sm text-balance font-display text-2xl font-light leading-snug text-white">
                {chosen.reveal}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: chosen ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {chosen && (
            <ElegantButton tone="dark" onClick={onNext}>
              Continue
            </ElegantButton>
          )}
        </motion.div>
      </div>
    </Scene>
  )
}
