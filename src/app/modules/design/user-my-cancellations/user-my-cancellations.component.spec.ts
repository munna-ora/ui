import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyCancellationsComponent } from './user-my-cancellations.component';

describe('UserMyCancellationsComponent', () => {
  let component: UserMyCancellationsComponent;
  let fixture: ComponentFixture<UserMyCancellationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyCancellationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyCancellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
