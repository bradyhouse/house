import { AngularAnimationPage } from './app.po';

describe('angular-animation App', () => {
  let page: AngularAnimationPage;

  beforeEach(() => {
    page = new AngularAnimationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
