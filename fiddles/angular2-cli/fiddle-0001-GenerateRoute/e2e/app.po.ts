export class GenerateRoutePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('generate-route-app h1')).getText();
  }
}
