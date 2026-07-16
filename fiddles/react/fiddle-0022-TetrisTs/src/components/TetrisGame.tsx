import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import {
  COLORS,
  COLS,
  ROWS,
  createInitialState,
  getDisplayBoard,
  levelFor,
  shapeMatrix,
  tetrisReducer,
  tickIntervalMs,
  type Matrix,
  type TetrisAction,
} from '../engine/tetris'
import { useFullscreen } from '../hooks/useFullscreen'
import { useYouTubeBackground } from '../hooks/useYouTubeBackground'
import { buildPreviewSrc, parseYouTubeId } from '../engine/youtube'
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

const cellColor = (cell: number): string =>
  COLORS[(cell - 1) % COLORS.length]

/** Faithful port of the vue fiddle's white→color gradient block. */
function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  bw: number,
  bh: number,
  color: string,
): void {
  const sx = bw * x
  const sy = bh * y
  const grad = ctx.createLinearGradient(sx, sy, sx + bw - 1, sy + bh - 1)
  grad.addColorStop(0, 'white')
  grad.addColorStop(1, color)
  ctx.fillStyle = grad
  ctx.fillRect(sx, sy, Math.max(1, bw - 1), Math.max(1, bh - 1))
}

/** Subtle edge vignette + cyan gridlines, echoing the vue original. */
function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bw: number,
  bh: number,
): void {
  const vignette = ctx.createLinearGradient(0, 0, w, h)
  vignette.addColorStop(0, 'rgba(0,0,0,0.35)')
  vignette.addColorStop(0.5, 'rgba(0,0,0,0)')
  vignette.addColorStop(1, 'rgba(0,0,0,0.35)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = 'rgba(0, 255, 255, 0.18)'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 0; x <= w + 0.5; x += bw) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
  }
  for (let y = 0; y <= h + 0.5; y += bh) {
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
  }
  ctx.stroke()
}

/** Draw the whole scene onto the transparent canvas over the video. */
function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  board: Matrix,
  gridOn: boolean,
): void {
  ctx.clearRect(0, 0, w, h)
  const bw = w / COLS
  const bh = h / ROWS
  if (gridOn) drawGrid(ctx, w, h, bw, bh)
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = board[y][x]
      if (cell) drawBlock(ctx, x, y, bw, bh, cellColor(cell))
    }
  }
}

/** Non-fullscreen container size — the vue original's window formula. */
function computeStageSize(): { w: number; h: number } {
  if (typeof window === 'undefined') return { w: 960, h: 540 }
  return {
    w: Math.max(360, window.innerWidth - 300),
    h: Math.max(240, window.innerHeight - 200),
  }
}

