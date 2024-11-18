import { Component } from '@angular/core';
import { DocListComponent } from '../../components/doc-list/doc-list.component';

@Component({
  selector: 'app-docs-view',
  standalone: true,
  imports: [DocListComponent],
  templateUrl: './docs-view.component.html',
  styleUrl: './docs-view.component.css'
})
export class DocsViewComponent {

}
