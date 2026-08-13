fiddle-0025-Jumpman
======

### Title

Jumpman


### Creation Date

08/13/2026


### Location

Chicago, IL


### Description

A 2.5D three.js tribute to **Jumpman** — Randy Glover's 1983 platformer for EPYX.
The original was donated to the public domain by its authors and disassembled
from the 8086 IBM-PC binary by jeff leyda; this fiddle borrows only the
*mechanics* — run the girders, climb the ropes, collect every bomb, and mind the
drop — rendered as original neon-phosphor art on a dark 3D board with real
lighting, shadows, and bloom.

Gameplay is locked to the `z = 0` plane (classic side-view platformer feel) but
the scene has genuine depth: girders are glowing beams, ropes are hanging
cylinders, bombs pulse and bob, and Jumpman is a chunky voxel figure with a
two-frame run cycle and a fixed-arc hop. The launch board is a faithful-in-spirit
recreation of the first level, **"Easy Does It"** — a full ground floor, three
mid tiers stitched together by ropes, and a lone top ledge, with eight bombs
placed so every one asks for a climb or a jump and none for a leap of faith.

The one mechanic lifted *verbatim* from the source is the jump: it's a fixed,
table-driven arc (the disassembly's own per-frame deltas — up fast, hang at the
top, come down) with the direction locked at takeoff and no mid-air steering, so
it truncates the instant Jumpman's feet find a girder. You can hop a gap but you
can't hop a tier — the ropes are mandatory, exactly as in 1983. Seven lives (the
original's count); fall far without landing and Jumpman doesn't get up. Collect
all eight bombs to clear the board.

The layout is an original "in the spirit of" board: level 1's real data lives in
an external `.dat` that isn't part of the public-domain disassembly (only level 5,
"Vampire," is embedded in the source), so the girders here are hand-placed rather
than decoded.

**Controls:** ← → run · ↑ ↓ climb a rope · SPACE jump / start / restart.


### Tags

three.js, r164, es-modules, importmap, platformer, game, jumpman, bloom,
postprocessing, effectcomposer, unrealbloompass, shadows, voxel, retro, neon,
webgl


### Published Version Link

[github.com/bradyhouse/house](https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0025-Jumpman)
