import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../advertisement';
import { catchError, of } from 'rxjs';
import {CommonModule} from '@angular/common';
import {User} from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {ErrorMessageService} from '../../error-handler/error-message.service';

@Component({
  selector: 'app-advertisement-update',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './advertisement-update.component.html',
  styleUrls: ['./advertisement-update.component.css']
})
export class AdvertisementUpdateComponent implements OnInit {
  public advertisement: Advertisement = new Advertisement();
  public advertisementForm: FormGroup = new FormGroup({});
  public errorFetchMsg: string = '';
  public advertisementId: string = '';
  public isLoading: boolean = false;
  public user: User = new User();
  public isAuthorized: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private advertisementService: AdvertisementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.advertisement = new Advertisement();
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();
    this.advertisementId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }

    this.advertisementService
      .getResource(this.advertisementId)
      .pipe(
        catchError((error) => {
          this.errorFetchMsg = error.message;
          return of(null);
        })
      )
      .subscribe((_advertisement) => {
        this.isLoading = false;
        if (_advertisement) {
          _advertisement.id = _advertisement.getIdFromLinks()
          /*if(!this.user.getRoles().includes('admin')) {
            this.advertisementService.isAdvertisementOwnedByUser(this.user, _advertisement).subscribe((isOwned) => {
              if (!isOwned) {
                this.onUnauthorised();
                return;
              }
            });
          }*/
          this.advertisement = _advertisement;
          this.setUpForm();
        }
      });

    this.advertisementForm = this.formBuilder.group({
      title: new FormControl('',{ validators:  [Validators.required]}),
      description: new FormControl('',{ validators:  [Validators.required]}),
      price: new FormControl('',{ validators:  [Validators.required]}),
      zipCode: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]{5}$')]}),
      country: new FormControl('', { validators:  [Validators.required]}),
      address: new FormControl('', { validators:  [Validators.required]}),
      apartment: new FormControl(''),
    });

  }

  setUpForm(): void {
    this.advertisementForm.setValue({
      title: this.advertisement.title,
      description: this.advertisement.description,
      price: this.advertisement.price,
      zipCode: this.advertisement.zipCode,
      country: this.advertisement.country,
      address: this.advertisement.address,
      apartment: this.advertisement.apartment,
    });
  }

  private isAuthorised(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }


  onSubmit(): void {
    this.advertisement.id = this.advertisementId;

    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }

    if (this.advertisementForm.invalid) {
      this.errorMessageService.showErrorMessage('Invalid form');
      for (const controlName in this.advertisementForm.controls) {
        const control = this.advertisementForm.controls[controlName];
        if (control.invalid) {
          this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} is not valid.`);

          for(const errorType in control.errors){
            if(errorType == "required"){
              this.errorMessageService.showErrorMessage(`Invalid form: field ${controlName} is required.`);
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

    this.advertisementService.updateResource(this.advertisement)
      .subscribe(() => {
        this.router.navigate(['/advertisements'])
      })

  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized');
    this.router.navigate(['/advertisements']);
  }


  onCancel(): void {
    this.router.navigate(['/advertisements']);
  }



}
