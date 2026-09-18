'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Minimal editorial control — thin border, soft glow, arrow drift on hover.
 * Behaves like a real, accessible button.
 */
export function ElegantButton({
  children,
  onClick,
  tone = 'light',
  withArrow = true,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  tone?: 'light' | 'dark'
  withArrow?: boolean
  className?: string
}) {
  const isDark = tone === 'dark'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      initial="rest"
      animate="rest"
      className={cn(
        'group relative inline-flex items-center gap-3 rounded-full border px-7 py-3 text-sm tracking-[0.18em] uppercase transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isDark
          ? 'border-white/25 text-[#ffdce5] hover:border-white/50 focus-visible:ring-[#ffdce5]/60 focus-visible:ring-offset-transparent'
          : 'border-[#e9aab9]/60 text-[#b85c75] hover:border-[#b85c75] focus-visible:ring-[#e9aab9] focus-visible:ring-offset-[#fff7f8]',
        className,
      )}
    >
      <motion.span
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100',
          isDark ? 'bg-[#b85c75]/30' : 'bg-[#ffdce5]/70',
        )}
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
      />
      <span className="relative">{children}</span>
      {withArrow && (
        <motion.span
          aria-hidden
          className="relative text-base leading-none"
          variants={{ rest: { x: 0 }, hover: { x: 6 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          →
        </motion.span>
      )}
    </motion.button>
  )
}
