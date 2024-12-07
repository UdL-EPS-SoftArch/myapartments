import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentUpdateComponent } from './apartment-update.component';

describe('ApartmentUpdateComponent', () => {
  let component: ApartmentUpdateComponent;
  let fixture: ComponentFixture<ApartmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
