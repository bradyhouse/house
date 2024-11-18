import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationQueueComponent } from './notification-queue.component';

describe('NotificationQueueComponent', () => {
  let component: NotificationQueueComponent;
  let fixture: ComponentFixture<NotificationQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
