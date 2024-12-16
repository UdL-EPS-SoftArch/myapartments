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
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getAparments(): void {
    this.apartmentService.findByOwner(this.currentUser).subscribe({
      next: (resourceCollection) => {
        this.apartments = resourceCollection.resources || [];
        if (this.apartments.length > 0) {
          this.loadAdvertisementsForApartments();
        }
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
      }
    });
  }

  loadAdvertisementsForApartments(): void {
    const AdvertisementsRequests: Observable<Advertisement[]>[] = this.apartments.map((apartment) => {
      apartment.id = apartment.getIdFromLinks();
      apartment.owner = this.currentUser;
      return this.getAdvertisements(apartment);
    });

    forkJoin(AdvertisementsRequests).subscribe({
      next: (AdvertisementsArray) => {
        this.advertisements = AdvertisementsArray.flat();
        console.log(this.advertisements);
      },
      error: (err) => {
        console.error('Error fetching Advertisement:', err);
        this.errorMessageService.showErrorMessage('Failed to load Advertisement');
      }
    });
  }

  getAdvertisements(apartment: Apartment): Observable<Advertisement[]> {
    return this.advertisementService.findByApartment(apartment).pipe(
      map((resourceCollection) => resourceCollection.resources || [])
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/advertisement/create']);
  }

}
