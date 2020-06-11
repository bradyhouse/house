import { Component, OnInit } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { BaseComponent } from '../app';
import { StateService } from '../state/state.service';
import * as NotifyDomain from '../notify/notify';


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


  constructor(private _stateService: StateService) {
    super();
    this.subscriptions.push(_stateService.notificationsChange$
      .subscribe(
        (notifications: NotifyDomain.Notification[]) => this.onNotificationsStateChange(notifications)
      ));
  }

  ngOnInit() {
    this.configGrid();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onNotificationsStateChange(notifications: NotifyDomain.Notification[]) {
    console.log('notificationQueue > onNotificationsStateChange');
    if (notifications.length && this.gridApi)  {
      this.gridApi.redrawRows({
        rowNodes: notifications
      });
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

}
