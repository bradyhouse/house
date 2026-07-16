/**
 * Pure Tetris engine — no Angular, no DOM, no timers.
 *
 * Every transition takes a `GameState` and returns a new `GameState`, which
 * keeps the engine trivially unit-testable (see tetris.spec.mts, run with
 * `npm run test:engine`) and makes it a natural fit for Angular signals: the
 * component holds `signal<GameState>` and applies moves via
 * `state.update(moveLeft)`, `state.update(s => tick(s))`, etc.
 *
 * Mechanics are ported faithfully from fiddles/vue/fiddle-0020-TetrisJs:
 *   - a WIDE, landscape board (the vue original was 50x30; we keep the wide
 *     ratio at a more playable size — see COLS/ROWS below),
 *   - pieces that spawn at a RANDOM x across that wide board,
 *   - a 4x4 clockwise matrix rotation.
 * Scoring / level / speed are the classic NES table, added on top.
 */

/**
 * Landscape playfield. The vue original is 50x30 (ratio 5:3) sized to the
 * whole viewport; that is huge to actually play, so we keep the WIDE landscape
 * character at 32x18 (16:9) — blocks read near-square on a widescreen canvas
 * and pieces still appear scattered across a broad field, never a portrait well.
 */
export const COLS = 32;
export const ROWS = 18;

/** Classic NES line-clear base scores for 0..4 lines; multiplied by (level + 1). */
export const LINE_SCORES = [0, 40, 100, 300, 1200] as const;

/**
 * Cell colors indexed by (cell value - 1); cell values are shape ids 1..7.
 * Palette matches the vue original's vivid arcade set so the game reads the
 * same over the video backdrop.
 */
export const COLORS = [
  '#00ffff', // I — cyan
  '#ffa500', // J — orange
  '#2323ff', // L — blue
  '#ffd700', // O — gold
  '#f72119', // S — red
  '#39ff14', // Z — green
  '#a020f0', // T — purple
] as const;

export type Matrix = readonly (readonly number[])[];

export interface Piece {
  /** 4x4 matrix; non-zero cells carry the shape id (1..7) used for coloring. */
  readonly matrix: Matrix;
  /** Board-relative position of the matrix's top-left corner. */
  readonly x: number;
  readonly y: number;
}

export type GameStatus = 'idle' | 'playing' | 'paused' | 'over';

export interface GameState {
  /** ROWS x COLS grid; 0 = empty, 1..7 = locked cell of that shape. */
  readonly board: Matrix;
  readonly piece: Piece;
  readonly score: number;
  readonly lines: number;
  readonly status: GameStatus;
}

/** Injectable randomness so tests can force a piece sequence. */
export type Rng = () => number;

/** The 7 tetrominoes (I, J, L, O, S, Z, T) as 4x4 bit grids. */
const SHAPES: Matrix[] = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

// ---------------------------------------------------------------------------
// Derived values
// ---------------------------------------------------------------------------

/** Level advances every 10 cleared lines. */
export function levelFor(lines: number): number {
  return Math.floor(lines / 10);
}

/** NES scoring: 40 / 100 / 300 / 1200 for 1..4 lines, times (level + 1). */
export function scoreFor(cleared: number, level: number): number {
  return LINE_SCORES[cleared] * (level + 1);
}

/** Gravity tick interval; speeds up 35ms per level, floored at 100ms. */
export function tickIntervalMs(level: number): number {
  return Math.max(100, 400 - level * 35);
}

// ---------------------------------------------------------------------------
// Board / piece primitives
// ---------------------------------------------------------------------------

export function createBoard(): number[][] {
  return Array.from({ length: ROWS }, () => Array<number>(COLS).fill(0));
}

/**
 * Spawn a random piece at a RANDOM horizontal position on the wide board —
 * faithful to the vue original (`Math.floor(rnd * (COLS - 4))`), which is a big
 * part of the landscape feel: pieces rain down all across the field.
 */
export function spawnPiece(rng: Rng = Math.random): Piece {
  const id = Math.floor(rng() * SHAPES.length);
  const matrix = SHAPES[id].map((row) => row.map((cell) => (cell ? id + 1 : 0)));
  const x = Math.floor(rng() * (COLS - 4));
  return { matrix, x, y: 0 };
}

