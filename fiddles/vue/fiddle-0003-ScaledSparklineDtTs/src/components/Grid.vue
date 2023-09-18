<template>
  <ag-grid-vue
      ref="agGrid"
      multiSortKey='ctrl'
      :style="cssStyle"
      class="ag-theme-alpine"
      :rowModelType="rowModelType"
      :serverSideDatasource="datasource"
      :masterDetail="config.master_detail"
      :detailRowAutoHeight="true"
      :detailCellRenderer="detailCellRenderer"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="config.column_defaults"
      :rowStyle="config.row_style"
      :rowSelection="config.row_selection"
      :getRowStyle="getRowStyle"
      :getContextMenuItems="getContextMenuItems"
      :columnTypes="columnTypes"
      :serverSideInfiniteScroll="hasLoadMoreEventHandler"
      :rowHeight="rowHeight"
      :headerHeight="config.header_height"
      :domLayout="domLayout"
      :copyHeadersToClipboard="true"
      :suppressCopyRowsToClipboard="true"
      :enableRangeSelection="true"
      :defaultExcelExportParams="defaultExportParams"
      :defaultCsvExportParams="defaultExportParams"
      serverSideStoreType="partial"
      @filterChanged="onFilterChanged"
      @columnMoved="onColumnMoved"
      @dragStopped="onDragStopped"
      @sortChanged="onSortChanged"
      @columnPinned="onColumnPinned"
      @columnVisible="onColumnVisible" 
      />
</template>

<script>
import _ from 'lodash'

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

import * as visualizationUtils from '../../../utils/visualizationUtils'
import DsAgGridDetailCellRenderer from "./DsAgGridDetailCellRenderer";

  const operatorOverride = {
    'contains': 'string_contains',
    'notContains': 'string_does_not_contain',
    'equals': 'equal',
    'notEqual': 'not_equal',
    'startsWith': 'starts_with',
    'endsWith': 'ends_with',
    'lessThan': 'less',
    'lessThanOrEqual': 'less_or_equal',
    'greaterThan': 'greater',
    'greaterThanOrEqual': 'greater_or_equal',
    'inRange': 'between'
  }

  const invertedOperatorOverride = _.invert(operatorOverride)



