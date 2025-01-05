import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Room } from '../room';
import { Apartment } from '../../apartment/apartment'
import { ApartmentService } from '../../apartment/apartment.service'
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {
  public user: User = new User();
  public room: Room = new Room();
  public roomForm: FormGroup = new FormGroup({});
  public apartmentId: string = '';
  public canCreateRoom: boolean = false;
  public apartments: Apartment[] = [];
  public isLoading: boolean = true;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private authenticationService: AuthenticationBasicService,
    private errorMessageService: ErrorMessageService,
    private apartmentService: ApartmentService,
    private location: Location,
    private formBuilder: FormBuilder,
  ) {
    // Inicializar el FormGroup
    this.roomForm = this.formBuilder.group({
      apartmentId: new FormControl('', Validators.required),
      surface: new FormControl('', [Validators.required, Validators.min(0)]),
      occupied: new FormControl(false),
      hasWindow: new FormControl(false),
      hasDesk: new FormControl(false),
      hasBed: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.canCreateRoom = this.canCreate();
    this.getOwnersApartment();
  }

  onSubmit(): void {
    if (!this.canCreateRoom) {
      this.errorMessageService.showErrorMessage('You are not authorized to create an apartment');
      return;
    }

    // Actualiza el room con el formulario
    this.room.apart = this.apartments.find(apart => apart.id === this.roomForm.value.apartmentId) as Apartment;
    this.room.surface = this.roomForm.value.surface;
    this.room.occupied = this.roomForm.value.occupied;
    this.room.hasWindow = this.roomForm.value.hasWindow;
    this.room.hasDesk = this.roomForm.value.hasDesk;
    this.room.hasBed = this.roomForm.value.hasBed;

    this.roomService.createResource({ body: this.room }).subscribe(() => {
      this.router.navigate(['/room' + this.room.id]);
    }, (error) => {
      console.error('Error creating room:', error);
    });

    this.location.back();
  }

  private canCreate(): boolean {
    return this.user.getRoles().includes('owner');
  }

  getOwnersApartment(): void {
    this.apartmentService.findByOwner(this.user).subscribe({
      next: (resourceCollection) => {
        this.apartments = resourceCollection.resources || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
        this.isLoading = false;
      },
    });
  }

  trackByApartmentId(index: number, apartment: Apartment): string {
    return apartment.id;  // Ensure this is a unique identifier for the apartment
  }
}
