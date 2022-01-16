import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserIsLoggedGuard } from './user-is-logged.guard';
import { RouterTestingModule } from '@angular/router/testing'

describe('UserIsLoggedGuard', () => {
  let guard: UserIsLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    guard = TestBed.inject(UserIsLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
