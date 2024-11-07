import { StructuralDirectivePage } from './app.po';

describe('structural-directive App', () => {
  let page: StructuralDirectivePage;

  beforeEach(() => {
    page = new StructuralDirectivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
