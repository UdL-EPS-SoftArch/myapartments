import { Component } from '@angular/core';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isCollapsed = true;

  constructor(private authenticationService: AuthenticationBasicService) {
  }

  isLogged(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
