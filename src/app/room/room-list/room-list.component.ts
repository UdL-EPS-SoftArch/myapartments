import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Apartment } from '../../apartment/apartment';
import { CommonModule } from '@angular/common';
import { ApartmentService } from '../../apartment/apartment.service';
import { User } from '../../login-basic/user';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  public apartments: Apartment[] = [];
  public currentUser:  User = new User();
  public rooms: Room[] = [];
  public isShowed: boolean = false;




  constructor(
    private router: Router,
    private roomService: RoomService,
    private apartmentService: ApartmentService,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,

  ) {
  }
  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.isShowed = this.isOwner();

    if (!this.isShowed) {
      this.onNotShowed();
    }
    if (this.currentUser) {
      this.getAparments();
      for( const apartment of this.apartments ){
        apartment.id = apartment.getIdFromLinks();
        this.rooms.concat(this.getRooms(apartment));
      }

    } else {
      console.log('User not authenticated');
    }
  }
  private isOwner(): boolean {
    return this.currentUser.getRoles().includes('owner');
  }

  private onNotShowed(): void {
    this.errorMessageService.showErrorMessage('You are not an owner');
    this.router.navigate(['/apartments']);
  }

  getAparments(): void{
    this.apartmentService.findByOwner(this.currentUser).subscribe({

      next: (resourceCollection) => {

        this.apartments = resourceCollection.resources || []; // Asegúrate de asignar un arreglo
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
      },
    });
  }
  getRooms(apartment: Apartment): Room[]{
    let roomList: Room[] = [];
    this.roomService.findByApartment(apartment).subscribe({
      next: (resourceCollection) => {

        roomList = resourceCollection.resources || []; // Asegúrate de asignar un arreglo
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
      },
    });
    return roomList;
  }
}
