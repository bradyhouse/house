import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.css']
})
export class DaterangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  daterangepickerModel: Date[];

}
