import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDeleteComponent } from './room-delete.component';

describe('RoomDeleteComponent', () => {
  let component: RoomDeleteComponent;
  let fixture: ComponentFixture<RoomDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
