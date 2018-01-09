import { TestBed, inject } from '@angular/core/testing';

import { VolumeService } from './volume.service';

describe('VolumeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolumeService]
    });
  });

  it('should be created', inject([VolumeService], (service: VolumeService) => {
    expect(service).toBeTruthy();
  }));
});
