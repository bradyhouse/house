import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private style: { width: string; height: string; 'overflow-y': string; };

  private imgStyle: { height: string; };

  private numArr = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79];


  get numImages(): number {
    return this.element.nativeElement.querySelectorAll('img').length;
  }

  get navHeight(): number {
    const nav = document.getElementById('navBar');
    if (nav) {
      return nav.offsetHeight;
    }
    return 32;
  }

  constructor(public element: ElementRef) {
    this.style = {
      width: String(window.innerWidth) + 'px',
      height: String(window.innerHeight - this.navHeight) + 'px',
      "overflow-y": 'scroll'
    };
    this.imgStyle = {
      height: String(window.innerHeight - this.navHeight) + 'px'
    };
  }

  onResize():void {
    this.style = {
      width: String(window.innerWidth) + 'px',
      height: String(window.innerHeight - this.navHeight) + 'px',
      "overflow-y": 'scroll'
    };
    this.imgStyle = {
      height: String(window.innerHeight - this.navHeight) + 'px'
    };
  }
}
