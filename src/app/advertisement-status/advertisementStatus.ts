
import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('advertisementStatuses')
export class AdvertisementStatus extends Resource {
    name: string = '';
    uri: string = '';

    constructor(values: object = {}) {
        super();
        Object.assign(this , values);
    }
}
