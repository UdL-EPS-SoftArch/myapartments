import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('apartments')
export class Apartment extends Resource {
  id: string = '';
  name: string = '';
  floor: number = 0;
  address: string = '';
  postalCode: string = '';
  city: string = '';
  country: string = '';
  description?: string = '';
  owner: User = new User();
  detail: string = '';
  note?: string = '';
  registrationDate?: Date = new Date();
  uri: string = '';

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }
}
