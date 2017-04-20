import { FiddlePage } from './app.po';

describe('fiddle App', () => {
  let page: FiddlePage;

  beforeEach(() => {
    page = new FiddlePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
