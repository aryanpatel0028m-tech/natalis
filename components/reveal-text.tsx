'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Letter-by-letter blur/opacity/focus reveal — no typing caret.
 * Used for the most emotionally important lines (name, headings).
 */
export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as = 'span',
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'span' | 'h1' | 'h2' | 'p'
}) {
  const letters = Array.from(text)
  const Tag = motion[as]

  return (
    <Tag
      className={cn('inline-block', className)}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden: {},
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: '0.25em' },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}

/**
 * Simple fade + soft-rise for blocks of content.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 16,
  className,
  duration = 1.2,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
