import { Injectable } from "@angular/core";
import { HateoasResourceOperation } from "@lagoshny/ngx-hateoas-client";
import { Visit } from "./visit";

@Injectable({ providedIn: "root" })
export class VisitService extends HateoasResourceOperation<Visit> {

  constructor() {
    super(Visit);
  }
}
