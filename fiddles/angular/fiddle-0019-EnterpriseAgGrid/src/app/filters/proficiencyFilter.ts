import {IFilter,IFilterParams} from "ag-grid/main";

let FILTER_TITLE: string =
    '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
    '<b>TITLE_NAME</b>' +
    '</div>';
let PROFICIENCY_TEMPLATE: string =
    '<label style="padding-left: 4px;">' +
    '<input type="radio" name="RANDOM"/>' +
    'PROFICIENCY_NAME' +
    '</label>';

let PROFICIENCY_NONE: string = 'none';
let PROFICIENCY_ABOVE40: string = 'above40';
let PROFICIENCY_ABOVE60: string = 'above60';
let PROFICIENCY_ABOVE80: string = 'above80';

let PROFICIENCY_NAMES: string[] = ['No Filter', 'Above 40%', 'Above 60%', 'Above 80%'];
let PROFICIENCY_VALUES: string[] = [PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80];

export default class ProficiencyFilter implements IFilter {

  // eslint-disable-next-line no-use-before-define
    private filterChangedCallback:Function = ()=> {};

    // eslint-disable-next-line no-use-before-define
    private selected:string = "";

    // eslint-disable-next-line no-use-before-define
    private valueGetter:Function = () => {};

    public init(params: IFilterParams) : void {
        this.filterChangedCallback = params.filterChangedCallback;
        this.selected = PROFICIENCY_NONE;
        this.valueGetter = params.valueGetter;
    }

    public getGui() {
        let eGui: any = document.createElement('div');
        let eInstructions: any = document.createElement('div');
        eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Proficiency Filter');
        eGui.appendChild(eInstructions);

        let random: any = '' + Math.random();

        let that: any = this;
        PROFICIENCY_NAMES.forEach(function (name: any, index: any) {
            let eFilter: any = document.createElement('div');
            let html: any = PROFICIENCY_TEMPLATE.replace('PROFICIENCY_NAME', name).replace('RANDOM', random);
            eFilter.innerHTML = html;
            let eRadio: any = <HTMLInputElement> eFilter.querySelector('input');
            if (index === 0) {
                eRadio.checked = true;
            }
            eGui.appendChild(eFilter);

            eRadio.addEventListener('click', function () {
                that.selected = PROFICIENCY_VALUES[index];
                that.filterChangedCallback();
            });
        });

        return eGui;
    }

    public doesFilterPass(params: any) {

        let value: any = this.valueGetter(params);
        let valueAsNumber: any = parseFloat(value);

        switch (this.selected) {
            case PROFICIENCY_ABOVE40 :
                return valueAsNumber >= 40;
            case PROFICIENCY_ABOVE60 :
                return valueAsNumber >= 60;
            case PROFICIENCY_ABOVE80 :
                return valueAsNumber >= 80;
            default :
                return true;
        }

    }

    public isFilterActive() {
        return this.selected !== PROFICIENCY_NONE;
    }

    public getModel():any {
        return undefined;
    }

    public setModel(model:any):void {
    }
}
