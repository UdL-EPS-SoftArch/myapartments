import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Apartment } from '../../apartment/apartment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  @Input() apartment!: Apartment;
  // Max number of rooms to show, set to -1 to show all
  @Input() maxRooms: number = 10;
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    if (this.apartment) {
      this.roomService.findByApartment(this.apartment).subscribe({
        next: (collection) => {
          if (this.maxRooms === -1) {
            this.rooms = collection.resources;
          } else {
            this.rooms = collection.resources.slice(0, this.maxRooms);
          }
        },
        error: (err) => console.error('Error fetching rooms:', err),
      });
    }
  }
}
