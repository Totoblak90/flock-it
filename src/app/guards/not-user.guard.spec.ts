import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotUserGuard } from './not-user.guard';
import { AuthService } from '../services/auth.service';

describe('NotUserGuard', () => {
  let guard: NotUserGuard;

  beforeEach(() => {
    let mockAuthService: AuthService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    guard = TestBed.inject(NotUserGuard);

    mockAuthService = TestBed.inject(AuthService);
    spyOn(mockAuthService, 'getUser').and.returnValue(null)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
