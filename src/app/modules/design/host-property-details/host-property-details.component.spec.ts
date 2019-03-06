import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPropertyDetailsComponent } from './host-property-details.component';

describe('HostPropertyDetailsComponent', () => {
  let component: HostPropertyDetailsComponent;
  let fixture: ComponentFixture<HostPropertyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostPropertyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
