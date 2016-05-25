export class Fiddle0038ComponentResolverPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fiddle-0038-component-resolver-app h1')).getText();
  }
}
