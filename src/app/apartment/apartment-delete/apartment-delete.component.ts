import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../../login-basic/user';
import { ApartmentService } from '../apartment.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import {Apartment} from '../apartment';

@Component({
  selector: 'app-apartment-delete',
  standalone: true,
  imports: [],
  templateUrl: './apartment-delete.component.html',
  styleUrl: './apartment-delete.component.css'
})
export class ApartmentDeleteComponent implements OnInit {
  public apartmentId: number | null = null;
  public apartment: Apartment | null = null;
  public user: User = new User();

  constructor(
    private router: Router,
    private apartmentService: ApartmentService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    if (this.apartmentId !== null) {
      this.loadApartment();
    }
  }

  loadApartment(): void { // Busquem l'apartament per a poder eliminar-lo
    if (this.apartmentId === null) {
      this.errorMessageService.showErrorMessage('No apartment selected for deletion.');
      return;
    }

    this.apartmentService.getResource(this.apartmentId).subscribe(
      (apartment) => {
        this.apartment = apartment
      },
      (error) => {
        console.error('Error finding apartment:', error);
        this.errorMessageService.showErrorMessage('Could not find apartment for deletion.');
      }
    );
  }

  onDelete(): void {  // Eliminem l'apartament anteriorment buscat
    if (!this.apartmentId) {
      this.errorMessageService.showErrorMessage("No apartment selected for deletion.");
      return;
    }

    //const apartmentToDelete: Apartment = { id: this.apartmentId } as Apartment;

    this.apartmentService.deleteResource(this.apartment!).subscribe(
      () => {
        this.router.navigate(['/apartments']);
      },
      (error) => {
        console.error('Error deleting apartment', error);
        this.errorMessageService.showErrorMessage('Failed to delete apartment. Please try again.');
      }
    );
  }

  onCancel(): void {  // Cancel·lem l'eliminació
    this.router.navigate(['/apartments']);
  }
}
