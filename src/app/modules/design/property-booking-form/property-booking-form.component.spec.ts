import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBookingFormComponent } from './property-booking-form.component';

describe('PropertyBookingFormComponent', () => {
  let component: PropertyBookingFormComponent;
  let fixture: ComponentFixture<PropertyBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyBookingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
