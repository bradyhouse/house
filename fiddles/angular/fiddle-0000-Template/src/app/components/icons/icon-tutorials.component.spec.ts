import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTutorialsComponent } from './icon-tutorials.component';

describe('IconTutorialsComponent', () => {
  let component: IconTutorialsComponent;
  let fixture: ComponentFixture<IconTutorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconTutorialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
