import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import {User} from '../../login-basic/user';

@Component({
  selector: 'app-apartment-delete',
  standalone: true,
  imports: [],
  templateUrl: './apartment-delete.component.html',
  styleUrl: './apartment-delete.component.css'
})
export class ApartmentDeleteComponent implements OnInit {
  public apartmentId: string;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.apartmentId = this.route.snapshot.paramMap.get('id') || '';
    if (this.isAuthorised()) {
      this.removeApartment();

    } else {
      this.onUnauthorised();
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
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to create an apartment');
    this.router.navigate(['/apartments']);
  }
}
