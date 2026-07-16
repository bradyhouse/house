/**
 * Pure YouTube-id helper tests — headless, run alongside the game engine by
 * `npm run test:engine`.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_VIDEO_ID, buildEmbedUrl, parseYouTubeId } from './youtube.js';

describe('parseYouTubeId', () => {
  it('accepts a bare 11-char id', () => {
    assert.equal(parseYouTubeId('xCLTpcx9aO8'), 'xCLTpcx9aO8');
  });

  it('extracts from every common URL form', () => {
    assert.equal(parseYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    assert.equal(parseYouTubeId('https://youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    assert.equal(parseYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'), 'dQw4w9WgXcQ');
    assert.equal(parseYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    assert.equal(parseYouTubeId('https://m.youtube.com/watch?feature=y&v=dQw4w9WgXcQ&t=3'), 'dQw4w9WgXcQ');
  });

  it('returns null for garbage or missing ids', () => {
    assert.equal(parseYouTubeId(''), null);
    assert.equal(parseYouTubeId('not a url'), null);
    assert.equal(parseYouTubeId('https://example.com/watch?v=tooShort'), null);
  });
});

describe('buildEmbedUrl', () => {
  it('builds a muted, autoplaying, looping, chromeless embed', () => {
    const url = buildEmbedUrl(DEFAULT_VIDEO_ID);
    assert.ok(url.startsWith(`https://www.youtube.com/embed/${DEFAULT_VIDEO_ID}?`));
    assert.match(url, /autoplay=1/);
    assert.match(url, /mute=1/); // autoplay requires mute under browser policy
    assert.match(url, /loop=1/);
    assert.match(url, new RegExp(`playlist=${DEFAULT_VIDEO_ID}`)); // loop needs the playlist companion
    assert.match(url, /controls=0/);
  });
});
