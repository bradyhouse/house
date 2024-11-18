import { SlickGridQuickFilterPage } from './app.po';

describe('slick-grid-quick-filter App', () => {
  let page: SlickGridQuickFilterPage;

  beforeEach(() => {
    page = new SlickGridQuickFilterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
