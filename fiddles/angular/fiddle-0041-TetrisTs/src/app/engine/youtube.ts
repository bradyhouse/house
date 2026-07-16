/**
 * Pure YouTube-id helpers for the configurable video backdrop — no DOM, no
 * Angular, so they run headless under `npm run test:engine` alongside the game
 * engine. The component/service layer wraps `buildEmbedUrl` in a
 * DomSanitizer-trusted resource URL.
 */

/** The vue original's default clip. */
export const DEFAULT_VIDEO_ID = 'xCLTpcx9aO8';

/** YouTube ids are exactly 11 chars of [A-Za-z0-9_-]. */
const ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * Parse a YouTube video id out of either a bare id or any common URL form:
 *   - https://www.youtube.com/watch?v=<id>
 *   - https://youtu.be/<id>
 *   - https://www.youtube.com/embed/<id>
 *   - https://www.youtube.com/shorts/<id>
 * Returns null when no valid 11-char id can be found.
 */
export function parseYouTubeId(input: string): string | null {
  const raw = (input ?? '').trim();
  if (!raw) return null;

  // Bare id.
  if (ID.test(raw)) return raw;

  // ?v=<id> (watch URLs, and anything carrying a v= query param).
  const vMatch = raw.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (vMatch) return vMatch[1];

  // /embed/<id>, /shorts/<id>, or youtu.be/<id> path forms.
  const pathMatch = raw.match(/(?:youtu\.be\/|\/embed\/|\/shorts\/|\/v\/)([A-Za-z0-9_-]{11})/);
  if (pathMatch) return pathMatch[1];

  return null;
}

/**
 * Build the muted, looping, chromeless embed URL for a video id. Autoplay
 * REQUIRES mute under browser policy; loop needs the playlist=<id> companion.
 */
export function buildEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    controls: '0',
    mute: '1',
    loop: '1',
    playlist: id,
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
