import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { Apartment } from '../apartment';
import { catchError, of } from 'rxjs';
import {CommonModule} from '@angular/common';
import {User} from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {ErrorMessageService} from '../../error-handler/error-message.service';

@Component({
  selector: 'app-apartment-update',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
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
        this.isLoading = false;
        if (_apartment) {
          _apartment.id = _apartment.getIdFromLinks()
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
      });

    this.apartmentForm = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)]}),
      floor: new FormControl('', { validators: [Validators.required, Validators.min(0)]}),
      address: new FormControl('',{ validators:  [Validators.required]}),
      postalCode: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]{5}$')]}),
      city: new FormControl('',{ validators:  [Validators.required]}),
      country: new FormControl('', { validators:  [Validators.required]}),
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
    }
    if (this.apartmentForm.invalid) {
      this.errorMessageService.showErrorMessage('Invalid form');

      for (const controlName in this.apartmentForm.controls) {
        const control = this.apartmentForm.controls[controlName];
        if (control.invalid) {
          this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} is not valid.`);

          for(const errorType in control.errors){
            if(errorType == "required"){
              this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} is required.`);
            }
            else if(errorType == "minlength"){
              this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} requires a minimum length of 3.`);
            }
            else if(errorType == "min"){
              this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} requires a value equals or grater than 0.`);
            }
            else if(errorType == "pattern"){
              this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} requires a 5 digit number.`);
            }
          }
          console.log(`Field ${controlName} is not valid.`);
          console.log(control.errors);
        }
      }
/*
      this.errorMessageService.showErrorMessage('Invalid form');
*/

      return;
    }


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
