import { Component, OnInit } from '@angular/core';
import { marked } from 'marked';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {
  
  content:any = 'Loading...';

  constructor() { }

  ngOnInit() {
    this.fetchContent();
  }

  async fetchContent() {
    const origin = window.location.origin;
    const pathName = window.location.pathname.replace('/about', '');
    const url = 'README.md';
    
    try {
      const response = await fetch(url);
      const text = await response.text();
      this.content = marked.parse(text);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  }
}
