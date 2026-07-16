fiddle-0041-TetrisTs
======

### Title

Tetris Ts

### Creation Date

2026-07-15

### Description

A landscape Tetris that plays over a live YouTube video. The playfield is a WIDE,
viewport-sized canvas (32×18) that re-sizes on resize and fullscreen — the canvas is
transparent, so a blurred YouTube `<iframe>` backdrop shows through every empty cell
while you play, and a paste-a-URL control lets you swap the clip (with a preview + reset)
plus a gridline toggle. On top of that faithful base sit classic NES scoring
(40/100/300/1200 × level+1) with a per-level gravity speed-up, a Score/Lines/Level/Speed
HUD, and a Fullscreen button that takes the video-and-board container fullscreen together.

### Tags

tetris, game, typescript, youtube, fullscreen-api, canvas, angular, signals

### Forked From

n/a

### Published Version Link

n/a

## Architecture

- **Pure engine** — `src/app/engine/tetris.ts` holds all game logic as pure
  `GameState → GameState` transitions (landscape dims, random-x spawn, rotation,
  collision, line clear, NES scoring, level/speed). No Angular, no DOM, no timers, so it
  runs headless under `node --test`.
- **Signals** — the component keeps one `signal<GameState>`; every input applies a
  transition via `state.update(...)`. Score/level/speed are `computed`; the gravity loop
  is an `effect` that re-schedules its interval when the level-driven speed changes; a
  second `effect` redraws the canvas whenever the state, grid toggle, or size changes.
- **Landscape canvas** — a `window:resize` + `fullscreenchange` `@HostListener` recomputes
  the canvas size and block size so the wide board always fills the space.
- **Configurable backdrop** — a signal-based `VideoService` (`src/app/video/`) wraps the
  pure `parseYouTubeId` / `buildEmbedUrl` helpers (`src/app/engine/youtube.ts`) and exposes
  a DomSanitizer-trusted embed URL bound to the iframe `src`.
- **Fullscreen** — a signal-based `FullscreenService` (`src/app/fullscreen/`) wraps
  `requestFullscreen` / `webkitRequestFullscreen`, stays in sync via `fullscreenchange`
  (so Esc-exit is handled), and degrades gracefully when the API is unavailable/denied.

## Controls

| Input | Action |
| --- | --- |
| ArrowLeft / ArrowRight | move |
| ArrowUp | rotate (walls block rotation) |
| ArrowDown | soft drop |
| Space | hard drop |
| P | pause / resume |

Buttons: on-screen d-pad, Start/Restart, Pause/Resume, Grid on/off, Video (change the
backdrop), and Fullscreen.

## Project Setup

```sh
npm install
```

### Develop

```sh
npm start          # or: npm run dev  (port 5271)
```

### Build (flat output: `dist/index.html`)

```sh
npm run build
```

`angular.json` sets `outputPath` to `{ "base": "dist", "browser": "" }` so the build emits
a flat `dist/index.html` (what the gallery assembler expects).

### Engine unit tests (headless — no karma/chrome)

The pure engine + YouTube helpers are compiled with `tsc -p tsconfig.engine.json` into
`.engine-out/` and their specs run under node's built-in test runner:

```sh
npm run test:engine
```

Covers: NES scoring table, level/speed curve, line clearing, collision/wall validity,
rotation, random-x spawn bounds, gravity tick, hard drop, game-over detection, and the
YouTube id parsing/embed helpers.

### Playwright smoke test

```sh
npx playwright install   # one-time
npm test
```
