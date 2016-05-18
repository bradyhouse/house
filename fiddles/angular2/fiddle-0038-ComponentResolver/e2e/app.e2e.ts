import { Fiddle0038ComponentResolverPage } from './app.po';

describe('fiddle-0038-component-resolver App', function() {
  let page: Fiddle0038ComponentResolverPage;

  beforeEach(() => {
    page = new Fiddle0038ComponentResolverPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fiddle-0038-component-resolver works!');
  });
});
