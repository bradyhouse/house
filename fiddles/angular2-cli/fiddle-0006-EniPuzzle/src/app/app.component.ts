import { Component, OnInit } from '@angular/core';
import {
  BoardOptionsInterface,
  ToolbarOptionsInterface,
  ToolbarStateEnum,
  ActionsService,
  DatabaseServiceInterface,
  PuzzleConfig
} from './shared/puzzle/index';
import { AppStateService } from './app-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppStateService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  boardOptions: BoardOptionsInterface;
  toolbarOptions: ToolbarOptionsInterface;
  fiddleTitle: string;

  constructor(private _gameStateService: AppStateService,
              private _actionService: ActionsService) {

    this.fiddleTitle = PuzzleConfig.title;



  }

  ngOnInit() {
    this.boardOptions = {
      id: 'fiddle',
      actionService: this._actionService,
      stateService: this._gameStateService,
      isSolved: true,
      cols: 8,
      rows: 8
    };

    this.toolbarOptions = {
      id: 'pz-toolbar',
      state: this.isToolbarPersisted('pz-toolbar') === true ? this.restoreToolbarState('pz-toolbar') : ToolbarStateEnum.PLAY,
      actionService: this._actionService,
      stateService: this._gameStateService,
      isBack: false
    };
  }

  get database(): DatabaseServiceInterface {
    return this._gameStateService.databaseService;
  }

  isToolbarPersisted(id:string): boolean {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      return databaseService.exists(id);
    }
    return false;
  }

  restoreToolbarState(id:string): ToolbarStateEnum {
    let databaseService: DatabaseServiceInterface = this.database,
      toolbarState: ToolbarStateEnum = null;

    if (databaseService) {
      toolbarState = databaseService.pull(id);
    }
    return toolbarState;
  }
}
