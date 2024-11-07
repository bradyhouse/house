
import { Dropdown } from './dropdown/dropdown.options';


export interface PanelMenuEvent {
    /**
     * The type of event.
     */
    type?: string | number;

    /**
     * Data that is emitted.
     */
    data?: any;

    /**
     * grid state -- optional parameter used by ag-grid
     */
     gridState?: any;
  }

export interface PanelMenu {
  /**
   * Full screen toggle icon.
   */
  fullScreen?:boolean;

  /**
   * Collapse/expand toggle icon.
   */
  collapse?:boolean;

  /**
   * Close icon.
   */
  close?:boolean;

  /**
   * Loader animation.
   */
  loader?:boolean;

  /**
   * Info icon with a tooltip that shows additional info.
   */
  info?:string;

  /**
   * Export icon with a tooltip that shows additional info.
   */
   export?:string;

  /**
   * Dropdown options.
   */
  dropdown?:Dropdown[];

  /**
   * This is needed if we want to dynamically reference an option.
   */
  [key: string]:any;
}


export class DropDownItemTypeEnum {
  /**
   * Reloads the data inside the panel.
   * @type {string}
   */
  static Reload = 'reload';

  /**
   * Exports the data
   * @type {string}
   */
  static Export = 'export';

  /**
   * Resets the state
   * @type {string}
   */
  static Reset = 'reset';

  /**
   * Show available columns.
   * @type {string}
   */
  static Columns = 'columns';

  /**
   * Enable filtering header.
   * @type {string}
   */
  static Filter = 'filter';

  /**
   * Enable filtering header.
   * @type {string}
   */
  static Unfilter = 'unfilter';

}


export class DropdownItemEnum {
  /**
   * Reloads the data inside the panel.
   * @type {{id: string, text: string}}
   */
  static Reload = {
    id: DropDownItemTypeEnum.Reload,
    text: 'Reload',
    cssClass: 'reload'
  };

  /**
   * Resets the state
   * @type {{id: string, text: string}}
   */
  static Reset = {
    id: DropDownItemTypeEnum.Reset,
    text: 'Reset',
    cssClass: 'reset'
  };

  /**
   * Exports the data as CSV
   * @type {{id: string, text: string, param: string}}
   */
  static Export = {
    id: DropDownItemTypeEnum.Export,
    text: 'Export',
    cssClass: 'export'
  };

  /**
   * Enable grid quick filter header
   * @type {{id: string, text: string, param: string}}
   */
  static Filter = {
    id: DropDownItemTypeEnum.Filter,
    text: 'Filter',
    cssClass: 'filter'
  };

  /**
   * Disable grid quick filter header
   * @type {{id: string, text: string, param: string}}
   */
  static Unfilter = {
    id: DropDownItemTypeEnum.Unfilter,
    text: 'Unfilter',
    cssClass: 'unfilter'
  };

}