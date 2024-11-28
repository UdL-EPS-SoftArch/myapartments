import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { User } from '../../login-basic/user';
import { ApartmentService } from '../apartment.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';

@Component({
  selector: 'app-apartment-delete',
  standalone: true,
  imports: [],
  templateUrl: './apartment-delete.component.html',
  styleUrl: './apartment-delete.component.css'
})
export class ApartmentDeleteComponent {
  public apartmentId: number | null = null;
  public user: User = new User();

  constructor(
    private router: Router,
    private apartmentService: ApartmentService,
    private errorMessageService: ErrorMessageService
  ) {}

onDelete(): void {
    if (this.apartmentId === null) {
      this.errorMessageService.showErrorMessage("No apartment selected for deletion.");
      return;
    }

    this.apartmentService.deleteResource({id: this.apartmentId}).subscribe(
      () => {
        this.router.navigate(['/apartments']);
      },
      (error) => {
        console.error('Error deleting apartment', error);
        this.errorMessageService.showErrorMessage('Failed to delete apartment. Please try again.');
      }
    );
}


}
