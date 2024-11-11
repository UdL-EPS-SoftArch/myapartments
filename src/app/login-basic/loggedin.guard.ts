import {Injectable} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {ErrorMessageService} from '../error-handler/error-message.service';

@Injectable()
export class LoggedInGuard  {

  constructor(private authentication: AuthenticationBasicService,
              private errorMessageService: ErrorMessageService) {
  }

  canActivate(): boolean {
    if (!this.authentication.isLoggedIn()) {
      this.errorMessageService.showErrorMessage('You should be logged in to perform this action');
    }
    return this.authentication.isLoggedIn();
  }
}
