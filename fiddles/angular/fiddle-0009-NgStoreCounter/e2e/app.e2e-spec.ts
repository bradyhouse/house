import { NgStoreCounterPage } from './app.po';

describe('ng-store-counter App', function() {
  let page: NgStoreCounterPage;

  beforeEach(() => {
    page = new NgStoreCounterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
