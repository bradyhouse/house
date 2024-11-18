import { browser, by, element } from 'protractor';

import * as agGridUtils from 'ag-grid-testing';



export enum ExpectedResults {
  "description" = "Enterprise AgGrid ~ State Management",
  "gitHubLink" = "Fork Me On Github",
  "instructions" = "Move your mouse over a cell",
  "sortAscAccountFirstCell" = "177000",
  "sortDscAccountFirstCell" = "177004",
  "columnTitles" = "Name, Account, Calls, Minutes, Comment, Rating"
}


export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  get description() {
    return element(by.id('description')).getText();
  }

  get githubLink() {
    return element(by.id('githubLink')).getText();
  }

  get instructions() {
    return element(by.id('instructions')).getText();
  }

  getFirstCell(columnName: string) {
    return agGridUtils.getCellContentsAsText(0, columnName, null);
  }

  getCellLocator(columnName: string) {
    return agGridUtils.getLocatorForCell(0, columnName, null);
  }

  get columnTitles() {
    return element.all(by.css(".ag-header-cell-text"))
    .map(function (header) {
      return header.getText();
    });
  }

  clickHeader(columnName: string) {
    agGridUtils.clickOnHeader(columnName);
    return browser.sleep(2000).then(() => {
      return true;
    });
  }

  doubleClickHeader(columnName: string) {
    agGridUtils.clickOnHeader(columnName);
    return browser.sleep(1000).then(() => {
      agGridUtils.clickOnHeader(columnName);
      return browser.sleep(1000).then(()=> {
        return true;
      });
    });
  }

}
