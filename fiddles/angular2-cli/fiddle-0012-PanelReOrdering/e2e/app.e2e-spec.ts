import { PanelReOrderingPage } from './app.po';

describe('panel-re-ordering App', () => {
  let page: PanelReOrderingPage;

  beforeEach(() => {
    page = new PanelReOrderingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
