import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { Apartment } from '../apartment/apartment';

@HateoasResource('images')
export class Image extends Resource {
  id?: number;
  filename?: string;
  content?: string;
  apartment?: Apartment;
}
