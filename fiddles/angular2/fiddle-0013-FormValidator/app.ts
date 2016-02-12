/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, NgIf} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

@Component({
    selector: 'fiddle-0013-FormValidator'

})
@View({
    directives: [FORM_DIRECTIVES],
    template: `
  <div>
    <h2>Form Builder</h2>
    <hr/>
    {{heading}}
    <hr/>
    <form [ng-form-model]="myForm" (submit)="onSubmit(myForm.value)">

      <div class="form-group">

        <label for="headingInput">Heading:</label>

        <input type="text"
               class="form-control"
               id="headingInput"
               placeholder="Heading"
               [ng-form-control]="myForm.controls['heading']">

        <div *ng-if="!heading.valid" class="bg-warning">Heading is invalid</div>
        <div *ng-if="heading.hasError('required')" class="bg-warning">SKU is required</div>

      </div>

      <div *ng-if="!myForm.valid" class="bg-warning">Form is invalid</div>

      <button type="submit" class="btn btn-default">Submit</button>

    </form>
  </div>
  `
})
class Fiddle {
    heading: AbstractControl;
    myForm: ControlGroup;

    constructor(fb: FormBuilder) {
        this.heading = "Enter a different value";
        this.myForm = fb.group({
            "heading": ["", Validators.required]
        });

    }

    onSubmit(form) {
        console.log('you entered: ', form);
        this.heading = form.heading;
    }
}

bootstrap(Fiddle);
