import { Component, OnInit } from '@angular/core';
import { Apartment } from '../apartment';
import {ApartmentService} from '../apartment.service';
import {User} from '../../login-basic/user';
import {Room} from '../../room/room';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-apartment-detail',
  standalone: true,
  imports: [
    NgbCarouselModule
  ],
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css'
})
export class ApartmentDetailComponent implements OnInit {
  apartment: Apartment = new Apartment();
  owner: User = new User();
  room: Room = new Room();
  images: string[] = [
    'https://images.habimg.com/imgh/21706-3651997/apartamento-en-alquiler-lleida-alquiler-lleida_720437e9-1267-41bf-890a-67acbf490cc5G.jpg',
    'https://images.habimg.com/imgh/21706-3651997/apartamento-en-alquiler-lleida-alquiler-lleida_720437e9-1267-41bf-890a-67acbf490cc5G.jpg',
    'https://images.habimg.com/imgh/21706-3651997/apartamento-en-alquiler-lleida-alquiler-lleida_720437e9-1267-41bf-890a-67acbf490cc5G.jpg'
  ];
  date: string = '';

  constructor(private apartmentService: ApartmentService) {
  }


  ngOnInit(): void {
    // Mock Apartment
    this.apartment.id = "1";
    this.apartment.name = "Pisito Nuevo";
    this.apartment.address = "Carrer President, 4, 3r A";
    this.apartment.floor = 2;
    this.apartment.postalCode = "25005";
    this.apartment.city = "Lleida";
    this.apartment.country = "Catalunya";
    this.apartment.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    this.apartment.registrationDate = new Date();

    // Mock Owner (TODO: add more fields)
    this.owner.username = "owner01";
    this.owner.email = "owner01@gmail.com";

    // Mock Room (TODO: add more fields)
    this.room.isOccupied = false;

    //Formatted Date
    this.date = this.apartment.registrationDate.toLocaleDateString('es-ES');
  }
}
