import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkPopupComponent } from './bookmark-popup.component';

describe('BookmarkPopupComponent', () => {
  let component: BookmarkPopupComponent;
  let fixture: ComponentFixture<BookmarkPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
