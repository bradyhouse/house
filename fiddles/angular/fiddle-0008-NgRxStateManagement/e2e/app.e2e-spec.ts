import { NgRxStateManagementPage } from './app.po';

describe('ng-rx-state-management App', () => {
  let page: NgRxStateManagementPage;

  beforeEach(() => {
    page = new NgRxStateManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
