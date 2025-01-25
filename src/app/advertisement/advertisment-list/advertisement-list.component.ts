import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../advertisement';
import { AdvertisementService } from '../advertisement.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
  advertisements: Advertisement[] = [];

  constructor(private advertisementService: AdvertisementService, private router: Router) {}

  ngOnInit() {
    this.loadAdvertisements();
  }

  loadAdvertisements() {
    this.advertisementService.getAllAdvertisements().subscribe({
      next: (response) => {
        this.advertisements = response.resources;
      },
      error: (err) => {
        console.error('Error al cargar los anuncios:', err);
      }
    });
  }

  onDelete(adId: string | undefined): void {
    if (!adId) {
      return;
    }
    const route = 'advertisement/' + adId + '/delete';
    this.router.navigate([route]);
  }
}
