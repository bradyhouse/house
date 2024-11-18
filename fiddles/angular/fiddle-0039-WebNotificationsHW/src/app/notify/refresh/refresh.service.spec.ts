import { TestBed, inject } from '@angular/core/testing';

import { RefreshService } from './refresh.service';

describe('RefreshService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshService]
    });
  });

  it('should be created', inject([RefreshService], (service: RefreshService) => {
    expect(service).toBeTruthy();
  }));
});
