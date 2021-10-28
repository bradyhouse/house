
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';

import RefData from '../../data/ref-data';

const  SkillFilter = forwardRef((props, ref) => {

  const [model,setModel] = useState({
      android: false,
      css: false,
      html5: false,
      mac: false,
      windows: false
  });

  //#region AG Grid Filter Lifecycle callbacks

  useImperativeHandle(ref, () => {
      return {

        //#region isFilterActive

        isFilterActive() {
          return model.android || model.css || model.html5 || model.mac || model.windows;
        },

        //#endregion
        //#region doesFilterPass

        doesFilterPass(props) {

          var rowSkills = props.data.skills;
          var passed = true;

          RefData.IT_SKILLS.forEach((skill) => {
              if (model[skill]) {
                  if (!rowSkills[skill]) {
                      passed = false;
                  }
              }
          });
          return passed;
        },

        //#endregion
        getModel() {},
        setModel() {}
        //#endregion

      } // end return
  });

  //#endregion

  const onSkillChange = (event) => {
    alert(event.target.value);
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [model]);


  let checkboxes = null;
  if (RefData.IT_SKILLS.length) {
    checkboxes =(
      <div>
        {RefData.IT_SKILLS.forEach(skill => (
              <label style={{border: '1px solid lightgrey', margin: '4px', padding:'4px', display:'inline-block'}}>
                <span>
                  <div style={{textAlign: 'center'}}>
                    {skill}
                  </div>
                  <div>
                    <input type="checkbox" onChange={onSkillChange}></input>
                    <img src="images/skills/SKILL.png" width="30px"/>
                  </div>
                </span>
              </label>
        ))}
      </div>
    );
  }

  return (
    <div>
      <b>Custom Skills Filter</b>
      {checkboxes}
    </div>
  );

});

export default SkillFilter;
