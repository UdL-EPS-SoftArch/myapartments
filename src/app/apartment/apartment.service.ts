import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Apartment } from "./apartment";
import { User } from "../login-basic/user";

@Injectable({ providedIn: "root" })
export class ApartmentService extends HateoasResourceOperation<Apartment> {

  constructor() {
    super(Apartment);
  }

  public findByOwner(owner: User): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection("findByOwner", {params: {owner: owner}});
  }

  public findByCity(city: string): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection("findByCity", {params: {city: city}});
  }

  public findByPostalCode(postalCode: string): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection("findByPostalCode", {params: {postalCode: postalCode}});
  }

  public findByCountry(country: string): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection("findByCountry", {params: {country: country}});
  }

  public findByName(name: string): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection("findByName", {params: {name: name}});
  }

  public findByAddress(address: string): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection("findByAddress", {params: {address: address}});
  }

  public isApartmentOwnedByUser(owner: User, userApartment: Apartment): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let isOwned = false;

      this.findByOwner(owner).subscribe({
        next: (apartments: ResourceCollection<Apartment>) => {
          if (apartments && Array.isArray(apartments.resources)) {

            for (let i = 0; i < apartments.resources.length; i++) {

              if (apartments.resources[i].getIdFromLinks() === userApartment.id) {
                isOwned = true;
                break;
              }
            }

          }
          observer.next(isOwned);
          observer.complete();
        },
        error: (err) => {
          console.error('Error checking ownership:', err);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
  getApartmentsByOwner(ownerId: string): Observable<ResourceCollection<Apartment>> {
    return this.searchCollection('findByOwner_Id', { params: { ownerId } });
  }
}
