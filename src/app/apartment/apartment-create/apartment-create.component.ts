import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Apartment } from '../apartment';
import { Room } from '../../room/room';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { CommonModule } from '@angular/common';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-apartment-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.css']
})
export class ApartmentCreateComponent implements OnInit {
    public apartment: Apartment = new Apartment();

    private userRoles: string[] = [];
    private user: User = new User();
    public isAuthorized: boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private userService: UserService,
              private http: HttpClient,
              private errorMessageService: ErrorMessageService,
              private apartmentService: ApartmentService
            ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.userRoles = this.user.getRoles();
    this.isAuthorized = this.isAuthorised();
  }

  onSubmit(): void {
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }

    this.apartment.owner = this.user;
    this.apartment.registrationDate = new Date();


    const room: Room = new Room({
      surface: 0,
      isOccupied: false,
      hasWindow: false,
      hasDesk: false,
      hasBed: false,
      apart: this.apartment,
      ownerId: this.user
    });
    this.apartment.room = room;

    this.apartmentService.createResource({ body: this.apartment }).subscribe(
      (apartment: Apartment) => {
        this.router.navigate(['/apartments']);
      },
      () => {
        this.errorMessageService.showErrorMessage('Failed to create apartment. Please try again.');
      }
    );
  }

  private isAuthorised(): boolean {
    return this.userRoles.includes('admin') || this.userRoles.includes('owner');
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to create an apartment');
    this.router.navigate(['/apartments']);
  }
}
