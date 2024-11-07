import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-doc-list-item',
  standalone: true,
  template: `
    <div class="item">
      <div class="item-icon">
        <ng-template #iconContent>
          <ng-content select="[icon]"></ng-content>
        </ng-template>
      </div>
      <ng-container *ngIf="iconHref; else noIconHref">
        <i>
          <a href="{{iconHref}}" target="_blank" rel="noopener">
            <ng-container *ngTemplateOutlet="iconContent"></ng-container>
          </a>
        </i>
      </ng-container>

      <ng-template #noIconHref>
        <i>
          <ng-container *ngTemplateOutlet="iconContent"></ng-container>
        </i>
      </ng-template>

      <div class="details">
        <h3 style="color: black">
          <ng-content select="[heading]"></ng-content>
        </h3>
        <div>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .item {
      margin-top: 2rem;
      display: flex;
    }

    .item-icon{
      --color-background: #2c3e50 !important;
      color: white !important;
      transition: none !important;
    }

    .item-icon:hover {
      --color-background: #2c3e50 !important;
      color: white !important;
      transition: none !important;
    }
    
    .details {
      flex: 1;
      margin-left: 1rem;
    }

    i {
      display: flex;
      place-items: center;
      place-content: center;
      width: 32px;
      height: 32px;
      color: #2c3e50;
      --color-background: white;
      cursor: pointer;
    }

    a {
      --color-background: #2c3e50 !important;
      cursor: pointer !important;
    }

    
    a:hover,
    i:hover {
      --color-background: #2c3e50 !important;
      color: white !important;
      transition: none !important;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.4rem;
      color: #2c3e50;
    }

    @media (min-width: 500px) {
      .item {
        margin-top: 0;
        padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
      }

      i {
        top: calc(50% - 25px);
        left: -26px;
        position: absolute;
        border: 1px solid var(--color-border);
        background: var(--color-background);
        border-radius: 8px;
        width: 50px;
        height: 50px;
      }

      .item:before {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        bottom: calc(50% + 25px);
        height: calc(50% - 25px);
      }

      .item:after {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        top: calc(50% + 25px);
        height: calc(50% - 25px);
      }

      .item:first-of-type:before {
        display: none;
      }

      .item:last-of-type:after {
        display: none;
      }
    }
  `],
  imports: [CommonModule, NgIf]
})
export class DocListItemComponent {
  @Input() iconHref?: string;
}
