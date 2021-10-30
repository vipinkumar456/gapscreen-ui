import { TestBed } from '@angular/core/testing';

import { RoleAuthGuardService } from './role-auth-guard.service';

describe('RoleAuthGuardService', () => {
  let service: RoleAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
