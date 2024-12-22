import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { Apartment } from '../../apartment/apartment'
import { ApartmentService } from '../../apartment/apartment.service'
import { FormsModule } from '@angular/forms';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {
  public user: User =  new User();
  public room: Room = new Room();
  public apartmentId: string = '';
  public canCreateRoom:  boolean = false
  public apartments: Apartment[] = [];
  public isLoading: boolean = true;


  constructor(
    private router: Router,
    private roomService: RoomService,
    private authenticationService: AuthenticationBasicService,
    private errorMessageService: ErrorMessageService,
    private apartmentService: ApartmentService,
    private location: Location,
  ) {}


  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.canCreateRoom = this.canCreate();
    this.getOwnersApartment();
  }

  onSubmit(): void {
    if(!this.canCreateRoom) {
      this.errorMessageService.showErrorMessage('You are not authorized to create an apartment');
      return;
    }

    this.room.apart = this.apartments.find(apart => apart.id === this.apartmentId) as Apartment;
    this.roomService.createResource({body: this.room}).subscribe(() => {
      this.router.navigate(['/room' + this.room.id])
      },
      (error) => {
        console.error('Error creating room:', error);
      }
    );
    this.location.back();

  }




  private canCreate(): boolean {
    return this.user.getRoles().includes('owner');
  }

  getOwnersApartment(): void{
    this.apartmentService.findByOwner(this.user).subscribe({

      next: (resourceCollection) => {

        this.apartments = resourceCollection.resources || [];
        this.isLoading = false;  // Asegúrate de asignar un arreglo
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
