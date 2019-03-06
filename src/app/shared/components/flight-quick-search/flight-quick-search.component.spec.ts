import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightQuickSearchComponent } from './flight-quick-search.component';

describe('FlightQuickSearchComponent', () => {
  let component: FlightQuickSearchComponent;
  let fixture: ComponentFixture<FlightQuickSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightQuickSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
