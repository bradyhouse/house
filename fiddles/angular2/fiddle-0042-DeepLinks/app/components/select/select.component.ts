import { Component, Input, Output, EventEmitter} from '@angular/core';
import {FieldValuesPipe} from './field-values.pipe';

@Component({
    selector: 'select-component',
    templateUrl: './app/components/select/select.component.html',
    styleUrls: ['./app/components/select/select.component.css'],
    pipes: [[FieldValuesPipe]]
})
export class SelectComponent {

    @Input() field:string;
    @Input() selectedItems:Array<any>;
    @Input() items:Array<any>;
    @Input() title:string;
    @Output() change:EventEmitter<{field:string, value:any}> = new EventEmitter();

    onSelectChange($event) {
        if ($event && $event.target && $event.target.value) {
            this.change.emit({
                field: this.field,
                value: $event.target.value
            })
        }
    }

    isSelected(value:string):boolean {
        return this.selectedItems && this.selectedItems.indexOf(value) !== -1 ? true : false;
    }

    get values():Array<any> {
        if (this.items && this.items.length) {
            return this.items;
        }
        return [];
    }

}
