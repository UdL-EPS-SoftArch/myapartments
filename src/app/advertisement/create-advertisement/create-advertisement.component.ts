import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../login-basic/user';
import { Apartment } from '../../apartment/apartment';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { Advertisement } from '../advertisement';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import { ApartmentService } from '../../apartment/apartment.service';

@Component({
  selector: 'app-create-advertisement',
  standalone: true,imports: [FormsModule, CommonModule],
  templateUrl: './create-advertisement.component.html',
  styleUrl: './create-advertisement.component.css'
})
export class CreateAdvertisementComponent implements OnInit{
  public advertisement: Advertisement = new Advertisement();
  public user: User = new User();
  public isAuthorized: boolean = false;
  private id = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService:ApartmentService,
    private advertisementService: AdvertisementService,
    private authenticationService: AuthenticationBasicService,
    private errorMessageService: ErrorMessageService,
  ) {}

  
  isAuthorised(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to create an advertisement');
    this.router.navigate(['/advertisement']);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();
    
  }
  
  
  onSubmit(): void {
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    };
    if (this.advertisement?.expirationDate) {
      
      const expirationDate = new Date(this.advertisement.expirationDate); 
      const currentTime = new Date(); 
      expirationDate.setUTCHours(
        currentTime.getUTCHours(),
        currentTime.getUTCMinutes(),
        currentTime.getUTCSeconds(),
        currentTime.getUTCMilliseconds()
      );
      this.advertisement.expirationDate = expirationDate;
  
  }
  
    const apartmentId = this.id;
    this.apartmentService.getResource(apartmentId).subscribe({
      next: (apartment) => {
        this.advertisement.apartment = '/apartment/' + this.id;
        this.advertisement.adStatus = '/advertisementStatuses/1';
        this.advertisementService.createResource({ body: this.advertisement }).subscribe(() => {
          this.router.navigate(['/advertisement' + '1']);
        },
        (error) => {
          console.error('Error creating apartment:', error);
          this.errorMessageService.showErrorMessage('Failed to create apartment. Please try again.');
        }
      );
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.advertisement.creationDate = new Date();

    this.advertisementService.createResource({ body: this.advertisement }).subscribe(() => {
        this.router.navigate(['/advertisement' + this.advertisement]);
      },
      (error) => {
        console.error('Error creating apartment:', error);
        this.errorMessageService.showErrorMessage('Failed to create apartment. Please try again.');
      }
    );
    

}}
