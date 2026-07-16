import { describe, expect, it } from 'vitest'
import {
  DEFAULT_VIDEO_ID,
  buildEmbedSrc,
  buildPreviewSrc,
  parseYouTubeId,
} from './youtube'

describe('parseYouTubeId', () => {
  it('accepts a bare 11-char id', () => {
    expect(parseYouTubeId('xCLTpcx9aO8')).toBe('xCLTpcx9aO8')
    expect(parseYouTubeId('  xCLTpcx9aO8  ')).toBe('xCLTpcx9aO8')
  })

  it('extracts the id from every common URL shape', () => {
    expect(parseYouTubeId('https://www.youtube.com/watch?v=xCLTpcx9aO8')).toBe(
      'xCLTpcx9aO8',
    )
    expect(
      parseYouTubeId('https://www.youtube.com/watch?v=xCLTpcx9aO8&t=42s'),
    ).toBe('xCLTpcx9aO8')
    expect(parseYouTubeId('https://youtu.be/xCLTpcx9aO8')).toBe('xCLTpcx9aO8')
    expect(
      parseYouTubeId('https://www.youtube.com/embed/xCLTpcx9aO8?autoplay=1'),
    ).toBe('xCLTpcx9aO8')
    expect(parseYouTubeId('https://www.youtube.com/shorts/xCLTpcx9aO8')).toBe(
      'xCLTpcx9aO8',
    )
  })

  it('returns null for input with no recognizable id', () => {
    expect(parseYouTubeId('')).toBeNull()
    expect(parseYouTubeId('not a url')).toBeNull()
    expect(parseYouTubeId('https://example.com/watch?v=short')).toBeNull()
  })
})

describe('buildEmbedSrc', () => {
  it('produces an autoplay + mute + loop background embed', () => {
    const src = buildEmbedSrc(DEFAULT_VIDEO_ID)
    expect(src.startsWith(`https://www.youtube.com/embed/${DEFAULT_VIDEO_ID}?`)).toBe(
      true,
    )
    expect(src).toContain('autoplay=1')
    expect(src).toContain('mute=1') // autoplay requires mute per browser policy
    expect(src).toContain('loop=1')
    expect(src).toContain(`playlist=${DEFAULT_VIDEO_ID}`) // loop needs the playlist param
    expect(src).toContain('controls=0')
  })
})

describe('buildPreviewSrc', () => {
  it('is a muted, controls-free preview for the config dialog', () => {
    const src = buildPreviewSrc('xCLTpcx9aO8')
    expect(src).toContain('/embed/xCLTpcx9aO8?')
    expect(src).toContain('mute=1')
    expect(src).toContain('controls=0')
  })
})
