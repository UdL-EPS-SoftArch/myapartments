import { Component } from '@angular/core';
import { User } from '../../login-basic/user';
import { Apartment } from '../../apartment/apartment';
import { ApartmentService } from '../../apartment/apartment.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-advertisment-list',
  standalone: true,
  imports: [],
  templateUrl: './advertisment-list.component.html',
  styleUrl: './advertisment-list.component.css'
})

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  price: number;
  zipCode: string;
  country: string;
  address: string;
  creationDate: string;
  expirationDate?: string;
  adStatus: string;
  apartment: number;
}

export class AdvertismentListComponent {
  apartments: Apartment[] = [];
  user: User = new User();

  constructor(
    private apartmentService: ApartmentService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.apartmentService.findByOwner(this.user).subscribe({
      next: (response) => {
        this.apartments = response.resources;
      },
      error: (err) => {
        console.error('Error al cargar apartamentos:', err);
      }
    });
    // This is a mock
    this.apartments[0] = new Apartment();
  }
}

