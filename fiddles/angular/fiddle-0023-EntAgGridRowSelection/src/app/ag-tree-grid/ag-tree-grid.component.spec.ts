import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTreeGridComponent } from './ag-tree-grid.component';

describe('AgTreeGridComponent', () => {
  let component: AgTreeGridComponent;
  let fixture: ComponentFixture<AgTreeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTreeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTreeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
