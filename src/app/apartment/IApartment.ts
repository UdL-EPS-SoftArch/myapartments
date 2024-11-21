export interface Apartment {
  name: string;
  floor: number;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  description: string;
  owner: string;
  rooms: string;
  detail: string;
  note: string;
  createdBy?: string;
  registrationDate?: Date;
}
