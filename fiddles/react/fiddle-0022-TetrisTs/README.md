fiddle-0022-TetrisTs
======

### Title

Tetris Ts


### Creation Date

2026-07-15


### Description

A faithful React 19 + TypeScript rebuild of the vue fiddle-0020-TetrisJs Tetris, keeping its
defining character: a WIDE, landscape playfield (50 × 30) sized to the viewport that reflows on
resize, drawn on a transparent `<canvas>` layered over a configurable YouTube video background so
the video shows through the empty cells while you play. A control lets you paste any YouTube URL or
bare video id to swap the backdrop (with a live preview and reset-to-default), and gridlines toggle
on and off over the video. On top of the faithful base it adds classic NES scoring
(40/100/300/1200 × level+1) with a score/lines/level HUD and gravity that accelerates per level,
plus a Fullscreen button that promotes the video + board together via the Fullscreen API (WebKit
fallback, graceful when unavailable). The game runs on a pure, reducer-style engine with a
deterministic seed-in-state RNG, covered by vitest unit tests.


### Tags

tetris, game, react, typescript, youtube, fullscreen-api, canvas, vite, vitest


### Forked From

n/a


### Published Version Link

n/a
