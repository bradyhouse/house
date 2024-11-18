import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocListItemComponent } from './doc-list-item.component';

describe('DocListItemComponent', () => {
  let component: DocListItemComponent;
  let fixture: ComponentFixture<DocListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
