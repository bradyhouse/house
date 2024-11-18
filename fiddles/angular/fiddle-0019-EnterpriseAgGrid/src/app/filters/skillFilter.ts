import RefData from '../data/refData';
import {IFilter,IFilterParams} from "ag-grid/main";

var SKILL_TEMPLATE =
    '<label style="border: 1px solid lightgrey; margin: 4px; padding: 4px; display: inline-block;">' +
    '  <span>' +
    '    <div style="text-align: center;">SKILL_NAME</div>' +
    '    <div>' +
    '      <input type="checkbox"/>' +
    '      <img src="images/skills/SKILL.png" width="30px"/>' +
    '    </div>' +
    '  </span>' +
    '</label>';

var FILTER_TITLE =
    '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
    '<b>TITLE_NAME</b>' +
    '</div>';

export default class SkillFilter implements IFilter {

    private filterChangedCallback:Function = () => {};
    private model:any = {};

    public init(params: IFilterParams) : void {
        this.filterChangedCallback = params.filterChangedCallback;
        this.model = {
            android: false,
            css: false,
            html5: false,
            mac: false,
            windows: false
        };
    };

    public getGui() {
        let eGui: any = document.createElement('div');
        eGui.style.width = '380px';
        var eInstructions = document.createElement('div');
        eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Skills Filter');
        eGui.appendChild(eInstructions);

        let that: any = this;

        RefData.IT_SKILLS.forEach(function (skill: any, index: any) {
            let skillName: any = RefData.IT_SKILLS_NAMES[index];
            let eSpan: any = document.createElement('span');
            let html: any = SKILL_TEMPLATE.replace("SKILL_NAME", skillName).replace("SKILL", skill);
            eSpan.innerHTML = html;

            let eCheckbox: any = <HTMLInputElement> eSpan.querySelector('input');
            eCheckbox.addEventListener('click', function () {
                that.model[skill] = eCheckbox.checked;
                that.filterChangedCallback();
            });

            eGui.appendChild(eSpan);
        });

        return eGui;
    };

    public doesFilterPass(params: any) {

        let rowSkills: any = params.data.skills;
        let model: any = this.model;
        let passed: boolean = true;

        RefData.IT_SKILLS.forEach(function (skill: any) {
            if (model[skill]) {
                if (!rowSkills[skill]) {
                    passed = false;
                }
            }
        });

        return passed;
    };

    public isFilterActive() {
        let model: any = this.model;
        let somethingSelected: any = model.android || model.css || model.html5 || model.mac || model.windows;
        return somethingSelected;
    };

    public getModel():any {
        return undefined;
    }

    public setModel(model:any):void {
    }
}

