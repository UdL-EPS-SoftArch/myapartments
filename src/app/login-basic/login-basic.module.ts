import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './login-basic.routing';
import {LoginNavbarComponent} from './login-navbar.component';
import {LoginFormComponent} from './login-form.component';
import {AuthenticationBasicService} from './authentication-basic.service';
import {ErrorHandlerModule} from '../error-handler/error-handler.module';
import {ErrorMessageService} from '../error-handler/error-message.service';

@NgModule({ declarations: [LoginNavbarComponent, LoginFormComponent],
    exports: [LoginNavbarComponent], imports: [BrowserModule,
        FormsModule,
        RouterModule.forChild(routes),
        ErrorHandlerModule], providers: [AuthenticationBasicService, ErrorMessageService, provideHttpClient(withInterceptorsFromDi())] })
export class LoginBasicModule {
}
