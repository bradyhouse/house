fiddle-0026-JumpmanLevels
======

### Title

Jumpman — Five Real Boards


### Creation Date

08/13/2026


### Location

Chicago, IL


### Description

An extension of [fiddle-0025-Jumpman](../fiddle-0025-Jumpman) that swaps the single
hand-made board for **five real levels decoded straight from the public-domain
Jumpman level-editor sources** (`level01.asm` … `level05.asm`). A small parser reads
each file's `SCR_TABLE` — the game's own five-section format (girders → ladders →
upropes → downropes → bombs, each a list of `x, y, length` tile-runs) — plus the
`START_POS`, `NUM_TARGETS`, `BONUS_VALUE`, and `LEVEL_NAME` header fields, and
converts the 320×200 / y-down / 8px-tile coordinates into the fiddle's world units.
The five boards ("Dunno", "Klimber", "Huarg", "Whatever", and an unnamed fifth) are
the editor author's own working levels, rendered exactly as their data specifies —
bomb counts (10 / 6 / 11 / 9 / 6) and bonuses match each file's header.

What this fork adds over 0025:

- **Ladders vs. ropes now look different.** Ladders are drawn as two rails with
  rungs; ropes are a single thin bright strand — no more "everything's a pole."
- **Five distinct boards**, each with its own accent hue and its own real layout,
  framed automatically by a per-board camera fit.
- **Scoring, bonus, and progression.** +100 per bomb, a level bonus on clear (the
  header value ×100), an extra life every 10,000 points (as in the original), and a
  clear → next-board flow that runs the full set and ends on a "you win" screen.
  Seven lives; game over when they run out.

The mechanics carry over unchanged from 0025 and stay faithful to the 8086
disassembly: the jump is the source's fixed 13-frame arc table (apex ~1.5 tiles,
direction locked at takeoff, no air steering, truncates on landing), climbing works
on both ropes and ladders, and falling too far is fatal.

**Controls:** ← → run · ↑ ↓ climb a rope or ladder · SPACE jump / start / advance.


### Tags

three.js, r164, es-modules, importmap, platformer, game, jumpman, level-parser,
retro, neon, bloom, postprocessing, shadows, voxel, webgl


### Forked From

[fiddle-0025-Jumpman](../fiddle-0025-Jumpman)


### Published Version Link

[github.com/bradyhouse/house](https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0026-JumpmanLevels)
