import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAnimeComponent } from './loading-anime.component';

describe('LoadingAnimeComponent', () => {
  let component: LoadingAnimeComponent;
  let fixture: ComponentFixture<LoadingAnimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAnimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
