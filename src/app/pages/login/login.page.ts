import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/auth.interface';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  private emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private destroy$: Subject<boolean> = new Subject();
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toast: ToastController,
    private navController: NavController
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {}

  public submitForm(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) this.login();
  }

  private login(): void {
    this.authService
      .login()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => this.redirectOrShowErrorMsg(user),
        error: (err) => console.log(err),
      });
  }

  private redirectOrShowErrorMsg(user: LoginResponse): void {
    if (
      this.loginForm.controls.email.value.toString() === user.email &&
      this.loginForm.controls.password.value.toString() === user.password
    ) {
      this.logUser(user);
    } else {
      this.presentToast('Credenciales incorrectas');
    }
  }

  private async presentToast(message: string): Promise<void> {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      cssClass: 'login-toast',
    });
    toast.present();
  }

  private logUser(user: LoginResponse) {
    const loggedUser = new User(user.email, user.name, user.password);
    this.authService.setUser(loggedUser);
    if (this.authService.getUser()) {
        this.navController.navigateForward('/home');
    } else {
      // Nunca va a caer acá pero bueno ;)))))))
      this.presentToast('Error inesperado, por favor recargá la página');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
