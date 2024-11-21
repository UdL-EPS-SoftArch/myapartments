import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Apartment } from '../IApartment';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apartment-create',
  standalone: true,
  imports: [FormsModule],
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
              private http: HttpClient) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.userRoles = this.user.getRoles();
    this.isAuthorized = this.isAuthorised();
  }

  onSubmit(): void {
    this.apartment.createdBy = this.user.username;
    this.apartment.registrationDate = new Date();

    this.http.post(`${environment.API}/apartments`, this.apartment).subscribe(
      () => {
        this.router.navigate(['/apartments']);
      },
      error => {
        console.error('Error creating apartment', error);
      }
    );
  }

  private isAuthorised(): boolean {
    return this.userRoles.includes('admin') || this.userRoles.includes('owner');
  }
}
