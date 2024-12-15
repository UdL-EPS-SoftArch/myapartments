import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Visit} from '../visit';
import {User} from '../../login-basic/user';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessageService} from '../../error-handler/error-message.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import { VisitService } from '../visit.service';
import {catchError, of} from 'rxjs';
@Component({
  selector: 'app-visit-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-status.component.html',
  styleUrl: './visit-status.component.css'
})
export class VisitStatusComponent  implements OnInit {
  public visit: Visit = new Visit()
  public user: User = new User();
  public visitId: string = '';
  public errorFetchMsg: string = '';



  constructor(
    private router: Router,
    private visitService: VisitService = new VisitService(),
    private activatedRoute: ActivatedRoute,
    private errorMessageService: ErrorMessageService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    this.visit = new Visit();
    this.visitId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.user = this.authenticationService.getCurrentUser();



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
          console.log(this.visit);

        }
      });

  }
}
