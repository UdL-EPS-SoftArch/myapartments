import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { ErrorMessageService } from '../../error-handler/error-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent implements OnInit {
  public room: Room = new Room();
  public roomForm: FormGroup = new FormGroup({});
  public errorFetchMsg: string = '';
  public roomId: string = '';
  public isLoading: boolean = false;
  public isAuthorized: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    // Configuración inicial del formulario
    this.roomForm = this.formBuilder.group({
      surface: new FormControl('', { validators: [Validators.required, Validators.min(0)] }),
      isOccupied: new FormControl(false),
      hasWindow: new FormControl(false),
      hasDesk: new FormControl(false),
      hasBed: new FormControl(false),
      apartName: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
    });

    // Cargar la habitación desde el servicio
    this.roomService
      .findById(this.roomId)
      .subscribe(
        (_room) => {
          this.room = _room;
          this.setUpForm();
          this.isAuthorized = this.isAuthorised();
          if (!this.isAuthorized) {
            this.onUnauthorised();
          }
          this.isLoading = false;
        },
        (error) => {
          this.errorFetchMsg = error.message;
          this.isLoading = false;
        }
      );
  }

  setUpForm(): void {
    this.roomForm.setValue({
      surface: this.room.surface || 0,
      isOccupied: this.room.isOccupied || false,
      hasWindow: this.room.hasWindow || false,
      hasDesk: this.room.hasDesk || false,
      hasBed: this.room.hasBed || false,
      apartName: this.room.apart?.name || '', // Asigna el nombre del apartamento
    });
  }

  private isAuthorised(): boolean {
    const userRoles = this.authenticationService.getCurrentUser()?.getRoles() || [];
    return userRoles.includes('admin') || userRoles.includes('owner');
  }

  onSubmit(): void {
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }
    if (this.roomForm.invalid) {
      this.errorMessageService.showErrorMessage('Invalid form');
      return;
    }

    // Obtener los valores del formulario, excluyendo los campos deshabilitados
    const updatedRoomData = this.roomForm.getRawValue();
    delete updatedRoomData.apartName; // Excluir el nombre del apartamento

    // Asignar los valores actualizados al objeto `room`
    Object.assign(this.room, updatedRoomData);

    this.roomService.updateResource(this.room).subscribe(
      () => this.router.navigate(['/rooms']),
      () => {
        this.errorMessageService.showErrorMessage('Failed to update room');
      }
    );
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to update this room.');
    this.router.navigate(['/rooms']);
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }
}
