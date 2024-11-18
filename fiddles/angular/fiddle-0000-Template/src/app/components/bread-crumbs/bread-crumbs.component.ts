import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li *ngFor="let crumb of crumbs" class="breadcrumb-item">
        <span *ngIf="crumb.url; else noLink">
          <a href="{{crumb.url}}" 
             class="link">{{ crumb.title }}</a>
          &nbsp;&gt;&nbsp;
        </span>
        <ng-template #noLink><span class="nolink">{{ crumb.title }}</span></ng-template>
      </li>
    </ol>
  </nav>`,
styles: `
  @media(max-width:750px) {
    .hide-0-to-750 {
        display: none;
    }
    .back-slash {
        color: white !important;
        background-color: aqua;
    }
  }
  span a:hover {
    border: 2px dotted white;
    background-color: transparent !important;
    font-weight: none;
 
  }

  span a.active-link {
    text-transform: uppercase; /* Makes the text uppercase */
    font-weight: bold;         /* Makes the text bold */
    border: 2px dotted transparent;

  }
  nav {
      color: white !important;
  }
  a {
      color: white !important;
      display: inline-block;
      padding: 0 1rem;
      border: 2px dotted transparent;
      cursor: pointer;
  }
  .nolink {

      color: white !important;
      display: inline-block;
      padding-top: .2rem;
  }

  .link {
      cursor: pointer;
      margin-bottom: 0;
  }

  .breadcrumb {
      margin-bottom: 0px;
  }

  .active {
      font-weight: bold;
      color: yellow !important;
  }`,  

})
export class BreadCrumbsComponent {
  @Input() crumbs: { title: string; url: string | null }[] = [];
}
