import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Apartment } from '../apartment';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { CommonModule } from '@angular/common';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-apartment-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.css']
})
export class ApartmentCreateComponent implements OnInit {
  public apartment: Apartment = new Apartment();
  public user: User = new User();
  public isAuthorized: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationBasicService,
    private errorMessageService: ErrorMessageService,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();
  }

  onSubmit(): void {
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }

    this.apartment.owner = this.user;
    this.apartment.registrationDate = new Date();

    this.apartmentService.createResource({ body: this.apartment }).subscribe(() => {
        this.router.navigate(['/apartment' + this.apartment.id]);
      },
      (error) => {
        console.error('Error creating apartment:', error);
        this.errorMessageService.showErrorMessage('Failed to create apartment. Please try again.');
      }
    );
  }

  private isAuthorised(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to create an apartment');
    this.router.navigate(['/apartments']);
  }

  selectedImages: { file: File; url: string }[] = [];

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => {
        this.selectedImages.push({
          file,
          url: URL.createObjectURL(file)
        });
      });
    }
  }

  removeImage(index: number): void {
    URL.revokeObjectURL(this.selectedImages[index].url);
    this.selectedImages.splice(index, 1);
  }


}
