import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from '../advertisement.service';
import { Advertisement } from '../advertisement';

@Component({
  selector: 'app-advertisement-delete',
  templateUrl: './advertisement-delete.component.html',
  styleUrls: [],
})
export class DeleteAdvertisementComponent implements OnInit {
  advertisementId!: number;
  private advertisement: Advertisement = new Advertisement();

  constructor(
    private route: ActivatedRoute,
    private advertisementService: AdvertisementService
  ) {}

  ngOnInit(): void {
    this.advertisementId = +this.route.snapshot.paramMap.get('id')!;
    this.advertisementService.getResource(this.advertisementId).subscribe(
      (advertisement) => { this.advertisement = advertisement });
    console.log('Advertisement ID:', this.advertisementId);
  }

  deleteAdvertisement(): void {
    if (confirm('Are you sure you want to delete this advertisement?')) {
      console.log('Attempting to delete advertisement with ID:', this.advertisementId);
      this.advertisementService.deleteResource(this.advertisement).subscribe({
        next: () => {
          console.log('Advertisement deleted successfully.');
          alert('Advertisement deleted successfully.');
        },
        error: (err) => {
          console.error('Failed to delete advertisement:', err);
          alert('Failed to delete the advertisement. Please try again.');
        },
      });
    } else {
      console.log('Deletion cancelled.');
    }
  }
  showDialog: boolean = false; // Controla si el diálogo está visible

  openDialog() {
    this.showDialog = true; // Muestra el diálogo
  }

}
