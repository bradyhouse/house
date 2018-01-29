import { SlickGridTreePage } from './app.po';

describe('slick-grid-tree App', () => {
  let page: SlickGridTreePage;

  beforeEach(() => {
    page = new SlickGridTreePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
