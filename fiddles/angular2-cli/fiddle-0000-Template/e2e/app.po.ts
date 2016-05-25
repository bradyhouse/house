export class Fiddle0000TemplatePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fiddle-0000-template-app h1')).getText();
  }
}
