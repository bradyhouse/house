import RefData from '../../data/ref-data';

var SKILL_TEMPLATE =
    '<label style="border: 1px solid lightgrey; color: black; margin: 4px; padding: 4px; display: inline-block;">' +
    '  <span>' +
    '    <div style="text-align: center;">SKILL_NAME</div>' +
    '    <div>' +
    '      <input type="checkbox"/>' +
    '      <img src="images/skills/SKILL.png" width="25px"/>' +
    '    </div>' +
    '  </span>' +
    '</label>';

var FILTER_TITLE =
    '<div style="text-align: center; background: lightgray; color: black; width: 100%; display: block; border-bottom: 1px solid grey;">' +
    '<b>TITLE_NAME</b>' +
    '</div>';

export default class SkillFilter {

    init(params)  {
        this.filterChangedCallback = params.filterChangedCallback;
        this.model = {
          android: false,
          css: false,
          html5: false,
          mac: false,
          windows: false
        };
    };

    getGui() {
        var eGui = document.createElement('div');
        eGui.style.width = '380px';
        eGui.style.margin= '10px';
        var eInstructions = document.createElement('div');
        eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Skills Filter');
        eGui.appendChild(eInstructions);

        var that = this;

        RefData.IT_SKILLS.forEach(function (skill, index) {
            var skillName = RefData.IT_SKILLS_NAMES[index];
            var eSpan = document.createElement('span');
            var html = SKILL_TEMPLATE.replace("SKILL_NAME", skillName).replace("SKILL", skill);
            eSpan.innerHTML = html;

            var eCheckbox = eSpan.querySelector('input');
            eCheckbox.addEventListener('click', function () {
                that.model[skill] = eCheckbox.checked;
                console.log(that.model);
                that.filterChangedCallback();
            });

            if (that.model[skill]) {
              eCheckbox.checked = true;
            }

            eGui.appendChild(eSpan);
        });

        return eGui;
    };

    doesFilterPass(params) {

        var rowSkills = params.data.skills;
        var model = this.model;
        var passed = true;

        RefData.IT_SKILLS.forEach(function (skill) {
            if (model[skill]) {
                if (!rowSkills[skill]) {
                    passed = false;
                }
            }
        });

        return passed;
    };

    isFilterActive() {
        var model = this.model;
        var somethingSelected = model.android || model.css || model.html5 || model.mac || model.windows;
        return somethingSelected;
    };

    getModel() {
        return this.model;
    }

    setModel(model){
      this.model = model;
    }

}

