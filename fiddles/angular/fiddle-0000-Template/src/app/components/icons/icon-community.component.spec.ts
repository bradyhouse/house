import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCommunityComponent } from './icon-community.component';

describe('IconCommunityComponent', () => {
  let component: IconCommunityComponent;
  let fixture: ComponentFixture<IconCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconCommunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
