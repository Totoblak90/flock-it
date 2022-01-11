import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent implements OnInit {
  public get user(): User {
    return this.authService.getUser();
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  public logout(): void {
    this.authService.logout();
  }
}
