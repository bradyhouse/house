import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
     name: 'fieldValues',
     pure: false
})
export class FieldValuesPipe implements PipeTransform {
     store = [];
     transform(rows:any, [field]) {
          this.store.length = 0;

          rows.map((row) => {
               if (row.hasOwnProperty(field)) {
                    this.store.push(row[field]);
               }
          }
          return this.store;
     }

}
