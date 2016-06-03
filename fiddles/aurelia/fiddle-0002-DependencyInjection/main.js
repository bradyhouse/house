import regeneratorRuntime from 'babel-runtime/regenerator';
import * as meta from './meta';
window.regeneratorRuntime = regeneratorRuntime;

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot());

  console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
  console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
  console.group();

}
