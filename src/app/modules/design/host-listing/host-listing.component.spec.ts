import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListingComponent } from './host-listing.component';

describe('HostListingComponent', () => {
  let component: HostListingComponent;
  let fixture: ComponentFixture<HostListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
