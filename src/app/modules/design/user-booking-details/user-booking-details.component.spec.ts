import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingDetailsComponent } from './user-booking-details.component';

describe('UserBookingDetailsComponent', () => {
  let component: UserBookingDetailsComponent;
  let fixture: ComponentFixture<UserBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