class AgGridConfigStore {
  constructor(config) {
    this.state = {config}
  }
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// Need to disable error so that the ag-grid-vue has access to the DsAgGridDetailCellRenderer components
/* eslint-disable vue/no-unused-components */
export default {
  name: "Grid",
  components: {AgGridVue, DsAgGridDetailCellRenderer},
  inject: ['componentEventBus', 'callbackEventBus'],
  provide () {
    return {'agGridConfigStore': this.store}
  },
  props: ['config'],
  data () {
    return {
      detailCellRenderer: 'DsAgGridDetailCellRenderer',
      store: new AgGridConfigStore(this.config),
      dragEvent: null,
      initialState: null,
      ignoreNextSetStateEvent: false,
      // dictionary used to capture scaling sparkline Y value
      sparklineHiddenValues: {}  
    }
  },
  computed: {
    rowHeight () {
      // Need to set the row height because there is a bug with
      // serverSide row model + row counts + changing filters.
      // 42 is the default row height value.
      return this.hasLoadMoreEventHandler ? 42 : undefined
    },
    dateColumns () {
      return new Set(this.config.columns.filter(c => c.column_type === 'dateColumn').map(c => c.field))
    },
    cssStyle () {
      const style = {}
      if (!this.config.auto_height) {
        style.height = this.config.height
      }
      return style
    },
    columnById () {
      return _.keyBy(this.config.columns, 'field')
    },
    rowData () {
      return this.mergeRowData(
        this.config.row_data, this.config.cell_styles, this.config.cell_classes,
        this.config.row_styles)
    },
    columnDefs () {
      return this.config.columns.map((column, index) => {
        const def = {
          headerName: column.header_name,
          field: column.field,
          cellStyle: this.getCellStyle,
          cellClass: this.getCellClasses,
          type: column.column_type
        }
        if (column.column_type === 'numericColumn') {
          def.filter = 'agNumberColumnFilter'
        }
        if (column.pinned) {
          def.pinned = column.pinned
        }
        if (this.config.master_detail && index === 0) {
          def.cellRenderer = 'agGroupCellRenderer'
        } else if (column.sparkline) {
          def.cellRenderer = 'agSparklineCellRenderer'
          if (column.sparkline.y_limit) {
            def.valueGetter = (params) => this.getScaledSparklineValues(params, column.sparkline.y_limit)
            def.cellRendererParams = (params) => this.getScaledSparklineParams(params, column)
            
          } else {
              def.cellRendererParams = {
                  sparklineOptions: {
                  type: column.sparkline.chart_type,
                  ...(column.sparkline.config || {})
                  }
              }
          }                     
        }
        const fmtConf = column.formatter
        if (fmtConf && fmtConf.type === 'agGridFloatFormatter') {
          def.valueFormatter = param => {
            const value = param.value
            if (_.isNil(value)) {
              return null
            } else if (value % 1 === 0) {
              return value
            } else {
              return value.toFixed(fmtConf.precision)
            }
          }
        } else if (fmtConf && fmtConf.type === 'agGridCurrencyFormatter') {
          def.valueFormatter = param => {
            const value = param.value
            if (_.isNil(value)) {
              return null
            } else {
              return currencyFormatter.format(value)
            }
          }
        }

        if (column.width !== 'default') {
          def.width = column.width
        }
        return def
      })
    },
    columnTypes() {
      return {
        stringColumn: {
          filter: 'agTextColumnFilter',
        },
        dateColumn: {
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator (filterValue, cellValue) {
              const filterStr = filterValue.toISOString().slice(0, 10)
              return cellValue.localeCompare(filterStr)
            }
          }
        }
      }
    },
    hasLoadMoreEventHandler () {
      return _.size(this.getEventHandlers('load-rows')) > 0
    },
    rowModelType () {
      return this.hasLoadMoreEventHandler ? 'serverSide' : 'clientSide'
    },
    datasource () {
      return this.hasLoadMoreEventHandler ? this : null
    },
    domLayout () {
      return this.config.auto_height ? 'autoHeight' : 'normal'
    },
    defaultExportParams () {
      return {
        processCellCallback: (params) => {    
          if (params.column.colDef.cellRenderer === 'agSparklineCellRenderer') {
            return params.node.data[params.column.colId]
          }
          return params.value
        }}
    }
  },

  methods: {  

    isValidDate(value) {
      const date = new Date(value)
      return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)
    },

    isScaleTooltip(xValue, yValue) {
      let rc = false
      for (let key in this.sparklineHiddenValues) {
        const scaleValues = this.sparklineHiddenValues[key]
        scaleValues.forEach((value) => {
          const pieces = value.split('|')
          if (pieces && pieces.length === 4 && pieces[2] === String(xValue) && pieces[3] === String(yValue)) {
            rc = true
          }  
        })
      }
      return rc
    },

    toDateString(date) {
      const d = String(date.toLocaleDateString("en-US", { day: 'numeric'}))
      const day = d.length === 1 ? '0' + d : d
      const m =  String(date.toLocaleDateString("en-US", { month: 'numeric'}))
      const month = m.length === 1 ? '0' + m : m
      const year = String(date.toLocaleDateString("en-US", { year: 'numeric' }))
      return year + '-' + month + '-' + day   
    },

    toScaleRangeFromObj(obj) {
      switch(Array.isArray(obj)) {
        case false:
          console.warn('The specified Y Limit is not an array and will be ignored.')
          return [0, 0]
        default:
          if (obj.length > 1) return obj
          return obj.unshift(0) // add a minimum Y Value
      }
    },

    toScaleRange(value) {
      switch(typeof value) {
        case 'number':
          return [0, value]
        case 'string': {
          const obj = JSON.parse(value) // cast value past as string
          switch(typeof obj) {
            case 'number':
              return [0, obj]
            default:
              return this.toScaleRangeFromObj(obj)
          }
        }
        default:
          return this.toScaleRangeFromObj(value)          
      }
    },

