import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementListComponent } from './advertisement-list.component';

describe('AdvertismentListComponent', () => {
  let component: AdvertisementListComponent;
  let fixture: ComponentFixture<AdvertisementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
