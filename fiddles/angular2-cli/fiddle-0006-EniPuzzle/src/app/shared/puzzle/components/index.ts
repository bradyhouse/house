import {SquareComponent} from './square/square.component';
import {RowComponent} from './row/row.component';
import {BoardComponent} from './board/board.component';
import {ToolbarComponent} from './toolbar/toolbar.component';


export const PUZZLE_COMPONENTS: any[] = [
  SquareComponent,
  RowComponent,
  BoardComponent,
  ToolbarComponent
];

export * from './square/square.component';
export * from './square/square-options.interface';

export * from './row/row.component';
export * from './row/row-options.interface';

export * from './board/board.component';
export * from './board/board-options.interface';

export * from './toolbar/toolbar.component';
export * from './toolbar/toolbar-options.interface';
export * from './toolbar/toolbar-state.enum';

