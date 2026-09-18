'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Scene } from '@/components/scene'
import { content } from '@/lib/content'

export function WishScene() {
  const [wished, setWished] = useState(false)

  const risingParticles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: (i * 53) % 100,
        size: 2 + ((i * 5) % 4),
        delay: (i % 9) * 0.12,
        duration: 2.4 + ((i * 3) % 5) * 0.4,
      })),
    [],
  )

  return (
    <Scene>
      {/* screen brightening on wish */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: wished ? [0, 0.85, 0.4] : 0 }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />

      <div className="relative flex flex-col items-center gap-12">
        <AnimatePresence mode="wait">
          {!wished ? (
            <motion.div
              key="prompt"
              className="flex flex-col items-center gap-14"
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="font-display text-3xl font-light text-[#2b2024] sm:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6 }}
              >
                {content.wish.prompt}
              </motion.p>

              <motion.button
                type="button"
                onClick={() => setWished(true)}
                aria-label="Make a wish"
                className="relative grid h-16 w-16 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9aab9]"
                whileTap={{ scale: 0.85 }}
              >
                <motion.span
                  className="h-3 w-3 rounded-full bg-[#b85c75]"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ filter: 'drop-shadow(0 0 16px rgba(255,220,229,1))' }}
                />
              </motion.button>
            </motion.div>
          ) : (
            <div key="wished" className="relative flex flex-col items-center">
              {/* expanding bloom */}
              <motion.span
                aria-hidden
                className="absolute h-6 w-6 rounded-full bg-[#ffdce5]"
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 34, opacity: 0 }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                style={{ filter: 'blur(6px)' }}
              />

              {/* rising particles */}
              {risingParticles.map((p) => (
                <motion.span
                  key={p.id}
                  aria-hidden
                  className="absolute rounded-full bg-[#b85c75]"
                  style={{
                    left: `${p.x}%`,
                    width: p.size,
                    height: p.size,
                    filter: 'drop-shadow(0 0 6px rgba(255,220,229,0.9))',
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -220, opacity: [0, 1, 0] }}
                  transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                />
              ))}

              <motion.p
                className="relative max-w-md text-balance font-display text-3xl font-light leading-snug text-[#2b2024] sm:text-4xl"
                initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {content.wish.closing}
              </motion.p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}
