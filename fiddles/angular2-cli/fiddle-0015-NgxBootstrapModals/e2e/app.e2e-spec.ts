import { NgxBootstrapModalsPage } from './app.po';

describe('ngx-bootstrap-modals App', () => {
  let page: NgxBootstrapModalsPage;

  beforeEach(() => {
    page = new NgxBootstrapModalsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
