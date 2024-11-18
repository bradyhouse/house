import { Component } from '@angular/core';
import { DocListItemComponent } from './doc-list-item.component';
import { IconCliComponent } from '../icons/icon-cli.component';
import { IconDocumentationComponent } from '../icons/icon-documentation.component';
import { IconTutorialsComponent } from '../icons/icon-tutorials.component';
import { IconCommunityComponent } from '../icons/icon-community.component';

@Component({
  selector: 'app-doc-list',
  standalone: true,
  imports: [DocListItemComponent, IconCliComponent, IconDocumentationComponent, IconTutorialsComponent, IconCommunityComponent],
  template: `
    <app-doc-list-item iconHref="https://angular.dev">
      <div icon>
        <app-icon-documentation></app-icon-documentation>
      </div>
      <div heading>
        Explore the Docs
      </div>
      Angular’s
    <a href="https://angular.dev/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
    </app-doc-list-item>
    <app-doc-list-item>
      <div icon>
        <app-icon-cli ></app-icon-cli>
      </div>
      <div heading>
        CLI Docs
      </div>
      <div> The <a href="https://angular.dev/tools/cli" target="_blank" rel="noopener">Angular CLI</a> is a command-line interface tool which allows you to scaffold, develop, test, deploy, and maintain Angular applications directly from a command shell.</div>
    </app-doc-list-item>
    <app-doc-list-item>
      <div icon>
        <app-icon-tutorials></app-icon-tutorials>
      </div>
      <div heading>
          Learn with Tutorials
      </div>
      <div>
       The <a href="https://angular.dev/tutorials" target="_blank" rel="noopener">Angular tutorials</a> will guide you through the core concepts of the framework, and get you started building performant, scalable apps.
      </div>
    </app-doc-list-item>
    <app-doc-list-item>
      <div icon>
        <app-icon-community></app-icon-community>
      </div>
      <div heading>
        Angular Language Services
      </div>
      <div>
      The <a href="https://angular.dev/tools/language-service" target="_blank" rel="noopener">Angular Language Service</a> provides code editors with a way to get completions, errors, hints, and navigation inside Angular templates. It works with external templates in separate HTML files, and also with in-line templates.
      </div>
    </app-doc-list-item>
    
  `,
  styles: ``
})
export class DocListComponent {

}
