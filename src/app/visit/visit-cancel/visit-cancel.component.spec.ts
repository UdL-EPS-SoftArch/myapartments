import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCancelComponent } from './visit-cancel.component';

describe('VisitCancelComponent', () => {
  let component: VisitCancelComponent;
  let fixture: ComponentFixture<VisitCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitCancelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
