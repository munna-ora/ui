import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningCalculatorComponent } from './earning-calculator.component';

describe('EarningCalculatorComponent', () => {
  let component: EarningCalculatorComponent;
  let fixture: ComponentFixture<EarningCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
