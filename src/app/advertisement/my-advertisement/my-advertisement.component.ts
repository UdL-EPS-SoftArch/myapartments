import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../advertisement';
import { Router } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import {Apartment} from '../../apartment/apartment';
import { User } from '../../login-basic/user';
import {ApartmentService} from '../../apartment/apartment.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
@Component({
  selector: 'app-my-advertisement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-advertisement.component.html',
  styleUrl: './my-advertisement.component.css'
})
export class MyAdvertisementComponent implements OnInit{
  public advertisements: Advertisement[] = [];
  public apartments: Apartment[] = [];
  public currentUser: User = new User();
  public isShowed: boolean = false;

  constructor(private advertisementService: AdvertisementService,
              private apartmentService: ApartmentService,
              private authenticationService: AuthenticationBasicService,
              private errorMessageService: ErrorMessageService,
              private router: Router) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.isShowed = this.isOwner();

    if (!this.isShowed) {
      this.onNotShowed();
    }
    if (this.currentUser) {
      this.getAparments();
      for( const apartment of this.apartments ){
        apartment.id = apartment.getIdFromLinks();
        this.advertisements.concat(this.getAdvertisement(apartment));
      }

    } else {
      console.log('User not authenticated');
    }
  }
  private isOwner(): boolean {
    return this.currentUser.getRoles().includes('owner');
  }

  private onNotShowed(): void {
    this.errorMessageService.showErrorMessage('You are not an owner');
    this.router.navigate(['/apartments']);
  }

  getAparments(): void{
    this.apartmentService.findByOwner(this.currentUser).subscribe({

      next: (resourceCollection) => {

        this.apartments = resourceCollection.resources || []; // Asegúrate de asignar un arreglo
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
      },
    });
  }
  getAdvertisement(apartment: Apartment): Advertisement[]{
    let roomList: Advertisement[] = [];
    this.advertisementService.findByApartment(apartment).subscribe({
      next: (resourceCollection) => {

        roomList = resourceCollection.resources || [];
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
      },
    });
    return roomList;
  }

}
