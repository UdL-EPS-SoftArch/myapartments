import { Injectable } from '@angular/core';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AdvertisementStatus } from './advertisementStatus';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementStatusService extends HateoasResourceOperation<AdvertisementStatus> {
  constructor() {
    super(AdvertisementStatus);
  }

  public findByStatus(status: string): Observable<ResourceCollection<AdvertisementStatus>> {
    return this.searchCollection('findByStatus', { params: { status: status } });
  }
}
