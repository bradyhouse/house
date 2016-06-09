import { GenerateRoutePage } from './app.po';

describe('generate-route App', function() {
  let page: GenerateRoutePage;

  beforeEach(() => {
    page = new GenerateRoutePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('generate-route works!');
  });
});
