import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDocumentationComponent } from './icon-documentation.component';

describe('IconDocumentationComponent', () => {
  let component: IconDocumentationComponent;
  let fixture: ComponentFixture<IconDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDocumentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
