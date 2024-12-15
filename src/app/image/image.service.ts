import { Injectable } from '@angular/core';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Observable } from 'rxjs';
import { Image } from './image';
import { Apartment } from '../apartment/apartment';

@Injectable({ providedIn: 'root' })
export class ImageService extends HateoasResourceOperation<Image> {

  constructor() {
    super(Image);
  }

  public findById(id: number): Observable<Image> {
    return this.getResource(id);
  }


  public findByApartment(apartment: Apartment): Observable<ResourceCollection<Image>> {
    return this.searchCollection('findByApartment', { params: { apartment: apartment } });
  }


  public findByFilename(filename: string): Observable<ResourceCollection<Image>> {
    return this.searchCollection('findByFilename', { params: { filename: filename } });
  }

  public findByContent(content: string): Observable<ResourceCollection<Image>> {
    return this.searchCollection('findByContent', { params: { content: content } });
  }

}
