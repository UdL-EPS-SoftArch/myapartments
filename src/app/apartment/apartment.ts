import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';
import { ApartmentDetails } from './apartment-details';

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
  apartmentDetails: ApartmentDetails = new ApartmentDetails();

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
