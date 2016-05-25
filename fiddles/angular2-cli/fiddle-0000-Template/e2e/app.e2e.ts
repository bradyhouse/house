import { Fiddle0000TemplatePage } from './app.po';

describe('fiddle-0000-template App', function() {
  let page: Fiddle0000TemplatePage;

  beforeEach(() => {
    page = new Fiddle0000TemplatePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fiddle-0000-template works!');
  });
});
