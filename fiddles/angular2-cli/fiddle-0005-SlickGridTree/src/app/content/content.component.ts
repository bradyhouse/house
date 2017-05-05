import {Component} from '@angular/core';
declare let jQuery: any;


@Component({
  selector: 'content',
  moduleId: module.id,
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css']
})
export class ContentComponent {

  private _width: number;
  private _height: number;

  onWindowResize() {
    this._width = jQuery('.content-component').width();
    this._height = jQuery('.sidebar-component').height();
  }

  get width() {
    if (!this._width) {
      this._width = jQuery('.content-component').width();
    }
    return this._width;
  }

  get height() {
    if (!this._height) {
      this._height = jQuery('.sidebar-component').height();
    }
    return this._height;
  }

}

