export class FiddlePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fiddle-app h1')).getText();
  }
}
