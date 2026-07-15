import { describe, expect, it } from 'vitest'
import {
  COLS,
  ROWS,
  clearLines,
  createEmptyBoard,
  createInitialState,
  isValidPosition,
  levelFor,
  rotate,
  scoreFor,
  shapeMatrix,
  tetrisReducer,
  tickIntervalMs,
  type TetrisState,
} from './tetris'

/** Board with `filledRows` completely full rows stacked at the bottom. */
function boardWithFullBottomRows(filledRows: number) {
  const board = createEmptyBoard()
  for (let y = ROWS - filledRows; y < ROWS; y++) {
    board[y] = new Array(COLS).fill(1)
  }
  return board
}

function playingState(overrides: Partial<TetrisState> = {}): TetrisState {
  const state = tetrisReducer(createInitialState(42), { type: 'start', seed: 42 })
  return { ...state, ...overrides }
}

describe('scoring (classic NES table)', () => {
  it('awards 40/100/300/1200 x (level + 1)', () => {
    expect(scoreFor(1, 0)).toBe(40)
    expect(scoreFor(2, 0)).toBe(100)
    expect(scoreFor(3, 0)).toBe(300)
    expect(scoreFor(4, 0)).toBe(1200)
    expect(scoreFor(2, 3)).toBe(400)
    expect(scoreFor(4, 9)).toBe(12000)
    expect(scoreFor(0, 5)).toBe(0)
  })
})

describe('level and speed progression', () => {
  it('levels up every 10 lines and speeds up 35ms per level, floored at 100ms', () => {
    expect(levelFor(0)).toBe(0)
    expect(levelFor(9)).toBe(0)
    expect(levelFor(10)).toBe(1)
    expect(levelFor(25)).toBe(2)
    expect(tickIntervalMs(0)).toBe(400)
    expect(tickIntervalMs(5)).toBe(225)
    expect(tickIntervalMs(20)).toBe(100) // never faster than 100ms
  })
})

describe('clearLines', () => {
  it('removes full rows and shifts the stack down', () => {
    const board = boardWithFullBottomRows(1)
    board[ROWS - 2][0] = 7 // a lone cell resting on the full row

    const { board: next, cleared } = clearLines(board)

    expect(cleared).toBe(1)
    expect(next).toHaveLength(ROWS)
    expect(next[ROWS - 1][0]).toBe(7) // the lone cell fell to the bottom
    expect(next[0].every((cell) => cell === 0)).toBe(true) // fresh empty top row
  })

  it('clears four rows at once (a tetris)', () => {
    const { board: next, cleared } = clearLines(boardWithFullBottomRows(4))
    expect(cleared).toBe(4)
    expect(next.flat().every((cell) => cell === 0)).toBe(true)
  })
})

describe('isValidPosition', () => {
  const board = createEmptyBoard()
  const oPiece = shapeMatrix(3) // O occupies the top-left 2x2 of its 4x4 frame

  it('accepts in-bounds empty cells and rejects walls, floor and collisions', () => {
    expect(isValidPosition(board, oPiece, 0, 0)).toBe(true)
    expect(isValidPosition(board, oPiece, -1, 0)).toBe(false) // left wall
    expect(isValidPosition(board, oPiece, COLS - 1, 0)).toBe(false) // right wall
    expect(isValidPosition(board, oPiece, 0, ROWS - 1)).toBe(false) // floor

    const occupied = createEmptyBoard()
    occupied[1][1] = 5
    expect(isValidPosition(occupied, oPiece, 0, 0)).toBe(false) // stack collision
  })
})

describe('rotate', () => {
  it('turns the I piece from a row into a column and is identity after 4 turns', () => {
    const iPiece = shapeMatrix(0)
    const once = rotate(iPiece)
    expect(once.map((row) => row[3])).toEqual([1, 1, 1, 1]) // vertical in column 3
    expect(once.flat().filter(Boolean)).toHaveLength(4)

    const fourTimes = rotate(rotate(rotate(once)))
    expect(fourTimes).toEqual(iPiece)
  })
})

describe('tetrisReducer', () => {
  it('hard drop locks the piece at the bottom and spawns a new one', () => {
    const state = playingState()
    const next = tetrisReducer(state, { type: 'hardDrop' })

    expect(next.board[ROWS - 1].some((cell) => cell !== 0)).toBe(true)
    expect(next.pieceY).toBe(0) // fresh piece back at the top
    expect(next.status).toBe('playing')
  })

  it('scores a line clear using the pre-clear level', () => {
    // Bottom row full except where the O piece will land.
    const board = createEmptyBoard()
    for (let x = 2; x < COLS; x++) board[ROWS - 1][x] = board[ROWS - 2][x] = 1
    const state = playingState({ board, piece: shapeMatrix(3), pieceX: 0, pieceY: 0 })

    const next = tetrisReducer(state, { type: 'hardDrop' })

    expect(next.lines).toBe(2)
    expect(next.score).toBe(100) // two lines at level 0
  })

  it('ends the game when the stack blocks the spawn area', () => {
    // Stack reaches row 1, with a gap in column 0 so nothing can clear.
    const board = createEmptyBoard()
    for (let y = 1; y < ROWS; y++) {
      board[y] = new Array(COLS).fill(1)
      board[y][0] = 0
    }
    const state = playingState({ board })

    // The falling piece cannot descend: it locks in the spawn rows, and the
    // next piece has no room to spawn.
    const next = tetrisReducer(state, { type: 'tick' })

    expect(next.status).toBe('gameover')
  })

  it('ignores gameplay actions while paused and resumes on togglePause', () => {
    const paused = tetrisReducer(playingState(), { type: 'togglePause' })
    expect(paused.status).toBe('paused')

    expect(tetrisReducer(paused, { type: 'tick' })).toBe(paused)
    expect(tetrisReducer(paused, { type: 'hardDrop' })).toBe(paused)
    expect(tetrisReducer(paused, { type: 'togglePause' }).status).toBe('playing')
  })
})
