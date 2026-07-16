/**
 * Pure Tetris engine — no React, no DOM, no timers.
 *
 * The whole game is modeled as a reducer: `tetrisReducer(state, action) -> state`.
 * Randomness is kept pure by threading a deterministic LCG seed through the
 * state, so every transition is reproducible (and unit-testable).
 *
 * Ported from fiddles/vue/fiddle-0020-TetrisJs. Faithful to that original's
 * defining character: a WIDE, LANDSCAPE playfield (50 x 30) whose pieces spawn
 * at a random column across the width (the vue store used
 * `Math.floor(Math.random() * (COLS - 4))`), here made deterministic via the seed.
 */

/**
 * Board dimensions. The original vue fiddle is a WIDE landscape board — 50
 * columns by 30 rows — not a portrait well. These are exported so the renderer
 * can size the canvas (block size = pixelW / COLS x pixelH / ROWS) and a caller
 * could tune the shape while keeping the wide ratio.
 */
export const COLS = 50
export const ROWS = 30

/** Classic NES scoring table, indexed by number of lines cleared at once. */
export const SCORE_TABLE = [0, 40, 100, 300, 1200] as const

/**
 * The 7 tetrominoes as flat bit arrays over a 4x4 grid (row-major),
 * ported verbatim from the vue fiddle's SHAPES constant.
 */
export const SHAPES: readonly (readonly number[])[] = [
  [1, 1, 1, 1], // I
  [1, 1, 1, 0, 1], // J
  [1, 1, 1, 0, 0, 0, 1], // L
  [1, 1, 0, 0, 1, 1], // O
  [1, 1, 0, 0, 0, 1, 1], // Z
  [0, 1, 1, 0, 1, 1], // S
  [0, 1, 0, 0, 1, 1, 1], // T
]

/** Fill colors, indexed by cell value - 1 (also from the vue fiddle). */
export const COLORS = [
  'cyan',
  'orange',
  '#2323ff',
  '#ffd700',
  '#f72119',
  '#39ff14',
  'purple',
] as const

export type Matrix = number[][]

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover'

export interface TetrisState {
  /** ROWS x COLS grid; 0 = empty, 1-7 = locked cell (color index + 1). */
  board: Matrix
  /** 4x4 matrix of the falling piece, same cell encoding as the board. */
  piece: Matrix
  pieceX: number
  pieceY: number
  /** Piece id (index into SHAPES) of the upcoming piece — small HUD preview. */
  nextPieceId: number
  score: number
  lines: number
  status: GameStatus
  /** LCG seed — the only source of randomness, kept in state for purity. */
  seed: number
}

export type TetrisAction =
  | { type: 'start'; seed?: number }
  | { type: 'togglePause' }
  | { type: 'tick' }
  | { type: 'moveLeft' }
  | { type: 'moveRight' }
  | { type: 'softDrop' }
  | { type: 'hardDrop' }
  | { type: 'rotate' }

// --- randomness -----------------------------------------------------------

/** Numerical Recipes LCG — deterministic successor of a 32-bit seed. */
const nextSeed = (seed: number): number =>
  (Math.imul(seed, 1664525) + 1013904223) >>> 0

const pieceIdFromSeed = (seed: number): number => seed % SHAPES.length

/**
 * Random spawn column across the width, mirroring the vue store's
 * `Math.floor(Math.random() * (COLS - 4))` — a piece can appear anywhere along
 * the wide board, not just centered.
 */
const spawnXFromSeed = (seed: number): number => seed % Math.max(1, COLS - 4)

// --- pure helpers ----------------------------------------------------------

export function createEmptyBoard(): Matrix {
  return Array.from({ length: ROWS }, () => new Array<number>(COLS).fill(0))
}

/** Expand a SHAPES entry into a 4x4 matrix whose cells carry the color id. */
export function shapeMatrix(pieceId: number): Matrix {
  const bits = SHAPES[pieceId]
  return Array.from({ length: 4 }, (_, y) =>
    Array.from({ length: 4 }, (_, x) => (bits[4 * y + x] ? pieceId + 1 : 0)),
  )
}

/** Rotate a square matrix 90° clockwise (same transform as the vue store). */
export function rotate(matrix: Matrix): Matrix {
  const size = matrix.length
  return matrix.map((row, y) => row.map((_, x) => matrix[size - 1 - x][y]))
}

/** True when every occupied piece cell lands in-bounds on an empty board cell. */
export function isValidPosition(
  board: Matrix,
  piece: Matrix,
  pieceX: number,
  pieceY: number,
): boolean {
  return piece.every((row, y) =>
    row.every((cell, x) => {
      if (!cell) return true
      const boardX = pieceX + x
      const boardY = pieceY + y
      return (
        boardX >= 0 &&
        boardX < COLS &&
        boardY >= 0 &&
        boardY < ROWS &&
        !board[boardY][boardX]
      )
    }),
  )
}

