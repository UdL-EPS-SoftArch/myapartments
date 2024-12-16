import {Component, OnInit} from '@angular/core';
import {Visit} from '../visit';
import {User} from '../../login-basic/user';
import {ActivatedRoute, Router} from '@angular/router';
import {VisitService} from '../visit.service';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {catchError, of} from 'rxjs';
import {VisitStatusComponent} from '../visit-status/visit-status.component';

@Component({
  selector: 'app-visit-accept',
  standalone: true,
  imports: [
    VisitStatusComponent
  ],
  templateUrl: './visit-accept.component.html',
  styleUrl: './visit-accept.component.css'
})
export class VisitAcceptComponent  implements OnInit{
  public visit: Visit = new Visit()
  public user: User = new User();
  public visitId: string = '';
  public errorFetchMsg: string = '';
  public isAuthorized: boolean = false;


  constructor(
    private router: Router,
    private visitService: VisitService = new VisitService(),
    private activatedRoute: ActivatedRoute,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService
  ) {}


  ngOnInit(): void {

    this.visit = new Visit()

    this.visitId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.user = this.authenticationService.getCurrentUser();
    this.isAuthorized = this.isAuthorised();

    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }

    this.visitService
      .getResource(this.visitId)
      .pipe(
        catchError((error) => {
          this.errorFetchMsg = error.message;
          return of(null);
        })
      )
      .subscribe((_visit) => {
        if (_visit) {
          this.visit = _visit;
          this.visit.id = this.visit.getIdFromLinks();

        }
      });
  }

  private isAuthorised(): boolean {
    return this.user.getRoles().includes('admin') || this.user.getRoles().includes('owner');
  }

  onUnauthorised(): void {
    this.errorMessageService.showErrorMessage('You are not authorized');
    this.router.navigate(['/about']);
  }

  onReject() {
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }
    this.visit.status = "REJECTED"
    this.visitService.updateResource(this.visit)
      .subscribe(() => {
        window.location.reload();
      })
  }

  onAccept(){
    if (!this.isAuthorized) {
      this.onUnauthorised();
      return;
    }
    this.visit.status = "ACCEPTED"
    this.visitService.updateResource(this.visit)
      .subscribe(() => {
        window.location.reload();
      })
  }
}
