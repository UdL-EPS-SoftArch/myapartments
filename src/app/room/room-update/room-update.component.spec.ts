import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUpdateComponent } from './room-update.component';

describe('RoomUpdateComponent', () => {
  let component: RoomUpdateComponent;
  let fixture: ComponentFixture<RoomUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
