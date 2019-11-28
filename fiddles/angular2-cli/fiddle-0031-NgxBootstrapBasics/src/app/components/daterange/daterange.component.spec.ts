import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterangeComponent } from './daterange.component';

describe('DaterangeComponent', () => {
  let component: DaterangeComponent;
  let fixture: ComponentFixture<DaterangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaterangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