    toScaledTimeSeries(values, scaleRange, rowIndex, field) {
      const index = values.length
      const series = values.map((element) => {
        return [element[0], element[1]]
      })
      const tooltipMarkerTags = []
      const hiddenValuesKey = String(rowIndex) + field
      
      let maxDate = new Date(series[index - 1][0])
      let minDate = new Date(series[0][0])
      let formattedDate = this.toDateString(minDate)

      // decrement minDate by 1
      minDate = new Date(minDate.setDate(minDate.getDate() - 1))
      // add a gap to the beginning of the series
      formattedDate = this.toDateString(minDate)
      series.unshift([formattedDate, null])
      // decrement minDate again
      minDate = new Date(minDate.setDate(minDate.getDate() - 1))
      formattedDate = this.toDateString(minDate)
      // add min scale point
      series.unshift([formattedDate, scaleRange[0]])
      // add a tooltip tag for min scaler
      tooltipMarkerTags.push(this.toSparklineTag(rowIndex, field, formattedDate, scaleRange[0]))
      // increment maxDate by
      maxDate = new Date(maxDate.setDate(maxDate.getDate() + 1))
      // add a gap at the end of the series
      formattedDate = this.toDateString(maxDate)
      series.push([formattedDate, null])
      // increment maxDate again
      maxDate = new Date(maxDate.setDate(maxDate.getDate() + 1))
      formattedDate = this.toDateString(maxDate)
      // add max scale point
      series.push([formattedDate, scaleRange[1]])
      // add a tooltip tag for min scaler
      tooltipMarkerTags.push(this.toSparklineTag(rowIndex, field, formattedDate, scaleRange[1]))
      // add all coordinate tags to hidden values array for lookup in tooltip render
      this.sparklineHiddenValues[hiddenValuesKey] = tooltipMarkerTags
     
      return series
    },

    toSparklineTag(rowIndex, colField, xValue, yValue) {
      return String(rowIndex) + '|' + 
             colField + '|' + 
             String(xValue) + '|' + 
             String(yValue)
    },

    toScaledSparklineValues(sparklineValues, scaleRange, rowIndex, field) {
      const scaledSparklineValues = []
      const tooltipMarkerTags = []
      const sample = sparklineValues[0]
      const hiddenValuesKey = String(rowIndex) + field
      let x = 0
      // if element zero is an array and x is a date then scale as timeseries
      if (Array.isArray(sample) && this.isValidDate(sample[0]))
        return this.toScaledTimeSeries(sparklineValues, scaleRange, rowIndex, field)

      if (scaleRange[0] === scaleRange[1] === 0) // short circuit if scale range is [0, 0]
        return sparklineValues.map((y, x) => [x, y])
      
      // create a min Y coordinate tag
      tooltipMarkerTags.push(this.toSparklineTag(rowIndex, field, x, scaleRange[0]))
      // add a min Y value to the beginning of series
      scaledSparklineValues.push([x++,scaleRange[0]])    
      // add a gap to the beginning 
      scaledSparklineValues.push([x++,null]) 
      // add original values
      sparklineValues.forEach((value) => { scaledSparklineValues.push([x++,value])})
      // add a gap at the end
      scaledSparklineValues.push([x++,null])
      // add max Y value to the end
      scaledSparklineValues.push([x,scaleRange[1]])
      // create max Y coordinate tag
      tooltipMarkerTags.push(this.toSparklineTag(rowIndex, field, x, scaleRange[1]))
      // add all coordinate tags to hidden values array for lookup in tooltip render
      this.sparklineHiddenValues[hiddenValuesKey] = tooltipMarkerTags
      
      return scaledSparklineValues
    },

    buildScaledSparklineValuesByRow(params, yLimitField) {
      const { rowIndex } = params.node
      const { field } = params.colDef
      const isYLimit = (yLimitField in params.data) 
      const scaleRange =  isYLimit ? this.toScaleRange(params.data[yLimitField]) : [0,0]
      const values = typeof params.data[params.colDef.field] === 'string' ? 
        JSON.parse(params.data[params.colDef.field]) : params.data[params.colDef.field]      

      if ( values.length === 1 || (scaleRange[0] === scaleRange[1] === 0 ) ) 
        return values // if single point, short circuit    
      
      if (!isYLimit) 
        console.warn('The specified Y Limit field, ' + yLimitField + ', is invalid and will be ignored.')
      
      return this.toScaledSparklineValues(values, scaleRange, rowIndex, field)
    },

