/**
 * Engine unit tests — pure logic, no DOM, no Angular, no karma.
 *
 * Run headless with `npm run test:engine`:
 *   tsc -p tsconfig.engine.json && node --test .engine-out/tetris.spec.mjs
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  COLS,
  ROWS,
  clearLines,
  createBoard,
  hardDrop,
  isValid,
  levelFor,
  newGame,
  rotateClockwise,
  scoreFor,
  softDrop,
  tick,
  tickIntervalMs,
  type GameState,
  type Rng,
} from './tetris.js';

/** Rng stub that always spawns shape id 0 (the I piece). */
const alwaysI: Rng = () => 0;

/** Fill a board row, optionally leaving some columns empty. */
function fillRow(board: number[][], y: number, except: number[] = []): void {
  for (let x = 0; x < COLS; x++) {
    board[y][x] = except.includes(x) ? 0 : 9;
  }
}

describe('scoring (classic NES table)', () => {
  it('pays 40/100/300/1200 × (level + 1)', () => {
    assert.equal(scoreFor(1, 0), 40);
    assert.equal(scoreFor(2, 0), 100);
    assert.equal(scoreFor(3, 0), 300);
    assert.equal(scoreFor(4, 0), 1200);
    assert.equal(scoreFor(4, 2), 3600); // tetris on level 2
    assert.equal(scoreFor(0, 5), 0); // no lines, no points
  });
});

describe('level and speed', () => {
  it('advances one level per 10 lines', () => {
    assert.equal(levelFor(0), 0);
    assert.equal(levelFor(9), 0);
    assert.equal(levelFor(10), 1);
    assert.equal(levelFor(25), 2);
  });

  it('speeds up 35ms per level with a 100ms floor', () => {
    assert.equal(tickIntervalMs(0), 400);
    assert.equal(tickIntervalMs(1), 365);
    assert.equal(tickIntervalMs(9), 100); // 400 - 315 = 85 → floored
    assert.equal(tickIntervalMs(20), 100);
  });
});

describe('clearLines', () => {
  it('removes full rows and shifts the stack down', () => {
    const board = createBoard();
    board[10][3] = 5; // marker that must fall by two rows
    fillRow(board, ROWS - 1);
    fillRow(board, ROWS - 2);

    const { board: next, cleared } = clearLines(board);

    assert.equal(cleared, 2);
    assert.equal(next.length, ROWS);
    assert.equal(next[12][3], 5); // marker dropped from row 10 to row 12
    assert.ok(next[ROWS - 1].every((cell) => cell === 0)); // bottom now empty
  });

  it('leaves partial rows untouched', () => {
    const board = createBoard();
    fillRow(board, ROWS - 1, [4]); // one gap → not clearable
    const { cleared } = clearLines(board);
    assert.equal(cleared, 0);
  });
});

describe('isValid (collision / wall validity)', () => {
  const dot = [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  it('rejects positions outside the walls and floor', () => {
    const board = createBoard();
    assert.equal(isValid(board, dot, 0, 0), true);
    assert.equal(isValid(board, dot, -1, 0), false); // left wall
    assert.equal(isValid(board, dot, COLS, 0), false); // right wall
    assert.equal(isValid(board, dot, 0, ROWS), false); // floor
  });

  it('rejects overlap with locked cells', () => {
    const board = createBoard();
    board[5][5] = 3;
    assert.equal(isValid(board, dot, 5, 5), false);
    assert.equal(isValid(board, dot, 6, 5), true);
  });
});

describe('rotateClockwise', () => {
  it('turns a row into a column and returns after four turns', () => {
    const iPiece = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const once = rotateClockwise(iPiece);
    assert.deepEqual(
      once,
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    );
    const fourTimes = rotateClockwise(rotateClockwise(rotateClockwise(once)));
    assert.deepEqual(fourTimes, iPiece);
  });
});

describe('tick / hardDrop', () => {
  it('gravity moves the piece down one row', () => {
    const game = newGame(alwaysI);
    const next = tick(game, alwaysI);
    assert.equal(next.piece.y, game.piece.y + 1);
    assert.equal(next.status, 'playing');
  });

  it('hard drop locks the piece, clears the line, and scores 40 at level 0', () => {
    const game = newGame(alwaysI);
    // I piece is 4 wide at x=3 → leave exactly columns 3..6 open on the bottom row.
    const board = createBoard();
    fillRow(board, ROWS - 1, [3, 4, 5, 6]);
    const rigged: GameState = { ...game, board };

    const next = hardDrop(rigged, alwaysI);

    assert.equal(next.lines, 1);
    assert.equal(next.score, 40);
    assert.ok(next.board[ROWS - 1].every((cell) => cell === 0)); // row cleared
    assert.equal(next.piece.y, 0); // fresh piece spawned at the top
    assert.equal(next.status, 'playing');
  });

  it('soft drop is ignored once the game is over', () => {
    const game = newGame(alwaysI);
    const over: GameState = { ...game, status: 'over' };
    assert.equal(softDrop(over), over); // same reference — no-op
  });
});

describe('game over', () => {
  it('ends the game when the next spawn collides with the stack', () => {
    const game = newGame(alwaysI);
    // Block the spawn row of the next piece (I occupies row 1 of its matrix).
    // Leave column 0 open so these rows are NOT clearable full lines.
    const board = createBoard();
    fillRow(board, 1, [0]);
    fillRow(board, 2, [0]);
    const rigged: GameState = { ...game, board, piece: { ...game.piece, y: ROWS - 4 } };

    const next = tick(rigged, alwaysI); // descends until resting, then locks…
    const settled = hardDrop(rigged, alwaysI); // …or drop straight to the floor

    assert.equal(settled.status, 'over');
    assert.equal(next.status, 'playing'); // still falling — not over yet
  });
});
