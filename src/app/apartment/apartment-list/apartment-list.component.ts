import { Component, OnInit } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css'
})
export class ApartmentListComponent implements OnInit {

  apartments: Apartment[] = [];
  currentUser: User = new User();
  
constructor(
  private route: ActivatedRoute,
  private apartmentService: ApartmentService,
  private authenticationService: AuthenticationBasicService,
) {}

ngOnInit(): void {
  // Obtener el usuario actual desde el servicio de usuario
  this.currentUser = this.authenticationService.getCurrentUser();

  if (this.currentUser) {
    // Si hay un usuario, obtener los apartamentos del dueño
    this.apartmentService.findByOwner(this.currentUser);
  } else {
    // Si no hay usuario, puedes redirigir a la página de inicio de sesión
    console.log('User not authenticated');
  }
}


}