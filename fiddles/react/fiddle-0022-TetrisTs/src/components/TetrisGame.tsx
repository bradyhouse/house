import { useEffect, useReducer, useRef } from 'react'
import {
  COLORS,
  COLS,
  createInitialState,
  getDisplayBoard,
  levelFor,
  shapeMatrix,
  tetrisReducer,
  tickIntervalMs,
  type TetrisAction,
} from '../engine/tetris'
import { useFullscreen } from '../hooks/useFullscreen'
import './TetrisGame.css'

const KEY_ACTIONS: Record<string, TetrisAction> = {
  ArrowLeft: { type: 'moveLeft' },
  ArrowRight: { type: 'moveRight' },
  ArrowDown: { type: 'softDrop' },
  ArrowUp: { type: 'rotate' },
  ' ': { type: 'hardDrop' },
  p: { type: 'togglePause' },
  P: { type: 'togglePause' },
}

const cellColor = (cell: number): string | undefined =>
  cell ? COLORS[(cell - 1) % COLORS.length] : undefined

export default function TetrisGame() {
  const [state, dispatch] = useReducer(
    tetrisReducer,
    Date.now() >>> 0,
    createInitialState,
  )
  const stageRef = useRef<HTMLDivElement>(null)
  const { isFullscreen, isSupported, error, toggle } = useFullscreen(stageRef)

  const level = levelFor(state.lines)
  const { status } = state

  // Gravity: one reducer tick per interval; re-armed whenever the level
  // changes so the game speeds up, and torn down while paused/idle/lost.
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => dispatch({ type: 'tick' }), tickIntervalMs(level))
    return () => clearInterval(id)
  }, [status, level])

  // Keyboard controls. The reducer ignores gameplay keys when not playing,
  // so a single listener for the component's lifetime is enough.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const action = KEY_ACTIONS[event.key]
      if (!action) return
      event.preventDefault() // keep Space/arrows from scrolling the page
      dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const start = () => dispatch({ type: 'start', seed: Date.now() >>> 0 })
  const nextPiece = shapeMatrix(state.nextPieceId)

  return (
    <div className="tetris-stage" ref={stageRef}>
      <div className="tetris-layout">
        <div className="board-frame">
          <div
            className="board"
            role="grid"
            aria-label="Tetris board"
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
          >
            {getDisplayBoard(state).flatMap((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${y}:${x}`}
                  className={cell ? 'cell filled' : 'cell'}
                  style={{ backgroundColor: cellColor(cell) }}
                />
              )),
            )}
          </div>

          {status !== 'playing' && (
            <div className="overlay">
              {status === 'idle' && <p className="overlay-title">TETRIS</p>}
              {status === 'paused' && <p className="overlay-title">Paused</p>}
              {status === 'gameover' && (
                <>
                  <p className="overlay-title">Game Over</p>
                  <p className="overlay-detail">Score {state.score}</p>
                </>
              )}
              {status === 'paused' ? (
                <button type="button" onClick={() => dispatch({ type: 'togglePause' })}>
                  Resume
                </button>
              ) : (
                <button type="button" onClick={start}>
                  {status === 'idle' ? 'Start' : 'Play Again'}
                </button>
              )}
            </div>
          )}
        </div>

        <aside className="panel">
          <h1>Tetris</h1>

          <dl className="hud">
            <div className="hud-item">
              <dt>Score</dt>
              <dd>{state.score}</dd>
            </div>
            <div className="hud-item">
              <dt>Lines</dt>
              <dd>{state.lines}</dd>
            </div>
            <div className="hud-item">
              <dt>Level</dt>
              <dd>{level}</dd>
            </div>
          </dl>

          <div className="next" aria-label="Next piece">
            <span className="label">Next</span>
            <div className="next-grid">
              {nextPiece.flatMap((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${y}:${x}`}
                    className={cell ? 'cell filled' : 'cell'}
                    style={{ backgroundColor: cellColor(cell) }}
                  />
                )),
              )}
            </div>
          </div>

          <div className="controls">
            <button
              type="button"
              onClick={(event) => {
                event.currentTarget.blur() // Space should hard-drop, not re-click
                start()
              }}
            >
              {status === 'idle' ? 'Start' : 'Restart'}
            </button>
            <button
              type="button"
              disabled={status === 'idle' || status === 'gameover'}
              onClick={(event) => {
                event.currentTarget.blur()
                dispatch({ type: 'togglePause' })
              }}
            >
              {status === 'paused' ? 'Resume' : 'Pause'}
            </button>
            <button
              type="button"
              disabled={!isSupported}
              onClick={(event) => {
                event.currentTarget.blur()
                void toggle()
              }}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>

          <p className="fullscreen-note" role="status">
            {!isSupported
              ? 'Fullscreen is not available in this browser.'
              : (error ?? '')}
          </p>

          <ul className="help">
            <li>
              <kbd>←</kbd> <kbd>→</kbd> move
            </li>
            <li>
              <kbd>↑</kbd> rotate
            </li>
            <li>
              <kbd>↓</kbd> soft drop
            </li>
            <li>
              <kbd>Space</kbd> hard drop
            </li>
            <li>
              <kbd>P</kbd> pause
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
