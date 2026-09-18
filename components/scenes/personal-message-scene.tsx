'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { content } from '@/lib/content'

export function PersonalMessageScene({ onNext }: { onNext: () => void }) {
  const { intro, lines } = content.personalMessage
  // Reveal: intro first, then each line, then the cta.
  const total = 1 + lines.length
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= total) return
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1800 : 2600)
    return () => clearTimeout(t)
  }, [step, total])

  return (
    <Scene>
      <div className="flex w-full max-w-xl flex-col items-center gap-10">
        <motion.p
          className="text-xs tracking-[0.32em] text-[#806b72] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 1.4 }}
        >
          {intro}
        </motion.p>

        <div className="flex flex-col gap-5">
          {lines.map((line, i) => {
            const emphasise = i === 0
            return (
              <motion.p
                key={i}
                className={
                  emphasise
                    ? 'font-display text-3xl font-light leading-relaxed text-[#2b2024] sm:text-4xl'
                    : 'text-base leading-loose text-[#806b72] sm:text-lg'
                }
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={
                  step >= i + 2
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : {}
                }
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.p>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={step >= total ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          {step >= total && <ElegantButton onClick={onNext}>One last thing</ElegantButton>}
        </motion.div>
      </div>
    </Scene>
  )
}
