import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  COLORS,
  COLS,
  GameState,
  ROWS,
  hardDrop,
  initialState,
  levelFor,
  moveLeft,
  moveRight,
  newGame,
  rotatePiece,
  softDrop,
  tick,
  tickIntervalMs,
  togglePause,
} from '../engine/tetris';
import { DEFAULT_VIDEO_ID } from '../engine/youtube';
import { FullscreenService } from '../fullscreen/fullscreen.service';
import { VideoService } from '../video/video.service';

/**
 * Presentation shell around the pure engine — faithful to the vue original's
 * character:
 *   - a WIDE, landscape canvas sized to the viewport (and re-sized on resize /
 *     fullscreen), block size recomputed to fill the space,
 *   - a YouTube <iframe> backdrop behind a TRANSPARENT canvas so the video
 *     shows through the empty cells while you play,
 *   - a configurable backdrop (paste a URL or bare id) + a gridline toggle.
 *
 * The whole game lives in one `signal<GameState>`; every input applies an engine
 * transition via `state.update(...)`. Derived values (score/level/speed) are
 * `computed`; the gravity loop is an `effect` that re-schedules its interval
 * whenever the level-driven speed changes; a second `effect` redraws the canvas
 * whenever the state, grid toggle, or viewport size changes. OnPush throughout.
 */
@Component({
  selector: 'app-tetris-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './tetris-game.component.html',
  styleUrl: './tetris-game.component.css',
})
export class TetrisGameComponent {
  private readonly fullscreen = inject(FullscreenService);
  protected readonly video = inject(VideoService);

  /** Fullscreen target: the stage wrapping BOTH the iframe and the canvas. */
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  protected readonly state = signal<GameState>(initialState());

  protected readonly status = computed(() => this.state().status);
  protected readonly score = computed(() => this.state().score);
  protected readonly lines = computed(() => this.state().lines);
  protected readonly level = computed(() => levelFor(this.lines()));
  protected readonly speedMs = computed(() => tickIntervalMs(this.level()));

  /** Landscape canvas size in CSS pixels; recomputed on resize / fullscreen. */
  protected readonly viewW = signal(960);
  protected readonly viewH = signal(540);

  protected readonly gridOn = signal(true);

  // Configurable-video panel state.
  protected readonly showVideoPanel = signal(false);
  protected readonly draftUrl = signal<string>(DEFAULT_VIDEO_ID);
  protected readonly videoError = signal<string | null>(null);
  protected readonly previewUrl = computed(() => this.video.previewUrl(this.draftUrl()));

  protected readonly isFullscreen = this.fullscreen.isFullscreen;
  protected readonly fullscreenError = this.fullscreen.error;

  constructor() {
    this.recompute();

    // Render loop: redraw whenever the state, grid toggle, or size changes.
    effect(() => {
      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas) return;
      const w = this.viewW();
      const h = this.viewH();
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      this.draw(canvas, this.state(), this.gridOn(), w, h);
    });

    // Gravity loop: runs only while playing; torn down and re-created at the new
    // interval when the level (hence speed) changes.
    effect((onCleanup) => {
      if (this.status() !== 'playing') return;
      const timer = setInterval(() => this.state.update((s) => tick(s)), this.speedMs());
      onCleanup(() => clearInterval(timer));
    });
  }

  // ---- input -------------------------------------------------------------

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.state.update(moveLeft);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.state.update(moveRight);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.state.update(softDrop);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.state.update(rotatePiece);
        break;
      case ' ':
        event.preventDefault();
        this.state.update((s) => hardDrop(s));
        break;
      case 'p':
      case 'P':
        this.state.update(togglePause);
        break;
    }
  }

  @HostListener('window:resize')
  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  protected recompute(): void {
    const fs = this.inFullscreen();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (fs) {
      this.viewW.set(vw);
      this.viewH.set(vh);
      return;
    }
    // Wide landscape, sized to the viewport; keep a 16:9 field with near-square
    // blocks, shrinking to fit whichever of width/height is the binding limit.
    let w = Math.max(360, Math.min(vw - 40, 1400));
    let h = Math.round((w * ROWS) / COLS);
    const maxH = Math.max(240, vh - 140);
    if (h > maxH) {
      h = maxH;
      w = Math.round((h * COLS) / ROWS);
    }
    this.viewW.set(w);
    this.viewH.set(h);
  }

  private inFullscreen(): boolean {
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    return Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement);
  }

  // ---- game controls -----------------------------------------------------

  protected start(): void {
    this.state.set(newGame());
  }

  protected pause(): void {
    this.state.update(togglePause);
  }

  protected move(dir: 'left' | 'right' | 'down' | 'rotate' | 'drop'): void {
    switch (dir) {
      case 'left':
        this.state.update(moveLeft);
        break;
      case 'right':
        this.state.update(moveRight);
        break;
      case 'down':
        this.state.update(softDrop);
        break;
      case 'rotate':
        this.state.update(rotatePiece);
        break;
      case 'drop':
        this.state.update((s) => hardDrop(s));
        break;
    }
  }

  protected toggleGrid(): void {
    this.gridOn.update((on) => !on);
  }

  protected async toggleFullscreen(): Promise<void> {
    await this.fullscreen.toggle(this.stage().nativeElement);
  }

  // ---- configurable video ------------------------------------------------

  protected openVideoPanel(): void {
    this.draftUrl.set(this.video.videoId());
    this.videoError.set(null);
    this.showVideoPanel.set(true);
  }

  protected closeVideoPanel(): void {
    this.showVideoPanel.set(false);
  }

  protected applyVideo(): void {
    const id = this.video.set(this.draftUrl());
    if (!id) {
      this.videoError.set('Could not find a YouTube video id in that input.');
      return;
    }
    this.videoError.set(null);
    this.showVideoPanel.set(false);
  }

  protected resetVideo(): void {
    this.video.reset();
    this.draftUrl.set(DEFAULT_VIDEO_ID);
    this.videoError.set(null);
  }

  // ---- canvas rendering --------------------------------------------------

  private draw(canvas: HTMLCanvasElement, state: GameState, gridOn: boolean, w: number, h: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const bw = w / COLS;
    const bh = h / ROWS;

    ctx.clearRect(0, 0, w, h);
    if (gridOn) this.drawGrid(ctx, w, h, bw, bh);

    const { board, piece, status } = state;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const v = board[y][x];
        if (v) this.drawBlock(ctx, x, y, bw, bh, COLORS[(v - 1) % COLORS.length]);
      }
    }

    if (status === 'playing' || status === 'paused') {
      piece.matrix.forEach((row, py) =>
        row.forEach((v, px) => {
          if (v) this.drawBlock(ctx, piece.x + px, piece.y + py, bw, bh, COLORS[(v - 1) % COLORS.length]);
        }),
      );
    }
  }

  private drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, bw: number, bh: number): void {
    // Subtle vignette so the field edges read against the video (echoes the
    // original's black→transparent→black grid gradient, but lighter).
    const vignette = ctx.createLinearGradient(0, 0, w, h);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    vignette.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      const px = Math.round(x * bw) + 0.5;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      const py = Math.round(y * bh) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }
  }

  private drawBlock(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    bw: number,
    bh: number,
    color: string,
  ): void {
    const sx = x * bw;
    const sy = y * bh;
    const cw = Math.max(1, bw - 1);
    const ch = Math.max(1, bh - 1);

    const gradient = ctx.createLinearGradient(sx, sy, sx + cw, sy + ch);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, color);
    ctx.fillStyle = gradient;
    ctx.fillRect(sx, sy, cw, ch);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx + 0.5, sy + 0.5, cw, ch);
  }
}
