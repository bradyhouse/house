import { TestBed } from '@angular/core/testing';

import { MockApiService } from './mock-api.service';

describe('MockApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockApiService = TestBed.get(MockApiService);
    expect(service).toBeTruthy();
  });
});
