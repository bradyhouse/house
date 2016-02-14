/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl, NgIf} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

@Component({
    selector: 'fiddle-0013-FormValidator'

})
@View({
    directives: [FORM_DIRECTIVES, NgIf],
    template: `
  <div>
    <h4>Angular2: Form Validators</h4>
    <div *ng-if="heading.value!='Enter a value' && heading.valid">
        <hr/>
        You entered: {{heading.value}}
        <hr/>
    </div>

    <form [ng-form-model]="myForm" (submit)="onSubmit(myForm.value)">

      <div class="form-group">

        <label for="headingInput">Form Input:</label>

        <input type="text"
               class="form-control"
               id="headingInput"
               placeholder="Heading"
               [ng-form-control]="myForm.controls['heading']">

        <div *ng-if="heading.hasError('required')" class="bg-warning">Enter something!</div>

      </div>

      <button type="submit" class="btn btn-default">Submit</button>

    </form>
  </div>
  `
})
class Fiddle {
    heading: AbstractControl;
    myForm: ControlGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            "heading": ["Enter a value", Validators.required]
        });
        this.heading = this.myForm.controls['heading'];
    }

    onSubmit(form) {
        console.log('you entered: ', form);
    }
}

bootstrap(Fiddle);
