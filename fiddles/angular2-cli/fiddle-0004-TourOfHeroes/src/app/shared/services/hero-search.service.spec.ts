import { TestBed, inject } from '@angular/core/testing';

import { HeroSearchService } from './hero-search.service';

describe('HeroSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroSearchService]
    });
  });

  it('should ...', inject([HeroSearchService], (service: HeroSearchService) => {
    expect(service).toBeTruthy();
  }));
});
