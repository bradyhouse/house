import { TestBed, inject } from '@angular/core/testing';

import { TimeSeriesService } from './time-series.service';

describe('TimeSeriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeSeriesService]
    });
  });

  it('should be created', inject([TimeSeriesService], (service: TimeSeriesService) => {
    expect(service).toBeTruthy();
  }));
});
