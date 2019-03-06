import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaySearchFormComponent } from './stay-search-form.component';

describe('StaySearchFormComponent', () => {
  let component: StaySearchFormComponent;
  let fixture: ComponentFixture<StaySearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaySearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
