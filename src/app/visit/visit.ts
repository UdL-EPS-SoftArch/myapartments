import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {User} from '../login-basic/user';

@HateoasResource('visits')
export class Visit extends Resource {
  id: string = '';
  visitDate: Date = new Date();
  user: User = new User();
  status: string = '';


  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }


  getIdFromLinks(): string {
    if (this._links?.self?.href) {
      return this._links.self.href.split('/').pop() || '';
    }
    return this.id;
  }
}
