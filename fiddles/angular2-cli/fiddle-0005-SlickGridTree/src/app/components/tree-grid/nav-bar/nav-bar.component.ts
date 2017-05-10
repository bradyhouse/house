import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseComponent} from '../../base.component';
import 'rxjs/add/operator/debounceTime';
import {NavBarOptions, NavBarCmd, NavBarEvent} from './interfaces/index';
import {NavBarCmds, NavBarEvents} from './enums/index';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends BaseComponent implements OnChanges, DoCheck {
  @Input() options: NavBarOptions;
  @Output() changed: EventEmitter<NavBarEvent>;
  enabled: boolean;
  filterControl: FormControl;
  commands: NavBarCmd[];
  showMenu: boolean;

  private _differ: KeyValueDiffer<string, any> = null;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers,) {
    super();
    this.changed = new EventEmitter<NavBarEvent>();
    this.filterControl = new FormControl();
    this.enabled = true;
    this.commands = [];
    this.showMenu = false;
    this.subscriptions.push(this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(
        (filter: string) => this._changeFilter(filter)
      ));

  }


  ngOnChanges(changes: any) {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        try {
          this._differ = this._differs.find(value).create(this._changeDetector);
        } catch (e) {
          throw new Error(
            `Cannot find a differ supporting object '${value}'`);
        }
      }
    }
  }


  ngDoCheck(): void {
    if (this._differ) {
      const changes: any = this._differ.diff(this.options);
      if (changes) this._applyChanges(changes);
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

  private _applyChanges(changes: any): void {
    if (changes) {
      changes.forEachItem((item: any) => {
        switch (item.key) {
          case 'isDisabled':
            this.enabled = !this.options.isDisabled;
            break;
          case 'filter':
            if (this.options.filter) {
              this.filterControl.setValue(this.options.filter, {});
            }
            break;
          case 'commands':
            if (this.options.commands) {
              this._changeCommands();
            }
            break;
        }
      })
    }

  }

  private _changeFilter(value: string) {
    let event: NavBarEvent = {
      event: NavBarEvents.filter,
      data: value
    };

    this.options.filter = value;
    this.changed.emit(event);
  }

  private _changeCommands() {
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

}
