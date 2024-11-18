import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsViewComponent } from './docs-view.component';

describe('DocsViewComponent', () => {
  let component: DocsViewComponent;
  let fixture: ComponentFixture<DocsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
