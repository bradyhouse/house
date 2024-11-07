import { TestBed, async } from '@angular/core/testing';
import { AgGridModule } from '@ag-grid-community/angular';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AgGridModule.withComponents([TooltipComponent]),
        ComponentsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
