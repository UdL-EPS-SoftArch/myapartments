
import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('advertisement-status')
export class AdvertisementStatus extends Resource {
    id: number = 0;
    name: string = '';
    constructor(values: object = {}) {
        super();
        Object.assign(this as any, values);
    }
}