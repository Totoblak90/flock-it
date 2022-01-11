import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotUserGuard } from './guards/not-user.guard';
import { UserIsLoggedGuard } from './guards/user-is-logged.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [NotUserGuard],
    canLoad: [NotUserGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    canActivate: [UserIsLoggedGuard],
    canLoad: [UserIsLoggedGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
