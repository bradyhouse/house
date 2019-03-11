import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XyzGridComponent } from './xyz-grid.component';

describe('XyzGridComponent', () => {
  let component: XyzGridComponent;
  let fixture: ComponentFixture<XyzGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XyzGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XyzGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
