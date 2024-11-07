import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundViewComponent } from './not-found-view.component';

describe('NotFoundViewComponent', () => {
  let component: NotFoundViewComponent;
  let fixture: ComponentFixture<NotFoundViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
