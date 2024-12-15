import {Component, OnInit} from '@angular/core';
import {User} from '../../login-basic/user';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../room.service';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Room} from '../room';

@Component({
  selector: 'app-room-delete',
  standalone: true,
  imports: [],
  templateUrl: './room-delete.component.html',
  styleUrl: './room-delete.component.css'
})
export class RoomDeleteComponent implements OnInit {
  public roomId: string = '';
  public user: User | null = null;
  public isAuthorized: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService,
  ) {}

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    try {
      this.user = this.authenticationService.getCurrentUser();

      if (!this.user) {
        throw new Error('No user found')
      }

      this.isAuthorized = this.isAuthorised()

      if (this.isAuthorized) {
        this.removeRoom();

      } else {
        this.onUnauthorised();
      }
    } catch (error) {
      console.error('Error during user authentication:', error);
      this.errorMessageService.showErrorMessage('Authentication error. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  private removeRoom() {
    this.roomService.getResource(this.roomId).subscribe(
      (room: Room) => {
        this.roomService.deleteResource(room).subscribe(
          () => {
            this.router.navigate(['/room']);
          },
          () => {
            this.errorMessageService.showErrorMessage('Failed to delete room. Please try again.')
          }
        );
      },
      () => {
        this.errorMessageService.showErrorMessage('Failed to load room for deletion.');
      }
    );
  }

  private isAuthorised(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user && (this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner'));
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized to delete a room');
    this.router.navigate(['/room']);
  }
}