    buildScaledSparklineValuesByCol(params, yLimit) {
      const { rowIndex } = params.node
      const { field } = params.colDef
      const scaleRange =  this.toScaleRange(yLimit)
      const values = typeof params.data[params.colDef.field] === 'string' ? JSON.parse(params.data[params.colDef.field]) : params.data[params.colDef.field]

      if ( values.length === 1) return values // if single point, short circuit    

      return this.toScaledSparklineValues(values, scaleRange, rowIndex, field)
    },

    getScaledSparklineValues(params, yLimit) {
      switch (typeof yLimit) {
        case 'string': // handle as a column
          return this.buildScaledSparklineValuesByRow(params, yLimit)
        default: // handle as array
          return this.buildScaledSparklineValuesByCol(params, yLimit)
      }
    },

    getScaledSparklineParams(params, column) {
      const { rowIndex } = params.node
      const { field } = column
      const hiddenValuesKey = String(rowIndex) + field
      const hiddenMarkerTags = this.sparklineHiddenValues[hiddenValuesKey] || []
      const { marker, tooltip, ... sparklineBaseOptions } = (column.sparkline.config || {}) 
      return {
        sparklineOptions: {
          type: column.sparkline.chart_type,
          tooltip: {
            renderer: (params) => {
              const { xValue, yValue } = params
              // column.field cannot be used when this function is called
              // the entire dictionary must be searched for an occurrence 
              // of the x,y value pair passed to the function. 
              // TODO - Write custom Sparkline Cell Renderer 
              if (this.isScaleTooltip(xValue, yValue) === true) { 
                return {
                  title: 'Scale',
                  content: yValue,
                }
              } else if (xValue === 0) {
                return {
                  title: null,
                  content: yValue
                }
              }

              return tooltip || {
                  title: xValue,
                  content: yValue,
              }
            },
          },
          marker: {
            formatter: (params) => {
              const { xValue, yValue } = params
              const tag = this.toSparklineTag(rowIndex, field, xValue, yValue)
             if (hiddenMarkerTags.indexOf(tag) !== -1) {
                 return {
                      size: 0,
                      fill: 'rgba(255, 99, 71, 0)', //transparent
                      stroke: 'rgba(255, 99, 71, 0)', //transparent
                      strokeWidth: 0,
                  }
              }
              return marker
            }
          },
          ... sparklineBaseOptions
        }
      }
    },
     
    getRowStyle (params) {
      if (!params.data) return {}
      return params.data.__agGridFormatting.rowStyle
    },
    getCellStyle (params) {
      const field = params.colDef.field
      const customStyle = params.data.__agGridFormatting.cellStyles[field] || {}
      const defaultStyle = this.columnById[field].style || {}
      return {...defaultStyle, ...customStyle}
    },
    getCellClasses (params) {
      const field = params.colDef.field
      const rowClasses = params.data.__agGridFormatting.cellClasses[field] || []
      const defaultClasses = this.columnById[field].classes || []
      const classes = [...rowClasses, defaultClasses]
      if (params.colDef.type === 'numericColumn') {
        classes.push('ag-right-aligned-cell')
      }
      return classes
    },
    async scrollToRow (event) {
      if (event.table_id !== this.config.id) return
      const query = {[event.field]: event.value}
      const rowIndex = _.findIndex(this.rowData, query)

      if (rowIndex === -1) return
      const nodeId = rowIndex.toString()

      // Need to give framework a little delay in case the table isn't in view yet when the
      // request is made.
      await new Promise(resolve => setTimeout(resolve, 200))

      const api = this.$refs.agGrid.gridOptions.api
      api.ensureNodeVisible(node => {
        return node.id === nodeId
      }, 'top')
      if (event.open_detail) {
        api.getRowNode(nodeId).setExpanded(true)
      }
    },
    getContextMenuItems (params) {
      const eventHandlers = this.getEventHandlers('context-menu', params.value)
      const ehOptions = eventHandlers.map(eh => ({
        name: eh.label,
        action: this.triggerContextMenuEventHandler.bind(this, eh, params)
      }))

      if (ehOptions.length) {
        ehOptions.push('separator')
      }
      return [...ehOptions, ...params.defaultItems]
    },
    triggerContextMenuEventHandler (eventHandler, params) {
      const data = {
        componentId: this.config.id,
        eventType: 'context-menu',
        sourceType: this.config.type,
        eventHandler,
        data: {
          state: this.getCurrentState(),
          rowData: params.node.data,
          rowIndex: parseInt(params.node.id),
          field: params.value
        }
      }
      const emitArgs = {
        eventHandlers: [data],
        event: null,
        component: this
      }
      this.callbackEventBus.emit(emitArgs)
    },
    getEventHandlers (event, target) {
      let eventHandlers = this.config.event_handlers.filter(eh => eh.events.some(e => e === event))
      if (target) {
        eventHandlers = eventHandlers.filter(eh => !eh.targets || eh.targets.some(t => t === target))
      }
      return eventHandlers
    },
    initializeGrid () {
      this.resizeColumns()
      if (this.config.default_state) {
        this.ignoreNextSetStateEvent = true
        this.setState(this.config.default_state)
        // It is possible that setting the default state
        // will not trigger a state change event
        this.ignoreNextSetStateEvent = false
      }
      this.initialState = visualizationUtils.deepFreeze(this.getCurrentState())
    },
    resizeColumns () {
      const api = this.$refs.agGrid.gridOptions.columnApi
      const fieldIds = this.columnDefs.filter(cd => !cd.width).map(cd => cd.field)
      if (this.config.column_sizing === 'auto_size') {
        api.autoSizeColumns(fieldIds)
      }
    },
    
