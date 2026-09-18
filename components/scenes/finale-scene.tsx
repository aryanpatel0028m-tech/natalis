'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { content } from '@/lib/content'

export function FinaleScene({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0)
  // 1: glad you exist  2: happy birthday, name  3: signature  4: playful + cta
  useEffect(() => {
    if (step >= 4) return
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1200 : 2600)
    return () => clearTimeout(t)
  }, [step])

  return (
    <Scene>
      <div className="flex max-w-lg flex-col items-center gap-8">
        <motion.p
          className="font-display text-4xl font-light leading-snug text-[#2b2024] sm:text-5xl"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          animate={step >= 1 ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.finale.line1}
        </motion.p>

        <motion.p
          className="font-display text-2xl font-light text-[#b85c75] sm:text-3xl"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={step >= 2 ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.6 }}
        >
          Happy Birthday, {content.herName}.
        </motion.p>

        <motion.p
          className="text-sm tracking-[0.28em] text-[#806b72] uppercase"
          initial={{ opacity: 0 }}
          animate={step >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 1.4 }}
        >
          — {content.yourName}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <p className="text-xs italic tracking-wide text-[#806b72]">
            {content.finale.playful}
          </p>
          {step >= 4 && <ElegantButton onClick={onNext}>Make a wish</ElegantButton>}
        </motion.div>
      </div>
    </Scene>
  )
}
