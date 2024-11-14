import { Component } from '@angular/core';
import {AppMainComponent} from '../app.main/app.main.component';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './app.topbar.component.html',
  styleUrl: './app.topbar.component.scss'
})
export class AppTopbarComponent {

  constructor(public appMain: AppMainComponent, public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
