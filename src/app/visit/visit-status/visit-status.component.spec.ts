import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitStatusComponent } from './visit-status.component';

describe('VisitStatusComponent', () => {
  let component: VisitStatusComponent;
  let fixture: ComponentFixture<VisitStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
