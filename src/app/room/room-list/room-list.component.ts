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
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  public apartments: Apartment[] = [];
  public currentUser: User = new User();
  public rooms: Room[] = [];
  public isShowed: boolean = false;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private apartmentService: ApartmentService,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.isShowed = this.isOwner();

    if (!this.isShowed) {
      this.onNotShowed();
    }
    if (this.currentUser) {
      this.getAparments();
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

  getAparments(): void {
    this.apartmentService.findByOwner(this.currentUser).subscribe({
      next: (resourceCollection) => {
        this.apartments = resourceCollection.resources || [];
        if (this.apartments.length > 0) {
          this.loadRoomsForApartments();
        }
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
        this.errorMessageService.showErrorMessage('Failed to load apartments');
      }
    });
  }

  loadRoomsForApartments(): void {
    const roomRequests: Observable<Room[]>[] = this.apartments.map((apartment) => {
      apartment.id = apartment.getIdFromLinks();
      apartment.owner = this.currentUser;
      return this.getRooms(apartment);
    });

    forkJoin(roomRequests).subscribe({
      next: (roomsArray) => {
        this.rooms = roomsArray.flat();
        console.log(this.rooms);
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
        this.errorMessageService.showErrorMessage('Failed to load rooms');
      }
    });
  }

  getRooms(apartment: Apartment): Observable<Room[]> {
    return this.roomService.findByApartment(apartment).pipe(
      map((resourceCollection) => {
        const rooms = resourceCollection.resources || [];
        // Ensure each room has the correct 'apart' property assigned
        rooms.forEach(room => {
          room.apart = apartment; // Assign the apartment to each room
        });
        return rooms;
      })
    );
  }
  createRoom(): void {
    this.router.navigate(['/room/create']);
  }
  getAparmentName(Apart: Apartment): string {
      return Apart.getName();
  }
  deleteRoom(roomId: string): void {
    if (roomId) {
      console.log('Room ID:', roomId);
      this.router.navigate([`/room/${roomId}/delete`]);
    } else {
      console.error('Invalid room ID');
    }
  }
}
