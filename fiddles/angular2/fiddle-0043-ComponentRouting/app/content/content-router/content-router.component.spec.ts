/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ContentRouterComponent } from './content-router.component';

describe('Component: ContentRouter', () => {
  it('should create an instance', () => {
    let component = new ContentRouterComponent();
    expect(component).toBeTruthy();
  });
});
