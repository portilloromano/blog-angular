import { TestBed } from '@angular/core/testing';

import { CategoriesChangesService } from './categories-changes.service';

describe('CategoriesChangesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesChangesService = TestBed.get(CategoriesChangesService);
    expect(service).toBeTruthy();
  });
});
