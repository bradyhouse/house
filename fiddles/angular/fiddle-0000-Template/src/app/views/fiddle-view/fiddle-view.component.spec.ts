import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiddleViewComponent } from './fiddle-view.component';

describe('FiddleViewComponent', () => {
  let component: FiddleViewComponent;
  let fixture: ComponentFixture<FiddleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiddleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiddleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
