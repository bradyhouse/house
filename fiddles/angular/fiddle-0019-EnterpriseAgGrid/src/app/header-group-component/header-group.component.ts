import {Component} from "@angular/core";
import {IHeaderGroupParams} from "ag-grid/main";
import { OnDestroy } from "@angular/core";


@Component({
    templateUrl: 'header-group.component.html',
    styleUrls: ['header-group.component.css']
})
export class HeaderGroupComponent implements OnDestroy {
    public params: any = {};
    public expanded: boolean = false;
    agInit(params: IHeaderGroupParams): void {
        this.params = params;
        this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    }

    ngOnDestroy() {
        console.log(`Destroying HeaderComponent`);
    }


    expandOrCollapse() {
        this.params.setExpanded(!this.expanded);
    };

    onExpandChanged() {
        this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded()
    }
}
