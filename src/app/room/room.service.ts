import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Room } from "./room";
import { Apartment } from "./../apartment/apartment";
import { User } from "../login-basic/user";

@Injectable({ providedIn: "root" })
export class RoomService extends HateoasResourceOperation<Room> {

  constructor() {
    super(Room);
  }

  public findById(roomId: string): Observable<Room> {
    return this.getResource(roomId);
  }

  public findByApartment(apartment: Apartment): Observable<ResourceCollection<Room>> {
    return this.searchCollection("findByApart", { params: { apartment: apartment } });
  }

  public findByOwner(owner: User): Observable<ResourceCollection<Room>> {
    return this.searchCollection("findByOwner", { params: { owner: owner } });
  }
}
