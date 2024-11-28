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




}
