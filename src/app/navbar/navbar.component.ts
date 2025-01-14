import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Simulate user role - this would typically come from a service or API
  userRole: string = 'admin'; // Change to 'demo' or 'owner' for testing

  // Navbar menu items
  menuItems = [
    {
      label: 'Home',
      link: '/home',
      roles: ['admin', 'demo', 'owner'] // Visible to all
    },
    {
      label: 'Management',
      roles: ['admin', 'demo', 'owner'], // Visible to all
      submenu: [
        {
          label: 'Apartments',
          roles: ['admin', 'owner'], // Admin and owner only
          submenu: [
            { label: 'List', link: '/apartments/list', roles: ['admin', 'owner'] },
            { label: 'Create', link: '/apartments/create', roles: ['admin', 'owner'] }
          ]
        },
        {
          label: 'Advertisements',
          roles: ['admin', 'demo'], // Admin and demo only
          submenu: [
            { label: 'List', link: '/advertisements/list', roles: ['admin', 'demo'] },
            { label: 'Create', link: '/advertisements/create', roles: ['admin', 'demo'] }
          ]
        }
      ]
    }
  ];

  //to check if a menu item is visible based on the user's role
  hasAccess(item: any): boolean {
    return item.roles.includes(this.userRole);
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitStatusComponent } from '../visit/visit-status/visit-status.component';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule],
  providers: [AuthenticationBasicService], // Add service here if not added
})
export class VisitModule {}



