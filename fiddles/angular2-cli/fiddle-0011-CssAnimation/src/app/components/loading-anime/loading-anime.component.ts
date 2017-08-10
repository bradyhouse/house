import { Component, OnInit, Input, Output, ViewChild, ElementRef, ViewEncapsulation, EventEmitter } from '@angular/core';

import { LoadingAnimeOptions } from './loading-anime-options';

@Component({
  selector: 'app-loading-anime',
  moduleId: module.id,
  templateUrl: './loading-anime.component.html',
  styleUrls: ['./loading-anime.component.css']
})
export class LoadingAnimeComponent implements OnInit {
  @ViewChild('el') el:ElementRef;
  @Input() options:LoadingAnimeOptions;
  @Output() widthChange: EventEmitter<number>;
  @Output() heightChange: EventEmitter<number>;

  constructor() {

    this.widthChange = new EventEmitter<number>();
    this.heightChange = new EventEmitter<number>();

    this.onWindowResize();

  }

  ngOnInit() {
  }

  onWindowResize() {
    if (this.el) {
      this.widthChange.emit(this.el.nativeElement.innerWidth);
      this.heightChange.emit(this.el.nativeElement.innerHeight);

    }
  }

}
