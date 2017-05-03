import {Component} from '@angular/core';
declare let jQuery: any;


@Component({
  selector: 'content',
  moduleId: module.id,
  templateUrl: './app/content/content.component.html',
  styleUrls: ['./app/content/content.component.css']
})
export class ContentComponent {

  private _width: number;
  private _height: number;

  onWindowResize() {
    this._width = jQuery('.content-component').width();
    this._height = jQuery('acme-grid').height();
  }

  get width() {
    if (!this._width) {
      this._width = jQuery('.content-component').width();
    }
    return this._width;
  }

  get height() {
    if (!this._height) {
      this._height = jQuery('acme-grid').height();
    }
    return this._height;
  }

}

