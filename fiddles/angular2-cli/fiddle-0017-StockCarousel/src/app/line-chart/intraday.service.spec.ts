import { TestBed, inject } from '@angular/core/testing';

import { IntradayService } from './intraday.service';

describe('IntradayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntradayService]
    });
  });

  it('should be created', inject([IntradayService], (service: IntradayService) => {
    expect(service).toBeTruthy();
  }));
});
