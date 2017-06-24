import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']
})
export class PersonInputComponent {

  @Output() addPerson = new EventEmitter();

  add(personInput){
    this.addPerson.emit(personInput.value);
    personInput.value = '';
  }

}
