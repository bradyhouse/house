import { Component, Input, Output, EventEmitter} from '@angular/core';
import {FieldValues} from './field-values.pipe';

@Component({
     selector: 'select-component',
     templateUrl: './app/components/select/select.component.html',
     styleUrls: ['./app/components/select/select.component.css'],
     pipes: [FieldValues]
})
export class SelectComponent {

     @Input() field:string;
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

     get values():Array<any> {
          if (this.items && this.items.length) {
               return this.items;
          }
          return [];
     }

}
