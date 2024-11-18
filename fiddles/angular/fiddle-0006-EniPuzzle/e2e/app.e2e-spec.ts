import { EniPuzzlePage } from './app.po';

describe('eni-puzzle App', () => {
  let page: EniPuzzlePage;

  beforeEach(() => {
    page = new EniPuzzlePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
