'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { content } from '@/lib/content'

export function IntroScene({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1600), // greeting
      setTimeout(() => setStep(2), 4200), // line
      setTimeout(() => setStep(3), 6600), // cta
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <Scene>
      {/* the tiny glowing point */}
      <motion.div
        aria-hidden
        className="absolute h-2 w-2 rounded-full bg-[#b85c75]"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          step === 0
            ? { opacity: [0, 1, 0.85], scale: [0.4, 1, 1], boxShadow: '0 0 40px 14px rgba(255,220,229,0.9)' }
            : { opacity: 0, scale: 6, filter: 'blur(20px)' }
        }
        transition={{ duration: step === 0 ? 1.6 : 1.4, ease: 'easeInOut' }}
      />

      <div className="relative flex min-h-[10rem] flex-col items-center justify-center gap-6">
        <AnimatePresence mode="wait">
          {step >= 1 && step < 3 && (
            <motion.p
              key={step}
              className="font-display text-4xl font-light text-[#2b2024] sm:text-5xl"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -8 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 ? content.intro.greeting : content.intro.line}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-3xl font-light text-[#2b2024] sm:text-4xl">
                {content.intro.line}
              </p>
              <ElegantButton onClick={onNext}>{content.intro.cta}</ElegantButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}
