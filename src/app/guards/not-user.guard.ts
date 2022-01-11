import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class NotUserGuard implements CanActivate, CanLoad {
  public get user(): User {
    return this.authService.getUser();
  }

  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.user) return true;
    else return false;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.user) return true;
    else return false;
  }
}
