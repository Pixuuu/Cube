import { TestBed } from '@angular/core/testing';

import { CategoriesPublicationService } from './categories-publication.service';

describe('CategoriesPublicationService', () => {
  let service: CategoriesPublicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesPublicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
