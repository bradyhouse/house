/**
 * Pure helpers for the configurable YouTube background — no DOM, no React, so
 * they unit-test in the node environment alongside the game engine.
 *
 * The original vue fiddle let the user paste a YouTube URL (or bare id) to swap
 * the backdrop; these functions parse the id out of either form and build the
 * autoplay/mute/loop embed src the iframe needs.
 */

/** The vue fiddle's default background video. */
export const DEFAULT_VIDEO_ID = 'xCLTpcx9aO8'

/**
 * Extract an 11-char YouTube video id from any of the common forms:
 *   - bare id:                       xCLTpcx9aO8
 *   - watch URL:                     https://www.youtube.com/watch?v=xCLTpcx9aO8&t=3
 *   - short URL:                     https://youtu.be/xCLTpcx9aO8
 *   - embed URL:                     https://www.youtube.com/embed/xCLTpcx9aO8?autoplay=1
 *   - shorts / live URL:             https://www.youtube.com/shorts/xCLTpcx9aO8
 * Returns null when no plausible id can be found.
 */
export function parseYouTubeId(input: string): string | null {
  const raw = input.trim()
  if (!raw) return null

  // A bare id: exactly 11 chars of the YouTube id alphabet.
  const idPattern = /^[a-zA-Z0-9_-]{11}$/
  if (idPattern.test(raw)) return raw

  // Try the various URL shapes. `v=` query param, then path segments.
  const vMatch = raw.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (vMatch) return vMatch[1]

  const pathMatch = raw.match(
    /(?:youtu\.be\/|\/embed\/|\/shorts\/|\/live\/|\/v\/)([a-zA-Z0-9_-]{11})/,
  )
  if (pathMatch) return pathMatch[1]

  return null
}

/**
 * Build the background-iframe src for a video id. Autoplay REQUIRES mute per
 * browser policy; `loop` needs `playlist=<id>` to actually repeat; controls and
 * branding are hidden so the video reads as a clean backdrop.
 */
export function buildEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    controls: '0',
    mute: '1',
    loop: '1',
    playlist: videoId,
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    showinfo: '0',
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

/**
 * Build a lightweight preview src (muted, no autoplay loop churn) for the
 * config dialog's little preview pane.
 */
export function buildPreviewSrc(videoId: string): string {
  const params = new URLSearchParams({
    controls: '0',
    mute: '1',
    modestbranding: '1',
    rel: '0',
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}
