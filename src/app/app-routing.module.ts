import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { CreateAdvertisementComponent } from './advertisement/create-advertisement/create-advertisement.component';
import { AdvertisementListComponent } from './advertisement/advertisment-list/advertisement-list.component';
import { DeleteAdvertisementComponent } from './advertisement/advertisement-delete/advertisement-delete.component';
import { ApartmentListComponent } from './apartment/apartment-list/apartment-list.component';
import { ApartmentCreateComponent } from './apartment/apartment-create/apartment-create.component';
import { ApartmentUpdateComponent } from './apartment/apartment-update/apartment-update.component';
import { ApartmentDeleteComponent } from './apartment/apartment-delete/apartment-delete.component';
import { VisitStatusComponent } from './visit/visit-status/visit-status.component';
import { VisitCancelComponent } from './visit/visit-cancel/visit-cancel.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';



const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'advertisement/:id/create', component: CreateAdvertisementComponent},
  { path: 'advertisements', component: AdvertisementListComponent},
  { path: 'advertisement/:id/delete', component: DeleteAdvertisementComponent, canActivate: [LoggedInGuard] },
  { path: 'apartments', component: ApartmentListComponent},
  { path: 'apartment/create', component: ApartmentCreateComponent},
  { path: 'apartment/:id/update', component: ApartmentUpdateComponent},
  { path: 'apartment/:id/delete', component: ApartmentDeleteComponent},
  { path: 'visit/:id/status', component: VisitStatusComponent},
  { path: 'visit/:id/cancel', component:VisitCancelComponent},
  { path: 'rooms', component: RoomListComponent},
  { path: 'room/create', component: RoomCreateComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
