import { Authority } from './authority';
import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('users')
export class User extends Resource {
  username = '';
  email = '';
  authorities: Authority[] = [];
  authorization = '';
  password: string | undefined = '';
  passwordReset = false;
  uri = '';

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }

  getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }
}
