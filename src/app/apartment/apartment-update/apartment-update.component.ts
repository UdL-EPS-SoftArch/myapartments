import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { Apartment } from '../apartment';
import { catchError, of } from 'rxjs';
import {CommonModule} from '@angular/common';
import {User} from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {ResourceCollection} from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'app-apartment-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './apartment-update.component.html',
  styleUrls: ['./apartment-update.component.css']
})
export class ApartmentUpdateComponent implements OnInit {
  public apartment: Apartment = new Apartment();
  public apartmentForm: FormGroup = new FormGroup({});
  public errorFetchMsg: string = '';
  public apartmentId: string = '';
  public isLoading: boolean = false;
  public user: User = new User();
  public isAuthorized: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private apartmentService: ApartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.apartment = new Apartment();
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();
    this.apartmentId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }



    this.apartmentService
      .getResource(this.apartmentId)
      .pipe(
        catchError((error) => {
          this.errorFetchMsg = error.message;
          return of(null);
        })
      )
      .subscribe((_apartment) => {
        if (_apartment) {
          if(!this.user.getRoles().includes('admin')) {
            this.apartmentService.isApartmentOwnedByUser(this.user, _apartment).subscribe((isOwned) => {
              if (!isOwned) {
                this.onUnauthorised();
                return;
              }
            });
          }

          this.apartment = _apartment;
          this.setUpForm();
        }
        this.isLoading = false;
      });

    this.apartmentForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      floor: new FormControl('', [Validators.required, Validators.min(0)]),
      address: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

  }


  setUpForm(): void {
    this.apartmentForm.setValue({
      name: this.apartment.name || '',
      floor: this.apartment.floor || 0,
      address: this.apartment.address || '',
      postalCode: this.apartment.postalCode || '',
      city: this.apartment.city || '',
      country: this.apartment.country || '',
      description: this.apartment.description || '',
    });
  }

  private isAuthorised(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }


  onSubmit(): void {
    this.apartment.id = this.apartmentId;

    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }/*
    console.log(this.apartment.postalCode)
    if (this.apartmentForm.invalid) {
      for (const controlName in this.apartmentForm.controls) {
        const control = this.apartmentForm.controls[controlName];
        if (control.invalid) {
          console.log(`El campo ${controlName} no es válido.`);
          console.log(control.errors); // Muestra los errores del campo
        }
      }
      this.errorMessageService.showErrorMessage('Invalid form');


      return;
    }*/


    this.apartmentService.updateResource(this.apartment)
      .subscribe(() => {
        this.router.navigate(['/apartments'])
      })

  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized');
    this.router.navigate(['/apartments']);
  }


  onCancel(): void {
    this.router.navigate(['/about']);
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
