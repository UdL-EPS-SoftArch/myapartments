import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAdvertisementComponent } from './advertisement-delete.component';
import { AdvertisementService } from '../advertisement.service';
import { of, throwError } from 'rxjs';


class AdvertisementServiceMock {
  deleteAdvertisement() {
    return of(void 0);
  }
}

describe('DeleteAdvertisementComponent', () => {
  let component: DeleteAdvertisementComponent;
  let fixture: ComponentFixture<DeleteAdvertisementComponent>;
  let advertisementService: AdvertisementServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAdvertisementComponent],
      providers: [
        { provide: AdvertisementService, useClass: AdvertisementServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAdvertisementComponent);
    component = fixture.componentInstance;
    advertisementService = TestBed.inject(AdvertisementService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteAdvertisement on confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(advertisementService, 'deleteAdvertisement').and.callThrough();

    const advertisementId = 1;
    component.advertisementId = advertisementId;

    component.deleteAdvertisement();

    expect(advertisementService.deleteAdvertisement).toHaveBeenCalled();

  });

  it('should not call deleteAdvertisement if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const advertisementId = 1;
    component.advertisementId = advertisementId;

    component.deleteAdvertisement();

    expect(advertisementService.deleteAdvertisement).not.toHaveBeenCalled();
  });

  it('should handle errors correctly', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    spyOn(advertisementService, 'deleteAdvertisement').and.returnValue(throwError(() => new Error('Deletion failed')));

    const advertisementId = 1;
    component.advertisementId = advertisementId;

    component.deleteAdvertisement();

  });
});
