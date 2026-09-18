import type { SVGProps } from 'react'

export type GlyphName = 'star' | 'moon' | 'heart'

/**
 * Inline SVG decorative marks. Used instead of unicode glyphs (✦ ☾ ♡)
 * because the display serif font renders those as missing-glyph boxes.
 */
export function Glyph({
  name,
  className,
  ...props
}: { name: GlyphName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
      {...props}
    >
      {name === 'star' && (
        <path d="M12 2c.3 3.9 1.4 6.7 3.2 8.5C17 12.3 19.9 13.4 22 13.7c-2.1.3-5 1.4-6.8 3.2C13.4 18.7 12.3 21.6 12 25c-.3-3.4-1.4-6.3-3.2-8.1C7 15.1 4.1 14 2 13.7c2.1-.3 5-1.4 6.8-3.2C10.6 8.7 11.7 5.9 12 2Z" />
      )}
      {name === 'moon' && (
        <path d="M14.5 3a9 9 0 1 0 6.5 15 7.5 7.5 0 0 1-6.5-15Z" />
      )}
      {name === 'heart' && (
        <path d="M12 21c-.4 0-.8-.15-1.1-.42C6.14 16.28 3 13.4 3 9.6 3 6.9 5.1 5 7.5 5c1.5 0 2.9.72 3.8 1.9.9-1.18 2.3-1.9 3.8-1.9C18.9 5 21 6.9 21 9.6c0 3.8-3.14 6.68-7.9 10.98-.3.27-.7.42-1.1.42Z" />
      )}
    </svg>
  )
}
