import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentDeleteComponent } from './advertisment-delete.component';

describe('AdvertismentDeleteComponent', () => {
  let component: AdvertismentDeleteComponent;
  let fixture: ComponentFixture<AdvertismentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertismentDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertismentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
