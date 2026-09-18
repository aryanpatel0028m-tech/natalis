'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { RevealText } from '@/components/reveal-text'
import { content } from '@/lib/content'

export function LittleThingsScene({ onNext }: { onNext: () => void }) {
  const [showCta, setShowCta] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <Scene>
      <div className="relative flex max-w-xl flex-col items-center gap-10">
        <RevealText
          as="p"
          text={content.littleThings.intro}
          className="font-display text-3xl font-light leading-snug text-[#2b2024] sm:text-4xl"
          stagger={0.03}
          delay={0.2}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={showCta ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {showCta && <ElegantButton onClick={onNext}>Show me</ElegantButton>}
        </motion.div>
      </div>
    </Scene>
  )
}
