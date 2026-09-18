'use client'

import { motion } from 'motion/react'
import { Scene } from '@/components/scene'
import { ElegantButton } from '@/components/elegant-button'
import { MemoryCard } from '@/components/memory-card'
import { content } from '@/lib/content'

export function MemoriesScene({ onNext }: { onNext: () => void }) {
  return (
    <Scene scrollable>
      <div className="flex w-full max-w-md flex-col items-center gap-28">
        <motion.p
          className="text-xs tracking-[0.32em] text-[#806b72] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          scroll gently
        </motion.p>

        {content.memories.map((memory, i) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={i}
            label={`[PHOTO 0${i + 1}]`}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
          className="pb-8"
        >
          <ElegantButton onClick={onNext}>Keep going</ElegantButton>
        </motion.div>
      </div>
    </Scene>
  )
}
