import {Component} from '@angular/core';
import {
  BoardOptionsInterface,
  ToolbarOptionsInterface,
  ToolbarStateEnum,
  ActionsService,
  DatabaseServiceInterface,
  Config
} from '../../shared/fiddle/index';

import {GameStateService} from './game-state.service';

@Component({
  moduleId: module.id,
  selector: 'fi-game',
  providers: [GameStateService],
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent {
  boardOptions: BoardOptionsInterface;
  toolbarOptions: ToolbarOptionsInterface;
  fiddleTitle: string;

  constructor(private _gameStateService: GameStateService,
              private _actionService: ActionsService) {

    this.fiddleTitle = Config.fiddleTitle;

    this.boardOptions = {
      id: 'fiddle',
      actionService: _actionService,
      stateService: _gameStateService,
      isSolved: true,
      cols: 8,
      rows: 8
    };

    this.toolbarOptions = {
      id: 'fiddle-toolbar',
      state: this.isToolbarPersisted('fiddle-toolbar') ? this.restoreToolbarState('fiddle-toolbar') : ToolbarStateEnum.PLAY,
      actionService: _actionService,
      stateService: _gameStateService,
      isAbout: false
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
