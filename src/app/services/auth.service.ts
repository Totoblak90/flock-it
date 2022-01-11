import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/auth.interface';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;

  constructor(private http: HttpClient, private navController: NavController) {}

  public login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>('../../assets/db/db.json');
  }

  public setUser(newUser: User): void {
    this._user = newUser;
  }

  public getUser(): User {
    return this._user;
  }

  public logout(): void {
    this._user = undefined;
    this.navController.navigateForward('/login')
  }
}
