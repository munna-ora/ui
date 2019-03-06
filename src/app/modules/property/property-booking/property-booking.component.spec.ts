import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBookingComponent } from './property-booking.component';

describe('PropertyBookingComponent', () => {
  let component: PropertyBookingComponent;
  let fixture: ComponentFixture<PropertyBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
