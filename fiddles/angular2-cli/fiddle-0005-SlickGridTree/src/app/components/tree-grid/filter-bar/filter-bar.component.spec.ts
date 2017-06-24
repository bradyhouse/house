import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';


import {
  FilterBarComponent,
  FilterBarInterface

} from './index';


export function main() {
  describe('tree-grid', () => {
    describe('FilterBarComponent', () => {
      let component: FilterBarComponent;
      let fixture: ComponentFixture<FilterBarComponent>;
      let options: FilterBarInterface;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ReactiveFormsModule],
          declarations: [FilterBarComponent]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(FilterBarComponent);
        component = fixture.componentInstance;
        options = {
          isDisabled: true,
          filter: null
        };
        fixture.detectChanges();
      });

      it('should be created', () => {
        expect(component).toBeTruthy();
      });

    });
  });
}