    onFilterChanged () {
      this.onStateChange('filterChanged')
    },

    onColumnMoved (event) {
      this.dragEvent = {type: 'columnMoved', event}
    },
    
    onDragStopped () {
      // Radu found a "bug" where dragging the column back and forth and placing in the
      // same location will trigger the state change event. I am choosing to ignore this.
      if (_.isNil(this.dragEvent)) return

      const dragEvent = this.dragEvent
      this.dragEvent = null

      if (dragEvent.type === 'columnMoved') {
        this.onStateChange('columnMoved')
      }
    },
    onSortChanged () {
      this.onStateChange('sortChanged')
    },
    onColumnPinned () {
      this.onStateChange('columnPinned')
    },
    onColumnVisible () {
      this.onStateChange('columnVisible')
    },
    onStateChange (eventType) {
      const shouldIgnore = this.ignoreNextSetStateEvent
      this.ignoreNextSetStateEvent = false

      if (shouldIgnore) return

      const currentState = this.getCurrentState()
      const stateChangeHandlers = this.getEventHandlers('state-change', eventType)

      if (stateChangeHandlers.length) {
        const data = stateChangeHandlers.map(eh => ({
          componentId: this.config.id,
          eventType: 'state-change',
          sourceType: this.config.type,
          eventHandler: eh,
          data: {
            state: currentState,
            event: eventType
          }
        }))

        const emitArgs = {
          eventHandlers: data,
          event: null,
          component: this,
        }
        this.callbackEventBus.emit(emitArgs)
      }
    },
    convertQueryExpressionToFilter (expression) {
      if (expression.children) {
        const condition1 = this.convertQueryExpressionToFilter(expression.children[0])
        const condition2 = this.convertQueryExpressionToFilter(expression.children[1])
        return {
          operator: expression.operator.toUpperCase(),
          condition1,
          condition2
        }
      } else {
        const filter = {
          type: invertedOperatorOverride[expression.operator] || expression.operator,
        }

        const isDate = this.dateColumns.has(expression.value1.value)
        const isRange = expression.operator === 'between'
        if (isDate && isRange ) {
          filter.dateFrom = expression.value2.value[0]
          filter.dateTo = expression.value2.value[1]
        } else if (isDate) {
          filter.dateFrom = expression.value2.value
        } else if (isRange) {
          filter.filter = expression.value2.value[0]
          filter.filterTo = expression.value2.value[1]
        } else {
          filter.filter = expression.value2.value
        }
        return filter
      }
    },
    convertFilterToQueryExpression (field, filter) {
      if (filter.operator) {
        const con1 = this.convertFilterToQueryExpression(field, filter.condition1)
        const con2 = this.convertFilterToQueryExpression(field, filter.condition2)
        return {
          type: 'query_expression',
          operator: filter.operator.toLowerCase(),
          children: [con1, con2]
        }
      } else {
        // TODO fix value type
        const valueType = filter.filterType
        const value = this.getFilterValue(filter)
        return {
          'type': 'query_expression',
          'operator': operatorOverride[filter.type] || filter.type,
          'value1': {'type': 'column', 'value': field},
          'value2': {'type': 'literal', 'value': value, 'value_type': valueType}
        }
      }
    },
    getFilterValue (filter) {
      let v1, v2
      if (filter.filterType === 'date') {
        v1 = filter.dateFrom
        v2 = filter.dateTo
      } else {
        v1 = filter.filter
        v2 = filter.filterTo
      }
      return filter.type === 'inRange' ? [v1, v2] : v1
    },
    parseDate (dateStr) {
      if (!dateStr) return null

      const [year, month, day] = dateStr.slice(0, 10).split('-')
      return `${month}/${day}/${year}`
    },
    onSetStateEvent (event) {
      if (event.table_id !== this.config.id) return
      if (!event.trigger_event) {
        this.ignoreNextSetStateEvent = true
      }
      this.setState(event.state)
      // It is possible that setting the state will not
      // trigger a state change event.
      this.ignoreNextSetStateEvent = false
    },
    setState (state) {
      const gridOptions = this.$refs.agGrid.gridOptions
      const convertedState = this.convertToAgGridState(state)
      gridOptions.columnApi.applyColumnState({ state: convertedState.columnState, applyOrder: true })
      gridOptions.api.setFilterModel(convertedState.filters)
    },
    convertToAgGridState (state) {
      // As of AgGrid version 26.2.1, the AgGrid library takes care of column state mismatches.
      // This is what happens in the following scenarios:
      // 1. Extra columns not in table: These columns are ignored.
      // 2. Columns not in state but in table: The extra columns in the table will be
      //    merged into the state after the columns in the state.
      // 3. Filters for missing columns: Filters for missing columns are ignored by AgGrid and
      //    will not be set in its internal state. Other filters will still be applied.
      const currentState = this.getCurrentState()

      const sortLookup = {}
      const sortArgs = state.sort_args || currentState.sort_args
      sortArgs.forEach((sa, index) => {
        sortLookup[sa.field] = {index, sort: sa.ascending ? 'asc' : 'desc'}
      })

      const columns = state.columns || currentState.columns
      const currentColumnStateLookup = currentState.columns.reduce((agg, colState) => {
        agg[colState.field] = colState
        return agg
      }, {})

      const columnState = columns.map(c => {
        const colSort = sortLookup[c.field] || {index: null, sort: null}
        const oldstate = currentColumnStateLookup[c.field] || {}
        return this.getMergedColumnState(c, oldstate, colSort)
      })

      const expressions = state.filters || currentState.filters
      const filters = expressions.reduce((agg, exp) => {
        const fieldId = exp.children ? exp.children[0].value1.value : exp.value1.value
        agg[fieldId] = this.convertQueryExpressionToFilter(exp)
        return agg
      }, {})

      return { columnState, filters }
    },
    getMergedColumnState (newState, oldState, colSort) {
      return {
          colId: newState.field,
          width: this.getMergedColStateValue(newState.width, oldState.width),
          hide: this.getMergedColStateValue(newState.hide, oldState.hide),
          pinned: this.getMergedColStateValue(newState.pinned, oldState.pinned),
          flex: this.getMergedColStateValue(newState.flex, oldState.flex),
          sortIndex: colSort.index,
          sort: colSort.sort
        }
    },
    getMergedColStateValue (newValue, oldValue) {
      return _.isNil(newValue) ? oldValue : newValue
    },
    getCurrentState () {
      const gridOptions = this.$refs.agGrid.gridOptions
      const rawColumnState = gridOptions.columnApi.getColumnState()
      const rawFilterState = gridOptions.api.getFilterModel()
      const sortArgs = _.orderBy(rawColumnState.filter(cs => !_.isNil(cs.sortIndex)), 'sortIndex').map(cs => ({field: cs.colId, ascending: cs.sort === 'asc'}))
      const columnState = rawColumnState.map(cs => ({
        field: cs.colId,
        width: cs.width,
        hide: cs.hide,
        pinned: cs.pinned,
        flex: cs.flex
      }))
      const filters = Object.keys(rawFilterState).map(field => this.convertFilterToQueryExpression(field, rawFilterState[field]))
      return { columns: columnState, filters, sort_args: sortArgs }
    },
    getRows (event) {
      
      const {startRow, endRow} = event.request
      const currentState = this.getCurrentState()

      if (this.canUseLocalData(endRow, currentState)) {
        event.success({rowData: this.rowData.slice(startRow, endRow)})
        return
      }
      const loadHandlers = this.getEventHandlers('load-rows')
      if (!loadHandlers.length) {
        throw new Error(
          'AgGrid invoked getRows without and load-rows event handlers, this should be impossible.')
      }

      const eventHandlerCallback = (callbackData) => {
        if (callbackData.type === 'agGridLoadRows') {
          const {rows, cell_styles, cell_classes, row_styles} = callbackData.data
          let newRowData = this.mergeRowData(rows, cell_styles, cell_classes, row_styles)
          const successData = {rowData: newRowData}
          // If we do not add row count then we get an loading spinners forever.
          // AgGrid doesn't know that zero results means there are no more results
          if (newRowData.length < (endRow - startRow)) {
            const dispCount = this.$refs.agGrid.gridOptions.api.getDisplayedRowCount()
            // Need to subract one to handle the loading row.
            successData.rowCount = (dispCount + newRowData.length) - 1
          } else {
            successData.rowCount = null
          }

          event.success(successData)
        }
      }

      const data = loadHandlers.map(eh => ({
        componentId: this.config.id,
        eventType: 'load-rows',
        sourceType: this.config.type,
        eventHandler: eh,
        onComplete: eventHandlerCallback,
        onError: event.fail,
        data: {
          state: currentState,
          first: startRow,
          limit: endRow - startRow
        }
      }))

      const emitArgs = {
        eventHandlers: data,
        event: null,
        component: this
      }
      this.callbackEventBus.emit(emitArgs)
    },
    canUseLocalData (endRow, currentState) {
      if (endRow > this.rowData.length) return false
      if (!_.isEqual(currentState.filters, this.initialState.filters)) return false
      if (!_.isEqual(currentState.sort_args, this.initialState.sort_args)) return false

      return true
    },
    mergeRowData (rowData, cellStyles, cellClasses, rowStyles) {
      const fmtCellStyles = this.formatCellProperties(cellStyles, rowData.length, {})
      const fmtCellClasses = this.formatCellProperties(cellClasses, rowData.length, [])
      let fmtRowStyle = _.isNil(rowStyles) ?  _.range(length).map(() => ({})) : rowStyles

      return _.zip(rowData, fmtCellStyles, fmtCellClasses, fmtRowStyle).map(zipped => ({
        ...zipped[0],
        __agGridFormatting: {
          cellStyles: zipped[1],
          cellClasses: zipped[2],
          rowStyle: zipped[3]
        }
      }))
    },
    formatCellProperties (cellProperties, length, defaultValue) {
      const fmtProps = _.range(length).map(() => ({}))
      if (_.isNil(cellProperties) || _.isEmpty(cellProperties)) return fmtProps
      Object.keys(cellProperties).forEach(field => {
        cellProperties[field].forEach((value, index) => {
          fmtProps[index][field] = _.isNil(value) ? defaultValue : value
        })
      })
      return fmtProps
    }
  },
  mounted () {
    this.onStateChange = _.debounce(this.onStateChange.bind(this), 300)
    // Need to debounche getRows since set filters and set column state will
    // trigger getRows
    this.getRows = _.debounce(this.getRows.bind(this), 25)
    this.scrollToRow = this.scrollToRow.bind(this)
    this.componentEventBus.$on('agGridScrollToRow', this.scrollToRow)
    this.onSetStateEvent = this.onSetStateEvent.bind(this)
    this.componentEventBus.$on('agGridSetState', this.onSetStateEvent)
    this.initializeGrid()
  },
  destroyed () {
    this.componentEventBus.$off('agGridScrollToRow', this.scrollToRow)
    this.componentEventBus.$off('agGridSetState', this.onSetStateEvent)
  }
}
</script>

<style scoped>

</style>

<style>
</style>