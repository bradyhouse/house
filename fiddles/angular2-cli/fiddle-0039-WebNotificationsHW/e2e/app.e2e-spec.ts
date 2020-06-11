import { AppPage, ExpectedResults } from './app.po';
import { browser } from 'protractor';

describe('ag-grid-master-detail App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the fiddle description', () => {
    page.navigateTo();
    expect(page.description).toEqual(ExpectedResults.description);
  });

  it('should include a fork me link', () => {
    page.navigateTo();
    expect(page.githubLink).toEqual(ExpectedResults.gitHubLink);
  });

  it('should include an instructions pop-up', () => {
    page.navigateTo();
    expect(page.instructions).toEqual(ExpectedResults.instructions);
  })

  it('should support sorting Account in Ascending Order', () => {
    page.navigateTo();
    expect(page.clickHeader('Account')).toBeTruthy();
    expect(page.getFirstCell('account')).toEqual(ExpectedResults.sortAscAccountFirstCell);
  });


});
