import { Component, OnInit } from '@angular/core';
import {Apartment} from '../apartment';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../login-basic/user';

@Component({
  selector: 'app-apartment-delete',
  standalone: true,
  imports: [],
  templateUrl: './apartment-delete.component.html',
  styleUrl: './apartment-delete.component.css'
})
export class ApartmentDeleteComponent implements OnInit {
  public apartment: Apartment = new Apartment();
  public user: User = new User();
  public isAuthorized: boolean = false;

  constructor(private activatedApartment: ActivatedRoute,
               ) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();
  }
}
