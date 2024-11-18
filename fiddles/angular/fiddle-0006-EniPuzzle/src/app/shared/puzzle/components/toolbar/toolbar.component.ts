import {Component, Input, Output, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import {ToolbarInterface} from './toolbar.interface';
import {ToolbarOptionsInterface} from './toolbar-options.interface';
import {ActionsEnum, DatabaseServiceInterface, StateServiceInterface} from '../../index';
import {BaseComponent} from '../base.component';

@Component({
  moduleId: module.id,
  selector: 'pz-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [
    'toolbar.component.css',
  ],
})
export class ToolbarComponent extends BaseComponent implements ToolbarInterface, OnChanges {

  @Input() options: ToolbarOptionsInterface;
  @Output() toggle: EventEmitter<ToolbarComponent>;
  @Output() about: EventEmitter<ToolbarComponent>;

  constructor() {
    super();
    this.toggle = new EventEmitter<ToolbarComponent>();
    this.about = new EventEmitter<ToolbarComponent>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.options = this.transform(this.options);
    }
  }

  get database(): DatabaseServiceInterface {
    let stateService: StateServiceInterface = this.options &&
    this.options.hasOwnProperty('stateService') ? this.options.stateService : null;
    return stateService ? stateService.databaseService : null;
  }

  onToggleClick(): void {
    let action: ActionsEnum = this.options && this.options.actionService ? this.options.actionService.action : null;


    if (this.options.state === 'PLAY') {
      this.options.state = 'SOLVE';
    } else {
      this.options.state = 'PLAY';
    }
    this.persist(this.options);
    this.options = this.transform(this.options);
    if (action !== null) {
      action = this.options.state === 'PLAY' ? ActionsEnum.SOLVE : ActionsEnum.PLAY;
      this.options.actionService.action = action;
    }
    this.toggle.emit(this);
  }

  onAboutClick(): void {
    this.about.emit(this);
  }

  onActionChange(action: ActionsEnum): void {
    let state: string = this.options ? this.options.state : null;
    if (state) {
      switch (action) {
        case ActionsEnum.PLAY:
          state = 'SOLVE';
          break;
        case ActionsEnum.SOLVE:
          state = 'PLAY';
          break;
      }
      if (state !== this.options.state) {
        this.options.state = state;
        this.persist(this.options);
        this.transform(this.options);
      }
    }
  }

  transform(options: ToolbarOptionsInterface): ToolbarOptionsInterface {

    let state: string = this.isToolbarPersisted(options.id) ?
      this.restoreToolbarOptions(options.id) : options.state;

    if (this.subscriptions.length === 0) {
      if (options.actionService) {
        this.subscriptions.push(options.actionService.actionChange$
          .subscribe(
            (action: any) => this.onActionChange(action)
          ));
      }
    }

    switch (state) {
      case 'PLAY': {
        options.toggleText = 'Play';
        options.toggleTitle = 'Play game';
      }
        break;
      default: {
        options.toggleText = 'Solve';
        options.toggleTitle = 'Solve puzzle';
      }
        break;
    }

    return options;

  }

  isToolbarPersisted(id: string): boolean {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      return databaseService.exists(id);
    }
    return false;
  }

  restoreToolbarOptions(id: string): string {
    let databaseService: DatabaseServiceInterface = this.database,
      state: string = null;
    if (databaseService) {
      state = databaseService.pull(id);
    }
    return state;
  }

  private clearState(id: string) {
    let databaseService: DatabaseServiceInterface = this.database;
    if (databaseService) {
      databaseService.delete(id);
    }
  }

  private persist(options: ToolbarOptionsInterface): void {
    let databaseService: DatabaseServiceInterface = this.database;

    if (databaseService) {
      databaseService.push(options.id, options.state);
    }
  }

}
