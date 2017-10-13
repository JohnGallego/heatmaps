import { TestBed, inject } from '@angular/core/testing';

import { ProjectsCollectionService } from './projects-collection.service';

describe('ProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsCollectionService]
    });
  });

  it('should be created', inject([ProjectsCollectionService], (service: ProjectsCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
