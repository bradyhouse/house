/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, bootstrap, View} from "angular2/angular2";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, NgIf} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

@Component({
    selector: 'fiddle-0015-NgModel'

})
@View({
    directives: [FORM_DIRECTIVES, NgIf],
    template: `
  <div>
    <h2>Demo Form: with ng-model</h2>
    <form [ng-form-model]="myForm"
          (submit)="onSubmit(myForm.value)">

      <div class="form-group">
        <label for="productNameInput">Product Name</label>
        <input type="text"
               class="form-control"
               id="productNameInput"
               placeholder="Product Name"
               [ng-form-control]="myForm.find('productName')"
               [(ng-model)]="productName">
      </div>

      <div *ng-if="!myForm.valid"
        class="bg-warning">Form is invalid</div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>

    <div>
      The product name is: {{productName}}
    </div>
  </div>
  `
})
class Fiddle {
    myForm: ControlGroup;
    productName: string;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            "productName":  ["", Validators.required]
        });
    }

    onSubmit(value) {
        console.log('you submitted value: ', value);
    }
}

bootstrap(Fiddle);
