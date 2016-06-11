export class GeneratePipePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('generate-pipe-app h1')).getText();
  }
}
