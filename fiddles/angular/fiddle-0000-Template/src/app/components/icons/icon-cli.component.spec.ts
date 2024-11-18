import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCliComponent } from './icon-cli.component';

describe('IconCliComponent', () => {
  let component: IconCliComponent;
  let fixture: ComponentFixture<IconCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
