import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { Apartment } from "./../apartment/Apartment";

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

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }
}
