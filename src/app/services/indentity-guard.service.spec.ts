import { TestBed } from '@angular/core/testing';

import { IndentityGuardService } from './indentity-guard.service';

describe('IndentityGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndentityGuardService = TestBed.get(IndentityGuardService);
    expect(service).toBeTruthy();
  });
});
