import {Component, OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {
  ToolbarOptionsInterface,
  ActionsService,
  DatabaseServiceInterface,
  PuzzleConfig,
  BoardService,
  Board,
  Square,
  Utils
} from './shared/puzzle/index';
import {AppStateService} from './app-state.service';


@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  toolbarOptions: ToolbarOptionsInterface;
  fiddleTitle: string;
  board: Board;
  subscriptions: Array<ISubscription>;
  startDragSquare: Square;
  dragOverSquare: Square;

  constructor(private _boardService: BoardService,
              private _gameStateService: AppStateService,
              private _actionService: ActionsService) {
    this.startDragSquare = null;
    this.dragOverSquare = null;
    this.fiddleTitle = PuzzleConfig.title;
    this.subscriptions = [];

    this.toolbarOptions = {
      id: 'pz-toolbar',
      state: this.isToolbarPersisted('pz-toolbar') === true ? this.restoreToolbarState('pz-toolbar') : 'PLAY',
      toggleText: 'Play',
      actionService: _actionService,
      stateService: _gameStateService,
      isBack: false
    };

    this.subscriptions.push(_boardService.boardChange$.subscribe(
      (board: any) => this.onBoardChange(board)
    ));

    _boardService.init(_gameStateService, new Board(8, 8));

  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  onSquareClick($event: any): void {
    let a: Square = $event,
      b: Square = this._boardService.emptySquare ? this._boardService.emptySquare : null;
    if (a && b && !this.dragOverSquare && !this.startDragSquare) {
      if (!a.isEmpty && Utils.isValidMove(a, b)) {
        Utils.swap(a, b);
        this._boardService.persist(a);
        this._boardService.persist(b);
        this._boardService.emptySquare = a;
      }
    }
  }

  onSquareDragOver($event: any, square: Square) {
    if (this.startDragSquare) {
      this.dragOverSquare = square;
    }
  }


  onSquareDragStart($event: any, square: Square) {
    this.startDragSquare = square;
    $event.dataTransfer.dropEffect = 'move';
  }

  onSquareDragEnd($event: any, square: Square) {
    if(this.startDragSquare && this.dragOverSquare) {
      if (this.startDragSquare.row === this.dragOverSquare.row) {
        return this.onHorizontalDragEnd($event, square);
      }
      /*if (this.startDragSquare.col === this.dragOverSquare.col) {
        return this.onVerticalDragEnd($event, square);
      }*/
    }
    this.startDragSquare = null;
    this.dragOverSquare = null;
  }

  onVerticalDragEnd($event: any, square: Square) {



    this.startDragSquare = null;
    this.dragOverSquare = null;
  }


  onHorizontalDragEnd($event: any, square: Square) {
    let repX: number = Math.abs(this.startDragSquare.col - this.dragOverSquare.col),
      i: number = 1;
    if (repX) {
      for (; i <= repX; i++) {
        if (this.startDragSquare.col < this.dragOverSquare.col) {
          window.setTimeout(() => {
            this._boardService.shiftX(false, square);
          }, i * 66);
        } else {
          window.setTimeout(() => {
            this._boardService.shiftX(true, square);
          }, i * 66);
        }
      }
    }
    this.startDragSquare = null;
    this.dragOverSquare = null;
  }

  protected clearSubscriptions(): void {
    this.subscriptions.map((subscription: ISubscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  get database(): DatabaseServiceInterface {
    return this._gameStateService.databaseService;
  }

  isToolbarPersisted(id: string): boolean {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      return databaseService.exists(id);
    }
    return false;
  }

  restoreToolbarState(id: string): string {
    let databaseService: DatabaseServiceInterface = this.database,
      toolbarState: string = null;

    if (databaseService) {
      toolbarState = databaseService.pull(id);
    }
    return toolbarState;
  }

  onBoardChange(board: Board) {
    console.log(board.toString());
    this.board = board;
  }

}
