import {Component, Input, OnInit} from '@angular/core';
import { Advertisement } from '../advertisement';
import { AdvertisementService } from '../advertisement.service';
import { CommonModule } from '@angular/common';
import {Apartment} from '../../apartment/apartment';

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
  advertisements: Advertisement[] = [];
  @Input() maxAdvertisements: number = 10;
  @Input() apartment: Apartment;
  loading: boolean = false; // flag of charge

  constructor(private advertisementService: AdvertisementService) {
  }

  ngOnInit() {
    this.loadAdvertisements();
  }

  loadAdvertisements() {
    this.loading = true;
    if (this.apartment) {
      this.advertisementService.findByApartment(this.apartment).subscribe({
        next: (collection) => {
          this.advertisements = this.limitAds(collection.resources);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching advertisements by apartment:', err)
          this.loading = false;
        }
      });
    } else { // all advertisements
      this.advertisementService.getAllAdvertisements().subscribe({
        next: (collection) => {
          this.advertisements = this.limitAds(collection.resources);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching advertisements:', err)
          this.loading = false;
        },
      });
    }
  }
  private limitAds(ads: Advertisement[]): Advertisement[] {
    return this.maxAdvertisements === -1 ? ads : ads.slice(0, this.maxAdvertisements);
  }
}
