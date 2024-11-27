import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';
import { Room } from '../room/room';

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
  room: Room = new Room();
  detail: string = '';
  note?: string = '';
  registrationDate?: Date = new Date();

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }
}