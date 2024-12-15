import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAcceptComponent } from './visit-accept.component';

describe('VisitAcceptComponent', () => {
  let component: VisitAcceptComponent;
  let fixture: ComponentFixture<VisitAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitAcceptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