export default function TetrisGame() {
  const [state, dispatch] = useReducer(
    tetrisReducer,
    Date.now() >>> 0,
    createInitialState,
  )
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { isFullscreen, isSupported, error, toggle } =
    useFullscreen(gameContainerRef)
  const backdrop = useYouTubeBackground()

  const [gridOn, setGridOn] = useState(true)
  const [stage, setStage] = useState(computeStageSize)
  // Actual rendered pixel size of the game container (drives the canvas).
  const [px, setPx] = useState({ w: 0, h: 0 })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [draftUrl, setDraftUrl] = useState('')
  const [dialogError, setDialogError] = useState<string | null>(null)

  const level = levelFor(state.lines)
  const { status } = state

  // --- gravity: one reducer tick per interval, faster each level ------------
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => dispatch({ type: 'tick' }), tickIntervalMs(level))
    return () => clearInterval(id)
  }, [status, level])

  // --- keyboard controls -----------------------------------------------------
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      // Don't hijack typing in the video-config input.
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'))
        return
      const action = KEY_ACTIONS[event.key]
      if (!action) return
      event.preventDefault() // keep Space/arrows from scrolling the page
      dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // --- non-fullscreen stage size tracks the viewport ------------------------
  useEffect(() => {
    const onResize = () => setStage(computeStageSize())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // --- ResizeObserver: canvas always matches the container's real size ------
  // Fires on mount, on viewport resize, AND on fullscreen enter/exit — the one
  // source of truth for the canvas pixel dimensions, so block size is always
  // recomputed to fill the space.
  useEffect(() => {
    const el = gameContainerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      setPx({ w: Math.round(rect.width), h: Math.round(rect.height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // --- render the transparent canvas over the video -------------------------
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || px.w === 0 || px.h === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(px.w * dpr))
    const h = Math.max(1, Math.round(px.h * dpr))
    if (canvas.width !== w) canvas.width = w
    if (canvas.height !== h) canvas.height = h
    drawScene(ctx, w, h, getDisplayBoard(state), gridOn)
  }, [state, px, gridOn])

  // --- handlers --------------------------------------------------------------
  const start = useCallback(
    () => dispatch({ type: 'start', seed: Date.now() >>> 0 }),
    [],
  )
  const blurThen = (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur() // Space/arrows should drive the game, not re-click
    fn()
  }

  const openDialog = () => {
    setDraftUrl(backdrop.videoId)
    setDialogError(null)
    setDialogOpen(true)
  }
  const confirmVideo = () => {
    const id = backdrop.setFromInput(draftUrl)
    if (!id) {
      setDialogError('Could not find a YouTube video id in that input.')
      return
    }
    setDialogOpen(false)
  }
  const resetVideo = () => {
    backdrop.reset()
    setDialogOpen(false)
  }

  const nextPiece = useMemo(
    () => shapeMatrix(state.nextPieceId),
    [state.nextPieceId],
  )
  const previewId = parseYouTubeId(draftUrl) ?? backdrop.videoId
  const canPause = status === 'playing' || status === 'paused'

  return (
    <div className="tetris-root">
      <div
        className="game-container"
        ref={gameContainerRef}
        style={isFullscreen ? undefined : { width: stage.w, height: stage.h }}
      >
        {/* YouTube backdrop — sits BEHIND the transparent canvas (z-index). */}
        <div className="video-wrapper">
          <iframe
            title="YouTube background"
            className="youtube-background"
            src={backdrop.embedSrc}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* The game is drawn here; empty cells stay transparent so the video reads. */}
        <canvas ref={canvasRef} className="game-canvas" aria-label="Tetris board" />

        {/* HUD overlay — always visible, including in fullscreen. */}
        <div className="hud">
          <div className="hud-brand">TETRIS</div>
          <div className="hud-stats">
            <div className="hud-item">
              <span className="hud-label">Score</span>
              <span className="hud-value">{state.score}</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Lines</span>
              <span className="hud-value">{state.lines}</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Level</span>
              <span className="hud-value">{level}</span>
            </div>
          </div>
          <div className="hud-next">
            <span className="hud-label">Next</span>
            <div className="next-grid">
              {nextPiece.flatMap((row, y) =>
                row.map((cell, x) => (
                  <span
                    key={`${y}:${x}`}
                    className="next-cell"
                    style={cell ? { backgroundColor: cellColor(cell) } : undefined}
                  />
                )),
              )}
            </div>
          </div>
        </div>

        {/* Center status overlay for idle / paused / game-over. */}
        {status !== 'playing' && (
          <div className="status-overlay">
            {status === 'idle' && <p className="status-title">TETRIS</p>}
            {status === 'paused' && <p className="status-title">Paused</p>}
            {status === 'gameover' && (
              <>
                <p className="status-title">Game Over</p>
                <p className="status-detail">Score {state.score}</p>
              </>
            )}
            <button
              type="button"
              className="status-button"
              onClick={blurThen(
                status === 'paused'
                  ? () => dispatch({ type: 'togglePause' })
                  : start,
              )}
            >
              {status === 'idle'
                ? 'Start'
                : status === 'paused'
                  ? 'Resume'
                  : 'Play Again'}
            </button>
          </div>
        )}

        {/* Control bar — overlays the board, stays reachable in fullscreen. */}
        <div className="control-bar">
          <div className="control-group dpad">
            <button
              type="button"
              title="Left"
              disabled={status !== 'playing'}
              onClick={blurThen(() => dispatch({ type: 'moveLeft' }))}
            >
              ◀
            </button>
            <button
              type="button"
              title="Rotate"
              disabled={status !== 'playing'}
              onClick={blurThen(() => dispatch({ type: 'rotate' }))}
            >
              ▲
            </button>
            <button
              type="button"
              title="Soft drop"
              disabled={status !== 'playing'}
              onClick={blurThen(() => dispatch({ type: 'softDrop' }))}
            >
              ▼
            </button>
            <button
              type="button"
              title="Right"
              disabled={status !== 'playing'}
              onClick={blurThen(() => dispatch({ type: 'moveRight' }))}
            >
              ▶
            </button>
            <button
              type="button"
              title="Hard drop (Space)"
              disabled={status !== 'playing'}
              onClick={blurThen(() => dispatch({ type: 'hardDrop' }))}
            >
              ⤓
            </button>
          </div>

          <div className="control-group">
            <button type="button" onClick={blurThen(start)}>
              {status === 'idle' ? 'Start' : 'Restart'}
            </button>
            <button
              type="button"
              disabled={!canPause}
              onClick={blurThen(() => dispatch({ type: 'togglePause' }))}
            >
              {status === 'paused' ? 'Resume' : 'Pause'}
            </button>
            <button
              type="button"
              className={gridOn ? 'active' : ''}
              title="Toggle gridlines"
              onClick={blurThen(() => setGridOn((g) => !g))}
            >
              {gridOn ? 'Grid ✓' : 'Grid'}
            </button>
            <button type="button" title="Change background video" onClick={openDialog}>
              Video
            </button>
            <button
              type="button"
              disabled={!isSupported}
              title={isSupported ? 'Toggle fullscreen' : 'Fullscreen unavailable'}
              onClick={blurThen(() => void toggle())}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>

        {(!isSupported || error) && (
          <p className="fullscreen-note" role="status">
            {!isSupported
              ? 'Fullscreen is not available in this browser.'
              : error}
          </p>
        )}
      </div>

      {/* Configurable-video dialog. */}
      {dialogOpen && (
        <div
          className="dialog-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogOpen(false)
          }}
        >
          <div className="dialog" role="dialog" aria-label="Change background video">
            <h2>Change background video</h2>
            <input
              type="text"
              value={draftUrl}
              placeholder="Paste a YouTube URL or video id"
              onChange={(e) => {
                setDraftUrl(e.target.value)
                setDialogError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmVideo()
              }}
            />
            <div className="dialog-preview">
              <iframe
                title="Video preview"
                src={buildPreviewSrc(previewId)}
                frameBorder="0"
                allow="encrypted-media; picture-in-picture"
              />
            </div>
            {dialogError && <p className="dialog-error">{dialogError}</p>}
            <div className="dialog-buttons">
              <button type="button" onClick={resetVideo}>
                Reset to default
              </button>
              <button type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={confirmVideo}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
