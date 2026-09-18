'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Full-viewport cinematic scene. Handles the shared enter/exit transition
 * language: fade + blur + subtle scale. Used inside <AnimatePresence>.
 */
export function Scene({
  children,
  className,
  scrollable = false,
}: {
  children: ReactNode
  className?: string
  scrollable?: boolean
}) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 1.03, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.985, filter: 'blur(14px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'absolute inset-0 flex w-full flex-col items-center px-6 text-center safe-top safe-bottom',
        scrollable ? 'overflow-y-auto py-24' : 'justify-center overflow-hidden',
        className,
      )}
    >
      {children}
    </motion.section>
  )
}
