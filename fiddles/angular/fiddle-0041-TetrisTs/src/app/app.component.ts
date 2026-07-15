import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TetrisGameComponent } from './tetris/tetris-game.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TetrisGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
