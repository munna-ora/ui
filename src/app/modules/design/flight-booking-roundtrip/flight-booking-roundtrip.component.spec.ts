import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingRoundtripComponent } from './flight-booking-roundtrip.component';

describe('FlightBookingRoundtripComponent', () => {
  let component: FlightBookingRoundtripComponent;
  let fixture: ComponentFixture<FlightBookingRoundtripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBookingRoundtripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingRoundtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
