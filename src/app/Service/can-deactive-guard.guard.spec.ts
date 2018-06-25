import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactiveGuardGuard } from './can-deactive-guard.guard';

describe('CanDeactiveGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactiveGuardGuard]
    });
  });

  it('should ...', inject([CanDeactiveGuardGuard], (guard: CanDeactiveGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
