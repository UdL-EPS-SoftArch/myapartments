import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../login-basic/user';
import { Apartment } from '../../apartment/apartment';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';

@Component({
  selector: 'app-create-advertisement',
  standalone: true,imports: [FormsModule, CommonModule],
  templateUrl: './create-advertisement.component.html',
  styleUrl: './create-advertisement.component.css'
})
export class CreateAdvertisementComponent implements OnInit{
  public apartment: Apartment = new Apartment();
  public user: User = new User();
  public isAuthorized: boolean = false;

  constructor(
    private authenticationService: AuthenticationBasicService,
    private errorMessageService: ErrorMessageService,
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();
  }

  private isAuthorised(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }

}
