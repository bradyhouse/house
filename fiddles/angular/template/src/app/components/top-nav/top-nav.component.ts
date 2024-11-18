import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-top-nav',
  template: `
  <nav class="navbar navbar-expand navbar-dark bg-primary navbar-top hide-0-to-350">
    <div class="container-fluid">
      <app-bread-crumbs [crumbs]="crumbs"></app-bread-crumbs>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto"></ul>
        <ul class="navbar-nav my-2 my-lg-0">
          <li class="nav-item" *ngFor="let link of navLinks">
            <a [routerLink]="link.path"
               class="nav-link"
               [ngClass]="{'active-link': isActive(link.path)}">
              {{ link.label }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link custom-nav-link" rel="noreferrer" alt="Fork me on GitHub" target="_blank" href="{{href}}">
              Fork Me On Github
            </a>            
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  standalone: true,
  styles: `
    nav a {
      display: inline-block;
      padding: 0 1rem;
      border: 2px dotted transparent;
      color: gainsboro;
      cursor: pointer;
    }

    nav a:first-of-type {
      border: 0;
    }

    nav a.active-link {
      text-transform: uppercase;
      font-weight: bold;
      border: 2px dotted transparent;

    }

    nav a:hover {
      border: 2px dotted white;
      padding: 0 1rem;
      background-color: transparent !important;
      font-weight: none;

    }

    .navbar {
      border-radius: 0 !important;
    }

    @media (max-width: 350px) {
      .hide-0-to-350 {
        display: none;
      }
    }

    .nav-link {
      cursor: pointer;
    }
  `,
  imports: [BreadCrumbsComponent, RouterLink, CommonModule]
})
export class TopNavComponent {
  @Input() href!: string;

  crumbs = [
    { title: 'fiddle.sh', url: 'https://bradyhouse.github.io/' },
    { title: 'Angular', url: 'https://bradyhouse.github.io/angular/index.html' },
    { title: '{{FiddleName}}', url: null }
  ];

  navLinks = [
    { path: '/', label: 'Fiddle' },
    { path: '/about', label: 'About' },
    { path: '/docs', label: 'Docs' }
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
