'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { RevealText, FadeIn } from '@/components/reveal-text'
import { content } from '@/lib/content'

export function RevealScene({ onNext }: { onNext: () => void }) {
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 3600)
    return () => clearTimeout(t)
  }, [])

  return (
    <Scene>
      {/* soft curtain of light opening */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0.9, scale: 1.4 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.95) 0%, rgba(255,220,229,0.6) 30%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-7">
        <RevealText
          as="h1"
          text={content.herName}
          className="font-display text-6xl font-light tracking-tight text-[#2b2024] sm:text-8xl"
          stagger={0.09}
          delay={0.4}
        />

        <FadeIn delay={2.4}>
          <p className="text-sm tracking-[0.28em] text-[#806b72] uppercase">
            {content.reveal.subtitle}
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