/** Rotate a 4x4 matrix 90° clockwise. */
export function rotateClockwise(matrix: Matrix): number[][] {
  return matrix.map((row, y) => row.map((_, x) => matrix[3 - x][y]));
}

/** True when every occupied cell of `matrix` at (atX, atY) is on an empty board cell. */
export function isValid(board: Matrix, matrix: Matrix, atX: number, atY: number): boolean {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (!matrix[y][x]) continue;
      const boardX = atX + x;
      const boardY = atY + y;
      if (boardX < 0 || boardX >= COLS || boardY < 0 || boardY >= ROWS) return false;
      if (board[boardY][boardX]) return false;
    }
  }
  return true;
}

/** Drop full rows and pad fresh empty rows on top. */
export function clearLines(board: Matrix): { board: number[][]; cleared: number } {
  const remaining = board.filter((row) => row.some((cell) => cell === 0)).map((row) => [...row]);
  const cleared = ROWS - remaining.length;
  while (remaining.length < ROWS) {
    remaining.unshift(Array<number>(COLS).fill(0));
  }
  return { board: remaining, cleared };
}

// ---------------------------------------------------------------------------
// State transitions
// ---------------------------------------------------------------------------

export function newGame(rng: Rng = Math.random): GameState {
  return { board: createBoard(), piece: spawnPiece(rng), score: 0, lines: 0, status: 'playing' };
}

/** A fresh board shown behind the start overlay before the first game. */
export function initialState(rng: Rng = Math.random): GameState {
  return { ...newGame(rng), status: 'idle' };
}

/** Returns the SAME state object when the move is illegal — cheap no-op for signals. */
function tryMove(state: GameState, dx: number, dy: number): GameState {
  const { piece } = state;
  if (state.status !== 'playing' || !isValid(state.board, piece.matrix, piece.x + dx, piece.y + dy)) {
    return state;
  }
  return { ...state, piece: { ...piece, x: piece.x + dx, y: piece.y + dy } };
}

export const moveLeft = (state: GameState): GameState => tryMove(state, -1, 0);
export const moveRight = (state: GameState): GameState => tryMove(state, 1, 0);
export const softDrop = (state: GameState): GameState => tryMove(state, 0, 1);

/** Rotate clockwise if the rotated matrix fits (no wall kicks — walls block rotation). */
export function rotatePiece(state: GameState): GameState {
  if (state.status !== 'playing') return state;
  const rotated = rotateClockwise(state.piece.matrix);
  if (!isValid(state.board, rotated, state.piece.x, state.piece.y)) return state;
  return { ...state, piece: { ...state.piece, matrix: rotated } };
}

/** Merge the piece into the board, clear lines, score, and spawn the next piece. */
function lockPiece(state: GameState, rng: Rng): GameState {
  const merged = state.board.map((row) => [...row]);
  const { matrix, x, y } = state.piece;
  for (let py = 0; py < 4; py++) {
    for (let px = 0; px < 4; px++) {
      if (matrix[py][px]) merged[y + py][x + px] = matrix[py][px];
    }
  }

  const { board, cleared } = clearLines(merged);
  const score = state.score + scoreFor(cleared, levelFor(state.lines));
  const lines = state.lines + cleared;
  const piece = spawnPiece(rng);
  const status: GameStatus = isValid(board, piece.matrix, piece.x, piece.y) ? 'playing' : 'over';
  return { board, piece, score, lines, status };
}

/** One gravity step: descend, or lock + clear + spawn when resting. */
export function tick(state: GameState, rng: Rng = Math.random): GameState {
  if (state.status !== 'playing') return state;
  const dropped = tryMove(state, 0, 1);
  return dropped === state ? lockPiece(state, rng) : dropped;
}

/** Drop straight to the floor and lock immediately. */
export function hardDrop(state: GameState, rng: Rng = Math.random): GameState {
  if (state.status !== 'playing') return state;
  let settled = state;
  for (let next = tryMove(settled, 0, 1); next !== settled; next = tryMove(settled, 0, 1)) {
    settled = next;
  }
  return lockPiece(settled, rng);
}

export function togglePause(state: GameState): GameState {
  if (state.status === 'playing') return { ...state, status: 'paused' };
  if (state.status === 'paused') return { ...state, status: 'playing' };
  return state;
}
