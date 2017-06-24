import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyStatsComponent } from './party-stats.component';

describe('PartyStatsComponent', () => {
  let component: PartyStatsComponent;
  let fixture: ComponentFixture<PartyStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
