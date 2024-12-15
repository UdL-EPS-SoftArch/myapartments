import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDeleteComponent } from './apartment-delete.component';

describe('ApartmentDeleteComponent', () => {
  let component: ApartmentDeleteComponent;
  let fixture: ComponentFixture<ApartmentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
