import { Component, OnInit } from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';


@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements ITooltipAngularComp {

  private params: any;
  private data: any;

  agInit(params): void {
      this.params = params;
      this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
      this.data.color = this.params.color || 'white';
  }

}
