import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../advertisement';
import { AdvertisementService } from '../advertisement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
  advertisements: Advertisement[] = [];

  constructor(private advertisementService: AdvertisementService) {}

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
}
