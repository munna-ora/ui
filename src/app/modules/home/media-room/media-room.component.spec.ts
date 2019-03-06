import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaRoomComponent } from './media-room.component';

describe('MediaRoomComponent', () => {
  let component: MediaRoomComponent;
  let fixture: ComponentFixture<MediaRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
