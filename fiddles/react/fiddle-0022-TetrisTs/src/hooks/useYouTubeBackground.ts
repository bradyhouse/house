import { useCallback, useMemo, useState } from 'react'
import {
  DEFAULT_VIDEO_ID,
  buildEmbedSrc,
  parseYouTubeId,
} from '../engine/youtube'

export interface UseYouTubeBackground {
  /** Current background video id. */
  videoId: string
  /** Ready-to-use iframe src for the current id (autoplay + mute + loop). */
  embedSrc: string
  /** Whether the current id is the default backdrop. */
  isDefault: boolean
  /**
   * Swap the backdrop from a pasted URL or bare id. Returns the parsed id on
   * success, or null when the input has no recognizable YouTube id (state is
   * left unchanged in that case).
   */
  setFromInput: (input: string) => string | null
  /** Restore the original default backdrop. */
  reset: () => void
}

/**
 * Small hook owning the configurable YouTube backdrop: it holds the current
 * video id, derives the embed src, and parses user input (URL or bare id).
 * All the parsing lives in the pure `engine/youtube` module so it stays
 * unit-testable without a DOM.
 */
export function useYouTubeBackground(
  initialId: string = DEFAULT_VIDEO_ID,
): UseYouTubeBackground {
  const [videoId, setVideoId] = useState(initialId)

  const embedSrc = useMemo(() => buildEmbedSrc(videoId), [videoId])

  const setFromInput = useCallback((input: string): string | null => {
    const id = parseYouTubeId(input)
    if (id) setVideoId(id)
    return id
  }, [])

  const reset = useCallback(() => setVideoId(DEFAULT_VIDEO_ID), [])

  return {
    videoId,
    embedSrc,
    isDefault: videoId === DEFAULT_VIDEO_ID,
    setFromInput,
    reset,
  }
}
