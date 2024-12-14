import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import { Apartment } from "../apartment/apartment";
import { AdvertisementStatus } from "../advertisement-status/advertisementStatus";

@HateoasResource('advertisements')
export class Advertisement extends Resource {
    id: number = 0;
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
}
