import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import { Apartment } from "../apartment/apartment";
import { AdvertisementStatus } from "../advertisement-status/advertisementStatus";

@HateoasResource('advertisements')
export class Advertisement extends Resource {
    title: string = ''; 
    description: string = ''; 
    price: number = 0.01; 
    zipCode: string = ''; 
    country: string = ''; 
    address: string = ''; 
    creationDate: Date = new Date(); 
    expirationDate?: Date; 
  
    adStatus: string = ''; 
    apartment: string = ''; 
  
    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }
}