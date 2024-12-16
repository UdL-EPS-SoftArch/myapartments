import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { User } from '../../login-basic/user';
import { FormsModule } from '@angular/forms';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { CommonModule } from '@angular/common';
import { ImageService } from '../image.service';
import {window} from 'rxjs';

@Component({
  selector: 'app-image-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageCreateComponent implements OnInit {
  public selectedImages: File[] = [];
  public apartmentId: number | undefined;
  public user: User = new User();
  public isAuthorized: boolean = false;
  private allowedFileTypes: string[] = ['image/png', 'image/jpeg'];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationBasicService,
    private errorMessageService: ErrorMessageService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorizedUser();
  }


  private isAuthorizedUser(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files: FileList = input.files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (this.allowedFileTypes.includes(file.type)) {
          this.selectedImages.push(file);
        } else {
          alert('Solo se permiten imágenes en formato PNG o JPG.');
        }
      }
    }
  }


  onSubmit(): void {
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }

    if (this.selectedImages.length === 0) {
      this.errorMessageService.showErrorMessage('Por favor, selecciona imágenes para subir.');
      return;
    }
  }


  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('No estás autorizado para subir imágenes.');
    this.router.navigate(['/apartments']);
  }


  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }

  getObjectURL(image: File): string {
    return image ? URL.createObjectURL(image) : '';
  }

  protected readonly window = window;
}
