import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Advertisement } from './advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService extends HateoasResourceOperation<Advertisement> {
  constructor(private http: HttpClient) {
    super(Advertisement);
  }

  public findByTitle(query: string): Observable<ResourceCollection<Advertisement>> {
    return this.searchCollection('findByTitle', { params: { text: query } });
  }

  public getAllAdvertisements(): Observable<PagedResourceCollection<Advertisement>> {
    return this.getPage();
  }

  public getAdvertisementById(advertisementId: number): Observable<Advertisement> {
    return this.getResource(advertisementId);
  }

  public getAdvertisementByUrl(advertisementUrl: string): Observable<Advertisement> {
    return this.http.get<Advertisement>(advertisementUrl);
  }

  public deleteAdvertisement(advertisementId: number): Observable<Advertisement> {
    const advertisement = new Advertisement();
    advertisement.id = advertisementId;
    const deleteUrl = `http://localhost:8080/advertisements/${advertisementId}`;
    console.log('Deleting advertisement from URL: ', deleteUrl);
    advertisement.uri = deleteUrl;
    advertisement['_links'] = {
      self: { href: advertisement.uri }
    };

    return this.deleteResource(advertisement);
  }





}
