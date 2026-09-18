// -----------------------------------------------------------------------------
// All personal content lives here so it can be swapped without touching the UI.
// Replace the [PLACEHOLDER] strings and photo paths with the real thing later.
// -----------------------------------------------------------------------------

export type Memory = {
  id: string
  photo: string // path to image, or "" to show an elegant placeholder
  orientation: 'portrait' | 'landscape' | 'square'
  caption: string
}

import type { GlyphName } from '@/components/glyph'

export type ChooseCard = {
  id: string
  glyph: GlyphName
  label: string
  reveal: string
}

export const content = {
  herName: '[HER NAME]',
  yourName: '[YOUR NAME]',

  intro: {
    greeting: 'Hey.',
    line: 'I made something for you.',
    cta: 'Open',
  },

  reveal: {
    subtitle: "This one's just for you.",
  },

  birthday: {
    title: 'Happy Birthday',
    line: 'Today deserves a little more than just a message.',
  },

  littleThings: {
    intro: 'There are a few things I wanted you to see.',
  },

  memories: [
    {
      id: 'm1',
      photo: '',
      orientation: 'portrait',
      caption: '[MEMORY CAPTION 01]',
    },
    {
      id: 'm2',
      photo: '',
      orientation: 'landscape',
      caption: '[MEMORY CAPTION 02]',
    },
    {
      id: 'm3',
      photo: '',
      orientation: 'square',
      caption: '[MEMORY CAPTION 03]',
    },
    {
      id: 'm4',
      photo: '',
      orientation: 'portrait',
      caption: '[MEMORY CAPTION 04]',
    },
  ] as Memory[],

  surprises: {
    intro: 'There are a few things hidden here.',
    hiddenStar: '[HIDDEN MESSAGE 01]',
    holdPrompt: 'Some things deserve a little patience.',
    holdReveal: '[HIDDEN MESSAGE 02]',
  },

  chooseOne: {
    prompt: "Pick one. Don't overthink it.",
    cards: [
      {
        id: 'c1',
        glyph: 'star',
        label: 'A memory',
        reveal: '[A memory you two share goes here.]',
      },
      {
        id: 'c2',
        glyph: 'moon',
        label: 'A little compliment',
        reveal: '[Something you love about her goes here.]',
      },
      {
        id: 'c3',
        glyph: 'heart',
        label: 'A tiny surprise',
        reveal: '[A small surprise or promise goes here.]',
      },
    ] as ChooseCard[],
  },

  personalMessage: {
    intro: 'Okay. One last thing.',
    // Each string appears as its own line, revealed one after another.
    lines: [
      '[PERSONAL MESSAGE GOES HERE.]',
      'Write the things you never quite say out loud.',
      'Take your time with it.',
    ],
  },

  finale: {
    line1: "I'm really glad you exist.",
    playful: 'Made with a little too much effort.',
  },

  wish: {
    prompt: 'Make a wish.',
    closing: 'I hope this year is kind to you.',
  },

  audio: {
    // Drop a file in /public and set the path, e.g. '/music/song.mp3'
    src: '',
    label: '[BACKGROUND MUSIC]',
  },
}

export type Content = typeof content
