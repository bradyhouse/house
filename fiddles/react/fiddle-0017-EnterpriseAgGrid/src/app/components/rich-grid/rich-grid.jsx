import React, { useMemo, useState } from 'react';
import './rich-grid.css';
import RefData from '../../data/ref-data';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CustomHeader, CustomGroupHeader, SkillFilter } from '../index';

//#region Cell Renderers

function skillsCellRenderer(params) {
  var data = params.data;
  var skills = [];
  RefData.IT_SKILLS.forEach(function (skill) {
      if (data && data.skills && data.skills[skill]) {
          skills.push('<img src="images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
      }
  });
  return skills.join(' ');
}

function percentCellRenderer(params) {
  var value = params.value;

  var eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if (value < 20) {
      eDivPercentBar.style.backgroundColor = 'red';
  } else if (value < 60) {
      eDivPercentBar.style.backgroundColor = '#ff9900';
  } else {
      eDivPercentBar.style.backgroundColor = '#00A000';
  }

  var eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  var eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}

function countryCellRenderer(params) {
  var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
  return flag + " " + params.value;
}

//#endregion

const RichGrid = () => {

  const createRowData = () => {
    const rowData = [];
    const createRandomPhoneNumber =() => {
      var result = '+';
      for (var i = 0; i < 12; i++) {
          result += Math.round(Math.random() * 10);
          if (i === 2 || i === 5 || i === 8) {
              result += ' ';
          }
      }
      return result;
    };

    for (var i = 0; i < 200; i++) {
        var countryData = RefData.countries[i % RefData.countries.length];
        rowData.push({
            name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
            skills: {
              android: Math.random() < 0.4,
              html5: Math.random() < 0.4,
              mac: Math.random() < 0.4,
              windows: Math.random() < 0.4,
              css: Math.random() < 0.4
            },
            dob: RefData.DOBs[i % RefData.DOBs.length],
            address: RefData.addresses[i % RefData.addresses.length],
            years: Math.round(Math.random() * 100),
            proficiency: Math.round(Math.random() * 100),
            country: countryData.country,
            continent: countryData.continent,
            language: countryData.language,
            mobile: createRandomPhoneNumber(),
            landline: createRandomPhoneNumber()
        });
    }

    return rowData;
  }

  const pad = (num, totalStringSize) => {
    let asString = num + "";
    while (asString.length < totalStringSize) asString = "0" + asString;
    return asString;
  };

  const [rowData] = useState(createRowData());

  const RichGridDOM = () => {

    //#region Column Definitions

    const columnDefs = useMemo(() => [
      {
        headerName: '#', width: 30, checkboxSelection: true,
        suppressMenu: true, pinned: true, sortable: false
      },
      {
        headerName: 'Employee',
        headerGroupComponentFramework: CustomGroupHeader,
        children: [
          {
            headerName: "Name", field: "name",
            width: 150, pinned: true, sortable: true
          },
          {
            headerName: "Country", field: "country", width: 150,
            pinned: true,
            cellRenderer: countryCellRenderer,
            filterParams: {cellRenderer: countryCellRenderer, cellHeight: 20},
            columnGroupShow: 'open'
          },
          {
            headerName: "DOB", field: "dob", width: 120, pinned: true, cellRenderer: function (params) {
              return pad(params.value.getDate(), 2) + '/' +
                pad(params.value.getMonth() + 1, 2) + '/' +
                params.value.getFullYear();
            }, filter: 'date', columnGroupShow: 'open'
          }
        ]
      },
      {
        headerName: 'IT Skills',
        children: [
          {
            headerName: "Skills",
            field: 'skills',
            cellRenderer: skillsCellRenderer,
            enableMenu: true,
            filter: SkillFilter,
            width: 125
          },
          {
            headerName: "Proficiency",
            field: "proficiency",
            cellRenderer: percentCellRenderer,
            width: 120
          },
        ]
      },
      {
        headerName: 'Contact',
        children: [
          { headerName: "Mobile", field: "mobile", width: 150, filter: 'text' },
          { headerName: "Land-line", field: "landline", width: 150, filter: 'text' },
          { headerName: "Address", field: "address", width: 500, filter: 'text' }
        ]
      }
    ], []);

    //#endregion

    return (
    <div style={{ width: '100%', height: window.innerHeight - 50 }}>
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
            reactUi="true"
            columnDefs={columnDefs}
            defaultColDef={{
              editable: true,
              sortable: true,
              flex: 1,
              minWidth: 100,
              filter: true,
              resizable: true,
              headerComponentParams: { menuIcon: 'fa-bars' },
            }}
            enableRangeSelection="true"
            rowData={rowData}
            frameworkComponents={{ agColumnHeader: CustomHeader, skillFilter: SkillFilter }}
            rowSelection="multiple"

        />
      </div>
    </div>
  );
  }

  return (
    <RichGridDOM></RichGridDOM>
  )

}

export default RichGrid;
