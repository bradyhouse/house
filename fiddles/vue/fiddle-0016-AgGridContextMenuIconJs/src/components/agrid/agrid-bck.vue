<script setup>
import { ref, watch, computed } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AgGridVue } from 'ag-grid-vue3';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import AgridContextLinkRenderer from './AgridContextLinkRenderer.vue';


const props = defineProps({
  headers: { type: Array },
  pageSize: { type: Number, default: 10 },
  sortable: { type: Boolean, default: true },
  selectable: { type: Boolean, default: false },
  datasource: { type: Object }
});

const modules = [ClientSideRowModelModule, SideBarModule, ColumnsToolPanelModule, MenuModule, RangeSelectionModule, ServerSideRowModelModule];
const api = ref(null);
const emit = defineEmits(['selected', 'changed']);

const components = {
  iconRenderer: AgridContextLinkRenderer
};

const rowModelType = ref('serverSide');

const context = {
  componentParent: this
};

const rowData = ref([]);

const columnDefs = ref(props.headers.map(header => ({
  field: header.field,
  headerName: header.label,
  flex: 1,
  resizable: true,
  sortable: true,
  filter: true,
  wrapText: true,
  autoHeight: true,
  menuTabs: ['generalMenuTab', 'filterMenuTab'],
  filter: true
})));


function onGridReady(params) {
  if (api.value === null) {
    api.value = params.api;
    params.api.setServerSideDatasource(props.datasource);
  }
}

function onRowSelected(event) {
  if (props.selectable) {
    emit('selected', event.node.data);
  }
}

function onSortChanged(event) {
  emit('changed', event.api.getSortModel());
}

</script>


<template>
    <div class="ag-theme-alpine" style="height: 100%">
      <ag-grid-vue
      class="hq-ag-grid"
      multiSortKey="ctrl"
      :columnDefs="columnDefs"
      :pagination="true"
      :paginationPageSize="props.pageSize"
      :copyHeadersToClipboard="true"
      :suppressCopyRowsToClipboard="true"
      :enableRangeSelection="true"
      :enableCellTextSelection="true"
      :ensureDomOrder="true"
      :components="components"
      :context="context"
      :rowData="rowData"
      :rowModelType="rowModelType"
      :domLayout="'autoHeight'"
      @grid-ready="onGridReady"
      @row-selected="onRowSelected"
      @sort-changed="onSortChanged"
      style="width: 100%; height: 100%;"
      :modules="modules"
    ></ag-grid-vue>
    </div>

  </template>
  

  
  <style scoped>

  .hq-ag-grid {
    --ag-border-color: white !important;
    --ag-font-size: 0.75rem !important;
    --ag-font-family: Securitas Pro, helvetica, sans-serif !important;
    --ag-line-height: 14px !important;
    --ag-internal-calculated-line-height: 14px !important;
    --ag-internal-padded-row-height: 14px !important;
  }

  .ag-theme-alpine {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
  }

  .ag-cell, .ag-full-width-row .ag-cell-wrapper.ag-row-group {
    --ag-internal-calculated-line-height: var(--ag-line-height, calc(var(--ag-row-height) - var(--ag-row-border-width)));
    --ag-internal-padded-row-height: calc(var(--ag-row-height) - var(--ag-row-border-width));
    border: 1px solid transparent;
    line-height: min(var(--ag-internal-calculated-line-height), var(--ag-internal-padded-row-height));
    padding-left: calc(var(--ag-cell-horizontal-padding) - 1px);
    padding-right: calc(var(--ag-cell-horizontal-padding) - 1px);
    padding-top: 20px;
    -webkit-font-smoothing: subpixel-antialiased;
}

  .ag-theme-alpine .ag-header {
    border-radius: 15px;
  }

  .ag-theme-alpine .ag-row-odd {
    border-radius: 15px;
  }

  </style>