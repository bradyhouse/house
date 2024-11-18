import { SlickGridQuickFilter2Page } from './app.po';

describe('slick-grid-quick-filter2 App', () => {
  let page: SlickGridQuickFilter2Page;

  beforeEach(() => {
    page = new SlickGridQuickFilter2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
