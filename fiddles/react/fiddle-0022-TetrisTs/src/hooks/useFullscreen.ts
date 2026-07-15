import { useCallback, useEffect, useState, type RefObject } from 'react'

/** Safari (WebKit) still ships the prefixed Fullscreen API on some versions. */
type WebKitElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type WebKitDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element | null
}

const fullscreenElement = (): Element | null => {
  const doc = document as WebKitDocument
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

export interface UseFullscreen {
  /** Whether the referenced element (or anything) is currently fullscreen. */
  isFullscreen: boolean
  /** False when the browser exposes no Fullscreen API at all. */
  isSupported: boolean
  /** Human-readable reason the last toggle failed (e.g. permission denied). */
  error: string | null
  /** Enter fullscreen on the ref'd element, or exit if already fullscreen. */
  toggle: () => Promise<void>
}

/**
 * Small wrapper around the Fullscreen API: request/exit on a target element,
 * track state via `fullscreenchange`, and surface denial/support problems
 * instead of throwing.
 */
export function useFullscreen(ref: RefObject<HTMLElement | null>): UseFullscreen {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSupported =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled ||
      'webkitRequestFullscreen' in document.documentElement)

  useEffect(() => {
    const onChange = () => setIsFullscreen(fullscreenElement() !== null)
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  const toggle = useCallback(async () => {
    const element = ref.current as WebKitElement | null
    if (!element) return
    setError(null)
    try {
      if (fullscreenElement()) {
        const doc = document as WebKitDocument
        await (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.())
      } else if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen()
      } else {
        setError('Fullscreen is not supported by this browser.')
      }
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message
          ? cause.message
          : 'Fullscreen request was denied.',
      )
    }
  }, [ref])

  return { isFullscreen, isSupported, error, toggle }
}
