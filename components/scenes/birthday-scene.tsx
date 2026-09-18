'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { RevealText, FadeIn } from '@/components/reveal-text'
import { content } from '@/lib/content'

export function BirthdayScene({ onNext }: { onNext: () => void }) {
  const [showCta, setShowCta] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 3800)
    return () => clearTimeout(t)
  }, [])

  return (
    <Scene>
      {/* restrained light bloom */}
      <motion.div
        aria-hidden
        className="absolute h-[42vmax] w-[42vmax] rounded-full blur-[80px]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.7, 0.5], scale: [0.7, 1.1, 1] }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(255,220,229,0.9), transparent 70%)' }}
      />

      <div className="relative flex flex-col items-center gap-8">
        <RevealText
          as="h2"
          text={content.birthday.title}
          className="font-display text-5xl font-light text-[#2b2024] sm:text-7xl"
          stagger={0.06}
          delay={0.3}
        />

        <FadeIn delay={2}>
          <p className="max-w-md text-balance text-base leading-relaxed text-[#806b72] sm:text-lg">
            {content.birthday.line}
          </p>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={showCta ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {showCta && <ElegantButton onClick={onNext}>Continue</ElegantButton>}
        </motion.div>
      </div>
    </Scene>
  )
}
