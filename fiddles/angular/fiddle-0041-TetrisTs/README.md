fiddle-0041-TetrisTs
======

### Title

Tetris Ts


### Creation Date

2026-07-15


### Description

A fully playable Tetris built with Angular 19 signals — the whole game lives in one `signal<GameState>`, driven by a pure TypeScript engine (`src/app/engine/tetris.ts`) with classic NES scoring (40/100/300/1200 × level+1) and a gravity loop that speeds up per level via an `effect`. A small signal-based `FullscreenService` wraps `requestFullscreen`/`webkitRequestFullscreen` with graceful fallback messaging, keeping the board centered and playable in fullscreen. Game mechanics ported from the vue fiddle-0020-TetrisJs; the engine is headless-testable with `node --test` (no karma, no chrome).


### Tags

tetris, game, typescript, fullscreen-api, dom, angular, signals


### Forked From

n/a


### Published Version Link

n/a


## Controls

| Input | Action |
| --- | --- |
| ArrowLeft / ArrowRight | move |
| ArrowUp | rotate (walls block rotation) |
| ArrowDown | soft drop |
| Space | hard drop |
| P | pause / resume |

Buttons: Start/Restart, Pause/Resume, Fullscreen (label follows `fullscreenchange`, so Esc-exit stays in sync; shows an inline error if the API is unavailable or denied).


## Project Setup

```sh
npm install
```

### Develop

```sh
npm start
```

### Build (output: `dist/fiddle-0041-tetris-ts/browser/`)

```sh
npm run build
```

### Engine unit tests (headless — no karma/chrome)

The pure engine is compiled with `tsc -p tsconfig.engine.json` into `.engine-out/`
and its spec (`src/app/engine/tetris.spec.mts`) runs under node's built-in test runner:

```sh
npm run test:engine
```

Covers: NES scoring table, level/speed curve, line clearing, collision/wall
validity, rotation, gravity tick, hard drop, and game-over detection.

### Playwright smoke test

```sh
npx playwright install   # one-time
npm test
```
