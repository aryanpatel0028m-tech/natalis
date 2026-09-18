'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useRef, useState } from 'react'
import { AmbientBackground } from '@/components/ambient-background'
import { IntroScene } from '@/components/scenes/intro-scene'
import { RevealScene } from '@/components/scenes/reveal-scene'
import { BirthdayScene } from '@/components/scenes/birthday-scene'
import { LittleThingsScene } from '@/components/scenes/little-things-scene'
import { MemoriesScene } from '@/components/scenes/memories-scene'
import { SurprisesScene } from '@/components/scenes/surprises-scene'
import { ChooseOneScene } from '@/components/scenes/choose-one-scene'
import { PersonalMessageScene } from '@/components/scenes/personal-message-scene'
import { FinaleScene } from '@/components/scenes/finale-scene'
import { WishScene } from '@/components/scenes/wish-scene'
import { content } from '@/lib/content'

type Tone = 'dawn' | 'night' | 'warm'

const chapters: { key: string; tone: Tone }[] = [
  { key: 'intro', tone: 'dawn' },
  { key: 'reveal', tone: 'dawn' },
  { key: 'birthday', tone: 'warm' },
  { key: 'little', tone: 'dawn' },
  { key: 'memories', tone: 'dawn' },
  { key: 'surprises', tone: 'night' },
  { key: 'choose', tone: 'night' },
  { key: 'message', tone: 'dawn' },
  { key: 'finale', tone: 'warm' },
  { key: 'wish', tone: 'warm' },
]

export function Experience() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, chapters.length - 1))
  }, [])

  const toggleMusic = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [])

  const tone = chapters[index].tone
  const key = chapters[index].key
  const isNight = tone === 'night'

  return (
    <main className="relative h-[100svh] w-full overflow-hidden">
      {/* crossfading ambient background per tone */}
      <AnimatePresence mode="sync">
        <motion.div
          key={tone}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <AmbientBackground tone={tone} />
        </motion.div>
      </AnimatePresence>

      {/* scenes */}
      <AnimatePresence mode="wait">
        {key === 'intro' && <IntroScene key="intro" onNext={next} />}
        {key === 'reveal' && <RevealScene key="reveal" onNext={next} />}
        {key === 'birthday' && <BirthdayScene key="birthday" onNext={next} />}
        {key === 'little' && <LittleThingsScene key="little" onNext={next} />}
        {key === 'memories' && <MemoriesScene key="memories" onNext={next} />}
        {key === 'surprises' && <SurprisesScene key="surprises" onNext={next} />}
        {key === 'choose' && <ChooseOneScene key="choose" onNext={next} />}
        {key === 'message' && <PersonalMessageScene key="message" onNext={next} />}
        {key === 'finale' && <FinaleScene key="finale" onNext={next} />}
        {key === 'wish' && <WishScene key="wish" />}
      </AnimatePresence>

      {/* progress dots */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {chapters.map((c, i) => (
          <span
            key={c.key}
            className="h-1 w-1 rounded-full transition-all duration-700"
            style={{
              background: isNight ? 'rgba(255,220,229,0.9)' : 'rgba(184,92,117,0.85)',
              opacity: i === index ? 1 : 0.25,
              width: i === index ? 14 : 4,
            }}
          />
        ))}
      </div>

      {/* optional music toggle */}
      {content.audio.src && (
        <>
          <audio ref={audioRef} src={content.audio.src} loop preload="none" />
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={playing ? 'Pause music' : 'Play music'}
            className="absolute top-5 right-5 z-20 grid h-10 w-10 place-items-center rounded-full border text-sm backdrop-blur-sm transition-colors"
            style={{
              borderColor: isNight ? 'rgba(255,255,255,0.25)' : 'rgba(184,92,117,0.4)',
              color: isNight ? '#ffdce5' : '#b85c75',
            }}
          >
            {playing ? '♪' : '♫'}
          </button>
        </>
      )}
    </main>
  )
}
