import {
  Component,
  ViewEncapsulation
} from "@angular/core";
import ProficiencyFilter from '../filters/proficiencyFilter';
import SkillFilter from '../filters/skillFilter';
import RefData from '../data/refData';
import 'ag-grid-enterprise';

import {
  HeaderGroupComponent
} from "../header-group-component/header-group.component";
import {
  DateComponent
} from "../date-component/date.component";
import {
  HeaderComponent
} from "../header-component/header.component";

@Component({
  selector: 'app-rich-grid',
  templateUrl: 'rich-grid.component.html',
  styleUrls: ['rich-grid.css', 'proficiency-renderer.css'],
  encapsulation: ViewEncapsulation.None
})
export class RichGridComponent {

  gridOptions: any;
  showGrid: boolean;
  showToolPanel: boolean;
  rowData: any[];
  columnDefs: any[];
  rowCount: string;
  dateComponentFramework: DateComponent;
  public HeaderGroupComponent = HeaderGroupComponent;


  constructor() {
    this.gridOptions = {};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
    this.showToolPanel = true;
    this.rowData = [];
    this.columnDefs = [];
    this.rowCount = "";
    this.dateComponentFramework = new DateComponent();
    this.gridOptions.dateComponentFramework = DateComponent;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: < {
        new(): HeaderComponent
      } > HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }
    this.gridOptions.colGroupDef = null;
  }

  createRowData() {
    let rowData: any[] = [];

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

    this.rowData = rowData;
  }

  createColumnDefs() {
    this.columnDefs = [{
        headerName: '#',
        width: 30,
        checkboxSelection: true,
        suppressSorting: true,
        suppressMenu: true,
        pinned: true
      },
      {
        headerName: 'Employee',
        headerGroupComponentFramework: HeaderGroupComponent,
        children: [{
            headerName: "Name",
            field: "name",
            width: 150,
            pinned: true
          },
          {
            headerName: "Country",
            field: "country",
            width: 150,
            cellRenderer: countryCellRenderer,
            pinned: true,
            filterParams: {
              cellRenderer: countryCellRenderer,
              cellHeight: 20
            },
            columnGroupShow: 'open'
          },
          {
            headerName: "DOB",
            field: "dob",
            width: 120,
            pinned: true,
            cellRenderer: function (params: any) {
              return pad(params.value.getDate(), 2) + '/' +
                pad(params.value.getMonth() + 1, 2) + '/' +
                params.value.getFullYear();
            },
            filter: 'date',
            columnGroupShow: 'open'
          }
        ]
      },
      {
        headerName: 'IT Skills',
        children: [{
            headerName: "Skills",
            width: 125,
            suppressSorting: true,
            cellRenderer: skillsCellRenderer,
            filter: SkillFilter
          },
          {
            headerName: "Proficiency",
            field: "proficiency",
            width: 120,
            cellRenderer: percentCellRenderer,
            filter: ProficiencyFilter
          },
        ]
      },
      {
        headerName: 'Contact',
        children: [{
            headerName: "Mobile",
            field: "mobile",
            width: 150,
            filter: 'text'
          },
          {
            headerName: "Land-line",
            field: "landline",
            width: 150,
            filter: 'text'
          },
          {
            headerName: "Address",
            field: "address",
            width: 500,
            filter: 'text'
          }
        ]
      }
    ];
  }

  calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      let model: any = this.gridOptions.api.getModel();
      let totalRows: number = this.rowData.length;
      let processedRows: number = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  onSelectAllClick() {
    if (this.gridOptions.api) {
      this.gridOptions.api.selectAll();
    }
  }

  onDeselectAllClick() {
    if (this.gridOptions.api) {
      this.gridOptions.api.deselectAll();
    }
  }

  onHideCountryColumnClick() {
    if (this.gridOptions.columnApi) {
      this.gridOptions.columnApi.setColumnVisible('country', false);
    }
  }

  onShowCountryColumnClick() {
    if (this.gridOptions.columnApi) {
      this.gridOptions.columnApi.setColumnVisible('country', true);
    }
  }

  onShowToolPanelChange(event: any) {
    if (event && event.target) {
      this.showToolPanel=event.target.checked
    }
  }

  onModelUpdated() {
    console.log('onModelUpdated');
    this.calculateRowCount();
  }

  onReady(event: any) {
    console.log('onReady');
    this.calculateRowCount();
  }

  onCellClicked($event: any) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellValueChanged($event: any) {
    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  onCellDoubleClicked($event: any) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellContextMenu($event: any) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  onCellFocused($event: any) {
    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
  }

  onRowSelected($event: any) {
    // taking out, as when we 'select all', it prints to much to the console!!
    // console.log('onRowSelected: ' + $event.node.data.name);
  }

  onSelectionChanged() {
    console.log('selectionChanged');
  }

  onBeforeFilterChanged() {
    console.log('beforeFilterChanged');
  }

  onAfterFilterChanged() {
    console.log('afterFilterChanged');
  }

  onFilterModified() {
    console.log('onFilterModified');
  }

  onBeforeSortChanged() {
    console.log('onBeforeSortChanged');
  }

  onAfterSortChanged() {
    console.log('onAfterSortChanged');
  }

  onVirtualRowRemoved($event: any) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  onRowClicked($event: any) {
    console.log('onRowClicked: ' + $event.node.data.name);
  }

  onQuickFilterChanged($event: any) {
    // eslint-disable-next-line no-use-before-define
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  onColumnEvent($event: any) {
    console.log('onColumnEvent: ' + $event);
  }

}

function skillsCellRenderer(params: any) {
  const data: any = params.data;
  const skills: any[] = [];
  RefData.IT_SKILLS.forEach(function (skill: any) {
    if (data && data.skills && data.skills[skill]) {
      skills.push('<img src="images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
    }
  });
  return skills.join(' ');
}

function countryCellRenderer(params: any) {
  const flag: string = `<img border='0' width='15' height='10' style='margin-bottom: 2px' src='images/flags/
    ${RefData.COUNTRY_CODES[params.value]}.png'>`;
  return flag + " " + params.value;
}

function createRandomPhoneNumber() {
  let result: any = '+';
  for (var i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
}

function percentCellRenderer(params: any) {
  let value: any = params.value;

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

  let eValue: any = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  let eOuterDiv: any = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}

//Utility function used to pad the date formatting.
function pad(num: number, totalStringSize: number) {
  let asString: string = num + "";
  while (asString.length < totalStringSize) asString = "0" + asString;
  return asString;
}
