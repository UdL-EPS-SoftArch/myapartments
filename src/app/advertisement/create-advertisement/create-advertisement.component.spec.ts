import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvertisementComponent } from './create-advertisement.component';

describe('CreateAdvertisementComponent', () => {
  let component: CreateAdvertisementComponent;
  let fixture: ComponentFixture<CreateAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvertisementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
