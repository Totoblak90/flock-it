import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/auth.interface';
import { User } from '../models/User';

/**
 * Servicio para manejar la sesión del usuario y para guardar o pedir data del mismo.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;

  constructor(private http: HttpClient, private navController: NavController) {}

  /**
   * Pido la data del usuario que inició sesión
   * @returns Observable<LoginResponse>
   */
  public login(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>('../../assets/db/db.json');
  }

  /**
   * Guardo el usuario que inició sesión para cargar su data en la página
   * @param newUser: User
   */
  public setUser(newUser: User): void {
    this._user = newUser;
  }

  /**
   * Pido la información del usuario logueado
   * @returns this._user: User
   */
  public getUser(): User {
    return this._user;
  }

  /**
   * Deslogueo el usuario
   */
  public logout(): void {
    this._user = undefined;
    this.navController.navigateForward('/login');
  }
}
