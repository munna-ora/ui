import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBookingConfirmationComponent } from './property-booking-confirmation.component';

describe('PropertyBookingConfirmationComponent', () => {
  let component: PropertyBookingConfirmationComponent;
  let fixture: ComponentFixture<PropertyBookingConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyBookingConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBookingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
