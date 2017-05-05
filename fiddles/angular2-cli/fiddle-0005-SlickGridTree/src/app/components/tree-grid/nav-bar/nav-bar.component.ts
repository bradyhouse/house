import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseComponent} from '../../base.component';
import 'rxjs/add/operator/debounceTime';
import {NavBarOptions, NavBarChanges, NavBarCmd, NavBarEvent} from './interfaces/index';
import {NavBarCmds, NavBarEvents} from './enums/index';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends BaseComponent implements OnChanges {
  @Input() options: NavBarOptions;
  @Output() changed: EventEmitter<NavBarEvent>;
  enabled: boolean;
  filterControl: FormControl;
  commands: NavBarCmd[];
  showMenu: boolean;

  private _changes: NavBarChanges;

  constructor() {
    super();
    this.changed = new EventEmitter<NavBarEvent>();
    this.filterControl = new FormControl();
    this.enabled = true;
    this.commands = [];
    this.showMenu = false;
    this.subscriptions.push(this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(
        (filter: string) => this.changeFilter(filter)
      ));

  }

  ngOnChanges(changes: any) {

    if (changes.options && changes.options.currentValue) {
      this._changes = this.parseOptionsChange(changes.options.previousValue, changes.options.currentValue);
      if (this._changes.isDisabled) {
        this.enabled = !this.options.isDisabled;
      }

      if (this._changes.filter) {
        this.filterControl.setValue(this.options.filter, {});
      }

      if (this._changes.commands) {
        this.initCommands();
      }
    }
  }

  initCommands() {
    let cmdItems: NavBarCmd[] = [];

    this.options.commands.forEach((cmd: NavBarCmds) => {
      switch (cmd) {
        case NavBarCmds.ClearSelected:
          cmdItems.push({
            text: 'Clear Selected',
            event: NavBarEvents.menu,
            cmd: cmd
          });
          break;
        case NavBarCmds.CollapseAll:
          cmdItems.push({
            text: 'Collapse All',
            event: NavBarEvents.menu,
            cmd: cmd
          });
          break;
        case NavBarCmds.ExpandAll:
          cmdItems.push({
            text: 'Expand All',
            event: NavBarEvents.menu,
            cmd: cmd
          });
          break;
        case NavBarCmds.Reload:
          cmdItems.push({
            text: 'Reload',
            event: NavBarEvents.menu,
            cmd: cmd
          });
          break;
        case NavBarCmds.SelectAll:
          cmdItems.push({
            text: 'Select All',
            event: NavBarEvents.menu,
            cmd: cmd
          });
          break;
        case NavBarCmds.ShowSelected:
          cmdItems.push({
            text: 'Show Selected',
            event: NavBarEvents.menu,
            cmd: cmd
          });
          break;
      }
    });

    if (cmdItems.length) {
      this.commands = cmdItems;
    }

  }

  onClearClick() {
    this.filterControl.setValue('', {});
  }

  onCommandClick(command: NavBarCmd) {
    let event: NavBarEvent = {
      event: NavBarEvents.menu,
      cmd: command.cmd
    };
    this.changed.emit(event);
  }

  private parseOptionsChange(previousOptions: NavBarOptions,
                             currentOptions: NavBarOptions): NavBarChanges {

    if (previousOptions && currentOptions) {
      return {
        isDisabled: previousOptions.isDisabled !== currentOptions.isDisabled,
        filter: previousOptions.filter !== currentOptions.filter,
        commands: JSON.stringify(previousOptions.commands) !== JSON.stringify(currentOptions.commands)
      };
    } else if (currentOptions) {
      return {
        isDisabled: currentOptions.hasOwnProperty('isDisabled'),
        filter: currentOptions.hasOwnProperty('filter'),
        commands: currentOptions.hasOwnProperty('commands')
      }
    } else {
      return {
        isDisabled: false,
        filter: false,
        commands: false
      };
    }
  }

  private changeFilter(value: string) {
    let event: NavBarEvent = {
      event: NavBarEvents.filter,
      data: value
    };

    this.options.filter = value;
    this.changed.emit(event);
  }

}
