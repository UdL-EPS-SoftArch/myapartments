import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import { Apartment } from "../apartment/apartment";
import { AdvertisementStatus } from "../advertisement-status/advertisementStatus";
import {User} from '../login-basic/user';

@HateoasResource('advertisements')
export class Advertisement extends Resource {
    id: string = '';
    title: string = '';
    description: string = '';
    price: number = 0.01;
    zipCode: string = '';
    country: string = '';
    address: string = '';
    creationDate: Date = new Date();
    expirationDate?: Date;
    uri?: string;

    adStatus: AdvertisementStatus | number = 0;
    apartment: Apartment | number = 0;

    constructor(values: object = {}) {
        super();
        Object.assign(this , values);
    }
    getIdFromLinks(): string {
        if (this._links?.self?.href) {
          return this._links.self.href.split('/').pop() || '';
        }
        return this.id;
    }
}
