import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocListComponent } from './doc-list.component';

describe('DocListComponent', () => {
  let component: DocListComponent;
  let fixture: ComponentFixture<DocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
