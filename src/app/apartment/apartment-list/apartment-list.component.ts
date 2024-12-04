import { Component, OnInit } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css'
})
export class ApartmentListComponent implements OnInit {

  public apartments: Apartment[] = [];
  public currentUser: User = new User();
  public isShowed: boolean = false;
  
constructor(
  private router: Router,
  private apartmentService: ApartmentService,
  private authenticationService: AuthenticationBasicService,
  private errorMessageService: ErrorMessageService,
) {}


ngOnInit(): void {
  // Obtener el usuario actual desde el servicio de usuario
  this.currentUser = this.authenticationService.getCurrentUser();
  this.isShowed = this.isOwner();

  if(!this.isShowed){
    this.onNotShowed();
    return;
  }
  if (this.currentUser) {
    // Si hay un usuario, obtener los apartamentos del dueño
    this.apartmentService.findByOwner(this.currentUser);
  } else {
    // Si no hay usuario, puedes redirigir a la página de inicio de sesión
    console.log('User not authenticated');
  }
}

private isOwner(): boolean {
  return this.currentUser.getRoles().includes('owner');
}

onNotShowed(): void {
  this.errorMessageService.showErrorMessage('You are not an owner');
  this.router.navigate(['/apartments']);
}

}