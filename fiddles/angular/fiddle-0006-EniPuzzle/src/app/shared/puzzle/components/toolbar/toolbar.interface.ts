import {EventEmitter} from '@angular/core';
import {ToolbarComponent} from './toolbar.component';
import {ToolbarOptionsInterface} from './toolbar-options.interface';
import {ActionsEnum, DatabaseServiceInterface} from '../../index';

export interface ToolbarInterface {
  options: ToolbarOptionsInterface;
  readonly database: DatabaseServiceInterface;
  toggle: EventEmitter<ToolbarComponent>;
  about: EventEmitter<ToolbarComponent>;
  onToggleClick(): void;
  onAboutClick(): void;
  onActionChange(action: ActionsEnum): void;
  transform(options: ToolbarOptionsInterface): ToolbarOptionsInterface;
}
