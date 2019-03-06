import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMySupportComponent } from './user-my-support.component';

describe('UserMySupportComponent', () => {
  let component: UserMySupportComponent;
  let fixture: ComponentFixture<UserMySupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMySupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
