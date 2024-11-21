import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentCreateComponent } from './apartment-create.component';

describe('ApartmentCreateComponent', () => {
  let component: ApartmentCreateComponent;
  let fixture: ComponentFixture<ApartmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
