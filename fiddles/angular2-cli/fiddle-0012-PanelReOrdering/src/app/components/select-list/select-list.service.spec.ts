import { TestBed, inject } from '@angular/core/testing';

import { SelectListService } from './select-list.service';

describe('SelectListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectListService]
    });
  });

  it('should be created', inject([SelectListService], (service: SelectListService) => {
    expect(service).toBeTruthy();
  }));
});
