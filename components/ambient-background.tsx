'use client'

import { motion } from 'motion/react'
import { useMemo } from 'react'

type Tone = 'dawn' | 'night' | 'warm'

const tones: Record<
  Tone,
  { base: string; blobA: string; blobB: string; blobC: string; particle: string }
> = {
  dawn: {
    base: 'radial-gradient(140% 120% at 50% 0%, #fff9f2 0%, #fff7f8 45%, #f7dce3 100%)',
    blobA: 'rgba(233,170,185,0.55)',
    blobB: 'rgba(255,220,229,0.65)',
    blobC: 'rgba(184,92,117,0.25)',
    particle: 'rgba(184,92,117,0.5)',
  },
  night: {
    base: 'radial-gradient(140% 120% at 50% 10%, #3a222c 0%, #25191f 45%, #171216 100%)',
    blobA: 'rgba(184,92,117,0.45)',
    blobB: 'rgba(233,170,185,0.28)',
    blobC: 'rgba(255,220,229,0.18)',
    particle: 'rgba(255,220,229,0.7)',
  },
  warm: {
    base: 'radial-gradient(150% 130% at 50% 40%, #fff9f2 0%, #ffdce5 55%, #f7dce3 100%)',
    blobA: 'rgba(255,220,229,0.8)',
    blobB: 'rgba(233,170,185,0.5)',
    blobC: 'rgba(255,249,242,0.9)',
    particle: 'rgba(184,92,117,0.4)',
  },
}

export function AmbientBackground({
  tone = 'dawn',
  particles = 14,
}: {
  tone?: Tone
  particles?: number
}) {
  const palette = tones[tone]

  const dots = useMemo(
    () =>
      Array.from({ length: particles }).map((_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 23) % 100}%`,
        size: 1.5 + ((i * 7) % 4),
        delay: (i % 6) * 0.7,
        duration: 6 + ((i * 3) % 6),
      })),
    [particles],
  )

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: palette.base }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      />

      <motion.div
        className="absolute -top-1/4 left-[10%] h-[60vmax] w-[60vmax] rounded-full blur-[90px]"
        style={{ background: palette.blobA }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-[5%] h-[50vmax] w-[50vmax] rounded-full blur-[100px]"
        style={{ background: palette.blobB }}
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-1/3 h-[55vmax] w-[55vmax] rounded-full blur-[110px]"
        style={{ background: palette.blobC }}
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: palette.particle,
          }}
          animate={{ opacity: [0, 1, 0], y: [0, -24, 0] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </motion.div>
  )
}
