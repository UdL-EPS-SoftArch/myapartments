import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Apartment } from '../IApartment';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apartment-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.css']
})
export class ApartmentCreateComponent implements OnInit {
    public apartment: Apartment = {
      name: '',
      floor: 0,
      address: '',
      postalCode: '',
      city: '',
      country: '',
      description: '',
      owner: '',
      rooms: '',
      detail: '',
      note: ''
    };

    private userRoles: string[] = [];
    private user: User = new User();
    public isAuthorized: boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private userService: UserService,
              private http: HttpClient,
              private errorMessageService: ErrorMessageService) { }

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

    this.apartment.owner = this.user.username;
    this.apartment.registrationDate = new Date();

    this.http.post(`${environment.API}/apartments`, this.apartment).subscribe(
      () => {
        this.router.navigate(['/apartments']);
      },
      () => {
        this.errorMessageService.showErrorMessage('Error creating apartment');
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
