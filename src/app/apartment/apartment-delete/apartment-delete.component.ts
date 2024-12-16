import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import {User} from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-apartment-delete',
  standalone: true,
  imports: [],
  templateUrl: './apartment-delete.component.html',
  styleUrl: './apartment-delete.component.css'
})
export class ApartmentDeleteComponent implements OnInit {
  //public apartmentId: string;
  public apartmentId: string = '';
  public user: User | null = null;
  public isAuthorized: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,
) {}

  ngOnInit(): void {
    this.apartmentId = this.route.snapshot.paramMap.get('id') || '';
    // Intentem obtenir l'usuari actual
    try {
      this.user = this.authenticationService.getCurrentUser();

      if (!this.user) {
        throw new Error('No user found');
      }

      // Verifiquem si està autoritzat
      this.isAuthorized = this.isAuthorised();

      if (this.isAuthorized) {
        this.removeApartment();
      } else {
        this.onUnauthorised();
      }
    } catch (error) {
      console.error('Error during user authentication:', error);
      this.errorMessageService.showErrorMessage('Authentication error. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  private removeApartment(): void {
    this.apartmentService.getResource(this.apartmentId).subscribe(
      (apartment) => {
        this.apartmentService.deleteResource(apartment).subscribe(
          () => {
            this.router.navigate(['/apartments']);
          },
          () => {
            this.errorMessageService.showErrorMessage('Failed to delete apartment. Please try again.');
          }
        );
      },
      () => {
        this.errorMessageService.showErrorMessage('Failed to load apartment for deletion.');
      }
    );
  }

  private isAuthorised(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user && (this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner'));
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to delete an apartment');
    this.router.navigate(['/apartments']);
  }
}
