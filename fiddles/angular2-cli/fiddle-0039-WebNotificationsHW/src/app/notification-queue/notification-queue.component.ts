import { Component, OnInit } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { BaseComponent } from '../app';
import { StateService } from '../state/state.service';
import * as NotifyDomain from '../notify/notify';

import {
  GridState
} from '../state/state';

import {
  EventType as HeaderEventType
} from '../components/header/header.component';

@Component({
  selector: 'app-notification-queue',
  templateUrl: './notification-queue.component.html',
  styleUrls: ['./notification-queue.component.css']
})
export class NotificationQueueComponent extends BaseComponent implements OnInit {

  gridApi;
  gridColumnApi;
  modules: any[] = AllModules;
  columnDefs: any;
  rowData: any;
  defaultColDef: any;
  isReady = false;

  constructor(private _stateService: StateService) {
    super();
    this.subscriptions.push(_stateService.notificationsChange$
      .subscribe(
        (notifications: NotifyDomain.Notification[]) => this.onNotificationsStateChange(notifications)
      ));
    this.subscriptions.push(_stateService.isReadyChange$
      .subscribe(
        (isReady: boolean) => this.onIsReadyStateServiceChange(isReady)
      ));
  }

  ngOnInit() {
    this.configGrid();
  }

  onGridReady(params) {
    console.log('onGridReady');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onGridStateChanged(): void {
    if (this.isReady) {
      this._stateService.notificationsGridState = this.captureGridState();
    }
  }

  onIsReadyStateServiceChange(isReady: boolean) {
    if (isReady && this._stateService.notifications && this._stateService.notifications.length) {
      this.restoreGridState(this._stateService.notifications);
    }
  }

  onNotificationsStateChange(notifications: NotifyDomain.Notification[]) {
    console.log('notificationQueue > onNotificationsStateChange');
    if (notifications.length)  {
      this.rowData = notifications;
      this.restoreGridState(notifications);
    }
  }

  onHeaderClick(eventType: HeaderEventType) {
    if (eventType === HeaderEventType.Reset) {
      this._stateService.notificationsGridState = {};
      window.location.reload();
    }
  }

  private configGrid() {
    this.columnDefs = [{
        field: 'id'
      },
      {
        field: 'message'
      },
      {
        field: 'status'
      },
      {
        field: 'versionTimeStamp'
      }
    ];
    this.defaultColDef = {
      filter: true,
      resizable: true,
      sortable: true
    };
    if (this._stateService.notifications && this._stateService.notifications.length) {
      this.rowData = this._stateService.notifications;
    }

  }

  private restoreGridState(rowNodes: NotifyDomain.Notification[]): void {
    const state: GridState = this._stateService.notificationsGridState;
    console.log('restoreGridState > state', state);
    window.setTimeout(() => {
      if (this.gridApi && this.gridColumnApi && state) {
        if (state.columnState) {
          this.gridColumnApi.setColumnState(state.columnState);
        }
        if (state.columnGroupsState) {
          this.gridColumnApi.setColumnGroupState(state.columnGroupsState);
        }
        if (state.sortModel) {
          this.gridApi.setSortModel(state.sortModel);
        }
        if (state.filterModel) {
          this.gridApi.setFilterModel(state.filterModel);
        }
        this.isReady = true;
      }
    }, 1000);
    if (rowNodes && this.gridApi) {
      this.gridApi.redrawRows({
        rowNodes: rowNodes
      });
    }
  }

  private captureGridState(): GridState {
    if (this.gridApi && this.gridColumnApi) {
      return {
        columnState: this.gridColumnApi.getColumnState(),
        columnGroupsState: this.gridColumnApi.getColumnGroupState(),
        sortModel: this.gridApi.getSortModel(),
        filterModel: this.gridApi.getFilterModel()
      };
    }
    return null;
  }


}
