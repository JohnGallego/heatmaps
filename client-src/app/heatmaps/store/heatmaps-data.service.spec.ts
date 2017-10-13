import { TestBed, inject } from '@angular/core/testing';

import { HeatmapsDataService } from './heatmaps-data.service';

describe('HeatmapsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeatmapsDataService]
    });
  });

  it('should be created', inject([HeatmapsDataService], (service: HeatmapsDataService) => {
    expect(service).toBeTruthy();
  }));
});
