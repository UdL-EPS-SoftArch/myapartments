import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { Apartment } from "./../apartment/apartment";

@HateoasResource('rooms')
export class Room extends Resource {
  id?: string;
  surface: number = 0;
  isOccupied: boolean = false;
  hasWindow: boolean = false;
  hasDesk: boolean = false;
  hasBed: boolean = false;
  apart: Apartment | undefined;
  ownerId?: string;
  uri: string = '';

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }
}
