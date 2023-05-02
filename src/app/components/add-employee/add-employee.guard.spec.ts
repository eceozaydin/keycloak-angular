import { TestBed } from '@angular/core/testing';

import { AddEmployeeGuard } from './add-employee.guard';

describe('AddEmployeeGuard', () => {
  let guard: AddEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
