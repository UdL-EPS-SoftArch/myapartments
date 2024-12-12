import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('apartments')
export class ApartmentDetails extends Resource {
  id: number = 0;
  square: number = 0;
  numBathrooms: number = 0;
  numBedrooms: number = 0;
  hasAc: boolean = false;
  hasElevator: boolean = false;

  constructor(values: object = {}) {
    super();
    Object.assign(this, values);
  }

  getIdFromLinks(): string {
    if (this._links?.self?.href) {
      return this._links.self.href.split('/').pop() || '';
    }
    return this.id.toString();
  }

}
