import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementUpdateComponent } from './advertisement-update.component';

describe('AdvertisementUpdateComponent', () => {
  let component: AdvertisementUpdateComponent;
  let fixture: ComponentFixture<AdvertisementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
