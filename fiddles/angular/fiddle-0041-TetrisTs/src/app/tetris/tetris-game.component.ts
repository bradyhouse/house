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
import {
  COLORS,
  COLS,
  GameState,
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
import { FullscreenService } from '../fullscreen/fullscreen.service';

/**
 * Presentation shell around the pure engine.
 *
 * The whole game lives in one `signal<GameState>`; every input applies an
 * engine transition via `state.update(...)`. Derived values (score, level,
 * speed, flattened cells) are `computed`, and the gravity loop is an
 * `effect` that re-schedules its interval whenever the level-driven speed
 * changes — no manual change detection anywhere (OnPush throughout).
 */
@Component({
  selector: 'app-tetris-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tetris-game.component.html',
  styleUrl: './tetris-game.component.css',
})
export class TetrisGameComponent {
  private readonly fullscreen = inject(FullscreenService);
  private readonly shell = viewChild.required<ElementRef<HTMLElement>>('shell');

  protected readonly state = signal<GameState>(initialState());

  protected readonly status = computed(() => this.state().status);
  protected readonly score = computed(() => this.state().score);
  protected readonly lines = computed(() => this.state().lines);
  protected readonly level = computed(() => levelFor(this.lines()));
  protected readonly speedMs = computed(() => tickIntervalMs(this.level()));

  /** Board flattened for @for, with the falling piece overlaid. */
  protected readonly cells = computed<number[]>(() => {
    const { board, piece, status } = this.state();
    const grid = board.map((row) => [...row]);
    if (status === 'playing' || status === 'paused') {
      piece.matrix.forEach((row, y) =>
        row.forEach((cell, x) => {
          if (cell) grid[piece.y + y][piece.x + x] = cell;
        }),
      );
    }
    return grid.flat();
  });

  protected readonly isFullscreen = this.fullscreen.isFullscreen;
  protected readonly fullscreenError = this.fullscreen.error;

  constructor() {
    // Gravity loop: runs only while playing; automatically torn down and
    // re-created at the new interval when the level (hence speed) changes.
    effect((onCleanup) => {
      if (this.status() !== 'playing') return;
      const timer = setInterval(() => this.state.update((s) => tick(s)), this.speedMs());
      onCleanup(() => clearInterval(timer));
    });
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    const status = this.status();
    if (status === 'idle' || status === 'over') return;

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

  protected start(): void {
    this.state.set(newGame());
  }

  protected pause(): void {
    this.state.update(togglePause);
  }

  protected async toggleFullscreen(): Promise<void> {
    await this.fullscreen.toggle(this.shell().nativeElement);
  }

  protected colorOf(cell: number): string | null {
    return cell > 0 ? COLORS[(cell - 1) % COLORS.length] : null;
  }

  protected readonly boardCols = COLS;
}
