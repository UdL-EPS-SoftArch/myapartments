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
import { ApartmentDetailComponent } from './apartment/apartment-detail/apartment-detail.component';
import { ApartmentUpdateComponent } from './apartment/apartment-update/apartment-update.component';
import { ApartmentDeleteComponent } from './apartment/apartment-delete/apartment-delete.component';
import { VisitStatusComponent } from './visit/visit-status/visit-status.component';
import { VisitCancelComponent } from './visit/visit-cancel/visit-cancel.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';
import { RoomDeleteComponent } from './room/room-delete/room-delete.component';
import { VisitAcceptComponent } from './visit/visit-accept/visit-accept.component';
import { RoomUpdateComponent } from './room/room-update/room-update.component';
import { MyAdvertisementComponent } from './advertisement/my-advertisement-list/my-advertisement.component';
import { ImageCreateComponent } from './image/image-create/image.component';
import { DocumentationComponent } from './documentation/documentation.component';


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
  { path: 'advertisements/myAdvertisement', component: MyAdvertisementComponent},
  { path: 'apartments', component: ApartmentListComponent},
  { path: 'apartment/create', component: ApartmentCreateComponent},
  { path: 'apartment/:id', component: ApartmentDetailComponent},
  { path: 'apartment/:id/update', component: ApartmentUpdateComponent},
  { path: 'apartment/:id/delete', component: ApartmentDeleteComponent},
  { path: 'apartment/:id/images', component: ImageCreateComponent},
  { path: 'visit/:id/status', component: VisitStatusComponent},
  { path: 'visit/:id/cancel', component:VisitCancelComponent},
  { path: 'visit/:id/accept', component:VisitAcceptComponent},
  { path: 'rooms', component: RoomListComponent},
  { path: 'room/create', component: RoomCreateComponent},
  { path: 'room/update/:id', component: RoomUpdateComponent},
  { path: 'room/delete/:id', component: RoomDeleteComponent},
  { path: 'documentation', component: DocumentationComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
