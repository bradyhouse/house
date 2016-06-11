import { GeneratePipePage } from './app.po';

describe('generate-pipe App', function() {
  let page: GeneratePipePage;

  beforeEach(() => {
    page = new GeneratePipePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('generate-pipe works!');
  });
});
