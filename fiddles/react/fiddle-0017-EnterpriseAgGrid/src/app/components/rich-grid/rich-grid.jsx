import React, { useMemo, useState } from 'react';
import './rich-grid.css';
import RefData from '../../data/ref-data';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


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



  const [rowData, setRowData] = useState(createRowData());

  const RichGridDOM = (params) => {

    //#region Column Definitions

    const columnDefs = useMemo(() => [
      {
        headerName: '#', width: 30, checkboxSelection: true,
        suppressMenu: true, pinned: true
      },
      {
        headerName: 'Employee',
        children: [
          {
            headerName: "Name", field: "name",
            width: 150, pinned: true
          },
          {
            headerName: "Country", field: "country", width: 150,
            pinned: true,
            filterParams: { cellHeight: 20 }, columnGroupShow: 'open'
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
            width: 125
          },
          {
            headerName: "Proficiency",
            field: "proficiency",
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

    //#region Default Column Definition

    const defaultColDef = useMemo(() => ({
      resizable: true,
      sortable: true
    }),[]);

    //#endregion

    return (
      <div class="ag-theme-alpine" style={{ height: window.innerHeight - 50 }}>
      <AgGridReact
          reactUi="true"
          className="ag-theme-alpine"
          animateRows="true"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection="true"
          rowData={rowData}
          rowSelection="multiple"
          suppressRowClickSelection="true"
          style={{ height: 400, width: 600 }}
      />
      </div>

  );
  }


  return (
    <RichGridDOM></RichGridDOM>
  )

}

export default RichGrid;
