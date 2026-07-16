import { Injectable, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DEFAULT_VIDEO_ID, buildEmbedUrl, parseYouTubeId } from '../engine/youtube';

/**
 * Holds the current YouTube backdrop id as a signal and derives the trusted
 * embed URL bound to the iframe `src`. All parsing is delegated to the pure,
 * headless-tested helpers in engine/youtube.ts; this layer only adds Angular
 * signals + DomSanitizer (Angular treats iframe src as a resource URL and would
 * otherwise strip it).
 */
@Injectable({ providedIn: 'root' })
export class VideoService {
  private readonly sanitizer = inject(DomSanitizer);

  readonly videoId = signal<string>(DEFAULT_VIDEO_ID);

  /** Trusted, autoplay+mute+loop embed URL for the live backdrop iframe. */
  readonly embedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(buildEmbedUrl(this.videoId())),
  );

  /** True while the backdrop is the built-in default clip. */
  readonly isDefault = computed(() => this.videoId() === DEFAULT_VIDEO_ID);

  /**
   * Swap the backdrop from a bare id or any YouTube URL form.
   * Returns the resolved id, or null (and leaves the current clip) on garbage.
   */
  set(input: string): string | null {
    const id = parseYouTubeId(input);
    if (id) this.videoId.set(id);
    return id;
  }

  reset(): void {
    this.videoId.set(DEFAULT_VIDEO_ID);
  }

  /** Trusted embed URL for a live preview of arbitrary draft input, or null if unparseable. */
  previewUrl(input: string): SafeResourceUrl | null {
    const id = parseYouTubeId(input);
    return id ? this.sanitizer.bypassSecurityTrustResourceUrl(buildEmbedUrl(id)) : null;
  }
}