/** Stamp the piece onto a copy of the board (no mutation). */
export function mergePiece(
  board: Matrix,
  piece: Matrix,
  pieceX: number,
  pieceY: number,
): Matrix {
  return board.map((row, y) =>
    row.map((cell, x) => piece[y - pieceY]?.[x - pieceX] || cell),
  )
}

/** Remove full rows, prepending empty rows to keep the height constant. */
export function clearLines(board: Matrix): { board: Matrix; cleared: number } {
  const remaining = board.filter((row) => row.some((cell) => cell === 0))
  const cleared = board.length - remaining.length
  if (cleared === 0) return { board, cleared }
  const empty = Array.from({ length: cleared }, () =>
    new Array<number>(COLS).fill(0),
  )
  return { board: [...empty, ...remaining], cleared }
}

/** NES scoring: 40 / 100 / 300 / 1200 × (level + 1) for 1-4 lines. */
export function scoreFor(cleared: number, level: number): number {
  return SCORE_TABLE[cleared] * (level + 1)
}

/** Level advances every 10 cleared lines. */
export const levelFor = (lines: number): number => Math.floor(lines / 10)

/** Gravity interval: starts at 400ms and speeds up 35ms per level (min 100). */
export const tickIntervalMs = (level: number): number =>
  Math.max(100, 400 - level * 35)

// --- state transitions ------------------------------------------------------

export function createInitialState(seed = 1): TetrisState {
  const firstId = pieceIdFromSeed(seed)
  return {
    board: createEmptyBoard(),
    piece: shapeMatrix(firstId),
    pieceX: spawnXFromSeed(seed),
    pieceY: 0,
    nextPieceId: pieceIdFromSeed(nextSeed(seed)),
    score: 0,
    lines: 0,
    status: 'idle',
    seed,
  }
}

/**
 * Bring in the queued `nextPieceId` at a random column; queue the following
 * piece and advance the seed twice (once for the spawn column, once for the
 * next id). The game is lost if the new piece has no room to spawn.
 */
function spawn(state: TetrisState): TetrisState {
  const piece = shapeMatrix(state.nextPieceId)
  const seedForX = nextSeed(state.seed)
  const pieceX = spawnXFromSeed(seedForX)
  const seedForNext = nextSeed(seedForX)
  const nextPieceId = pieceIdFromSeed(seedForNext)
  const blocked = !isValidPosition(state.board, piece, pieceX, 0)
  return {
    ...state,
    piece,
    pieceX,
    pieceY: 0,
    nextPieceId,
    seed: seedForNext,
    status: blocked ? 'gameover' : state.status,
  }
}

/** Lock the piece into the board, score any cleared lines, spawn the next. */
function lock(state: TetrisState): TetrisState {
  const merged = mergePiece(state.board, state.piece, state.pieceX, state.pieceY)
  const { board, cleared } = clearLines(merged)
  return spawn({
    ...state,
    board,
    score: state.score + scoreFor(cleared, levelFor(state.lines)),
    lines: state.lines + cleared,
  })
}

function tryMove(state: TetrisState, dx: number, dy: number): TetrisState {
  const pieceX = state.pieceX + dx
  const pieceY = state.pieceY + dy
  return isValidPosition(state.board, state.piece, pieceX, pieceY)
    ? { ...state, pieceX, pieceY }
    : state
}

/** Board with the falling piece overlaid — what the UI actually renders. */
export function getDisplayBoard(state: TetrisState): Matrix {
  if (state.status === 'idle') return state.board
  return mergePiece(state.board, state.piece, state.pieceX, state.pieceY)
}

// --- reducer ----------------------------------------------------------------

export function tetrisReducer(
  state: TetrisState,
  action: TetrisAction,
): TetrisState {
  // Actions allowed in any status.
  switch (action.type) {
    case 'start':
      return spawn({
        ...createInitialState(action.seed ?? nextSeed(state.seed)),
        status: 'playing',
      })
    case 'togglePause':
      if (state.status === 'playing') return { ...state, status: 'paused' }
      if (state.status === 'paused') return { ...state, status: 'playing' }
      return state
    default:
      break
  }

  // Everything below only makes sense while a piece is falling.
  if (state.status !== 'playing') return state

  switch (action.type) {
    case 'moveLeft':
      return tryMove(state, -1, 0)
    case 'moveRight':
      return tryMove(state, 1, 0)
    case 'tick':
    case 'softDrop': {
      const dropped = tryMove(state, 0, 1)
      return dropped === state ? lock(state) : dropped
    }
    case 'hardDrop': {
      let pieceY = state.pieceY
      while (isValidPosition(state.board, state.piece, state.pieceX, pieceY + 1)) {
        pieceY += 1
      }
      return lock({ ...state, pieceY })
    }
    case 'rotate': {
      const rotated = rotate(state.piece)
      // Try in place, then a one-cell wall kick to either side.
      for (const kick of [0, -1, 1]) {
        if (isValidPosition(state.board, rotated, state.pieceX + kick, state.pieceY)) {
          return { ...state, piece: rotated, pieceX: state.pieceX + kick }
        }
      }
      return state
    }
    default:
      return state
  }
}
