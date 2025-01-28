import { Component } from '@angular/core';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

type MenuItem = ({ label: string; link: string; roles: string[]; submenu: MenuItem[] });

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isCollapsed = true;

  constructor(private authenticationService: AuthenticationBasicService) {}

  // Navbar menu items
  menuItems: MenuItem[] = [
    {
      label: 'About',
      link: '/about',
      roles: ['admin', 'demo', 'owner'], // Visible to all
      submenu: []
    },
    {
      label: 'Documentation',
      link: '/documentation',
      roles: ['admin', 'demo', 'owner'], // Visible to all
      submenu: []
    },
    {
      label: 'Apartments',
      link: '',
      roles: ['admin', 'user', 'owner'], //  Visible to all
      submenu: [
        { label: 'List', link: '/apartments', roles: ['admin', 'user', 'owner'], submenu: [] },
        { label: 'Create', link: '/apartment/create', roles: ['admin', 'owner'], submenu: [] } // Just admin and owner
      ]
    },
    {
      label: 'Advertisements',
      link: '',
      roles: ['admin', 'user', 'owner'], //  Visible to all
      submenu: [
        { label: 'List', link: '/advertisements', roles: ['admin', 'user', 'owner'], submenu: [] },
      ]
    },
    {
      label: 'Rooms',
      link: '',
      roles: ['admin', 'user', 'owner'], //  Visible to all
      submenu: [
        { label: 'List', link: '/rooms', roles: ['admin', 'user', 'owner'], submenu: [] },
        { label: 'Create', link: '/room/create', roles: ['admin', 'owner'], submenu: [] },
      ]
    },
    {
      label: 'Users',
      link: '',
      roles: ['admin'], // Admin only
      submenu: [
        { label: 'List', link: '/advertisements/list', roles: ['admin'], submenu: [] }
      ]
    }
  ];

  //to check if a menu item is visible based on the user's role
  hasAccess(item: MenuItem): boolean {
    return item.roles.some((role: string) =>
      this.authenticationService.getCurrentUser().getRoles().includes(role));
  }

  isLogged(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
