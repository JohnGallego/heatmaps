import { TestBed, inject } from '@angular/core/testing';

import { DatasetDataService } from './dataset-data.service';

describe('DatasetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasetDataService]
    });
  });

  it('should be created', inject([DatasetDataService], (service: DatasetDataService) => {
    expect(service).toBeTruthy();
  }));
});
