import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import * as meta from './meta';
import * as fatalError  from './fatal-error';

console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => fatalError.write(err));
