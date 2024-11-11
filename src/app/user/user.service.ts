import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@Injectable({providedIn: 'root'})
export class UserService extends HateoasResourceOperation<User> {

  constructor() {
    super(User);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<User>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }
}
