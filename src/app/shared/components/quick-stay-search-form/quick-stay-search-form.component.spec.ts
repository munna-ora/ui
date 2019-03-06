import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStaySearchFormComponent } from './quick-stay-search-form.component';

describe('QuickStaySearchFormComponent', () => {
  let component: QuickStaySearchFormComponent;
  let fixture: ComponentFixture<QuickStaySearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickStaySearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickStaySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
