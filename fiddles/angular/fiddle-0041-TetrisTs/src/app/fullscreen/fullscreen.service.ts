import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/** Safari < 16.4 exposes only the webkit-prefixed API. */
type WebkitElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type WebkitDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

/**
 * Thin, signal-based wrapper around the Fullscreen API.
 *
 * Exposes `isFullscreen` (kept in sync via `fullscreenchange`, so it is also
 * correct when the user exits with Esc) and `error` for graceful degradation
 * when the API is missing or the browser denies the request.
 */
@Injectable({ providedIn: 'root' })
export class FullscreenService {
  private readonly doc = inject(DOCUMENT) as WebkitDocument;

  readonly isFullscreen = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    const sync = () =>
      this.isFullscreen.set(Boolean(this.doc.fullscreenElement ?? this.doc.webkitFullscreenElement));
    this.doc.addEventListener('fullscreenchange', sync);
    this.doc.addEventListener('webkitfullscreenchange', sync);
  }

  async toggle(element: HTMLElement): Promise<void> {
    this.error.set(null);
    try {
      if (this.doc.fullscreenElement ?? this.doc.webkitFullscreenElement) {
        await (this.doc.exitFullscreen?.() ?? this.doc.webkitExitFullscreen?.());
        return;
      }

      const target = element as WebkitElement;
      const request = target.requestFullscreen?.bind(target) ?? target.webkitRequestFullscreen?.bind(target);
      if (!request) {
        this.error.set('Fullscreen is not supported by this browser.');
        return;
      }
      await request();
    } catch {
      this.error.set('Fullscreen was denied — the browser or embedding page blocked the request.');
    }
  }
}
