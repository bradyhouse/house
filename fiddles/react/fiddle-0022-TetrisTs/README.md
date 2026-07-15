fiddle-0022-TetrisTs
======

### Title

Tetris Ts


### Creation Date

2026-07-15


### Description

A fully playable Tetris in React 19 + TypeScript, ported from the vue fiddle-0020-TetrisJs and rebuilt around a pure reducer-style engine driven by `useReducer`. It scores with the classic NES table (40/100/300/1200 × level+1), levels up every 10 lines with an accelerating gravity tick, and shows score, lines, level, and a next-piece preview in the HUD. A custom `useFullscreen` hook toggles the game container fullscreen via `requestFullscreen()` (with the WebKit fallback) and degrades gracefully when the API is unavailable or denied. Arrows move and rotate, Space hard-drops, P pauses; the engine ships with vitest unit tests.


### Tags

tetris, game, react, typescript, fullscreen-api, dom, vite, vitest


### Forked From

n/a


### Published Version Link

n/a
