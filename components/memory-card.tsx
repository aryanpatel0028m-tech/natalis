'use client'

import { motion } from 'motion/react'
import type { Memory } from '@/lib/content'
import { cn } from '@/lib/utils'

const aspect: Record<Memory['orientation'], string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

export function MemoryCard({
  memory,
  index,
  label,
}: {
  memory: Memory
  index: number
  label: string
}) {
  const tilt = index % 2 === 0 ? -2.5 : 2.5

  return (
    <motion.figure
      className="relative mx-auto w-full max-w-sm"
      initial={{ opacity: 0, y: 60, scale: 0.94, rotate: tilt, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilt * 0.4, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ambient glow behind the memory */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[#ffdce5]/60 blur-2xl"
      />

      <div className="rounded-[1.4rem] border border-white/70 bg-white/80 p-3 shadow-[0_30px_60px_-30px_rgba(184,92,117,0.5)] backdrop-blur-sm">
        <div
          className={cn(
            'relative overflow-hidden rounded-[1rem] bg-gradient-to-br from-[#f7dce3] to-[#e9aab9]',
            aspect[memory.orientation],
          )}
        >
          {memory.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={memory.photo || '/placeholder.svg'}
              alt={memory.caption}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs tracking-[0.3em] text-[#b85c75]/70 uppercase">
                {label}
              </span>
            </div>
          )}
        </div>
      </div>

      <motion.figcaption
        className="mt-5 font-display text-xl font-light text-[#2b2024]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.35 }}
      >
        {memory.caption}
      </motion.figcaption>
    </motion.figure>
  )
}
