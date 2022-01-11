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
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserIsLoggedGuard implements CanActivate, CanLoad {
  public get user(): User {
    return this.authService.getUser();
  }

  constructor(
    private authService: AuthService,
    private navController: NavController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.user) {
      this.navController.navigateForward('/login');
      return false;
    } else return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.user) {
      this.navController.navigateForward('/login');
      return false;
    } else return true;
  }
}
