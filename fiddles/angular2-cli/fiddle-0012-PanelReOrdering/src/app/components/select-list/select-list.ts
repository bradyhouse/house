export interface SelectListData {

  /**
   * Unique identifier.
   */
  id?: number;

  /**
   * id using for sorting the list.
   */
  order?: number;

  /**
   * The text which will be displayed.
   */
  text?: string;

  /**
   * Tells the select2 component that it is a new option.
   */
  newOption?: boolean;

  /**
   * Any additional properties that are not needed for the component to be rendered but are needed for external uses
   */
  properties?: any;

  /**
   * Class that will be applied to the html option.
   */
  className?: string;
}


export interface SelectListOptions {

  /**
   * Data which will render the options.
   */
  data?: SelectListData[];

  /**
   * Tells which options are selected.
   */
  value?: any;

  /**
   * Hides the search box from the dropdown.
   */
  isHideSearchBox?: boolean;

  /**
   * Disables the component so that the user can't interact with.
   */
  isDisabled?: boolean;

  /**
   * Allows the user to select multiple options.
   */
  isMultiSelect?: boolean;

  /**
   * Will filter out the list so that a selected option will be removed from the dropdown.
   */
  isFilterSelectedOptions?: boolean;

  /**
   * Allows the user to enter a custom value into the search box.
   */
  isManualEntry?: boolean;

  /**
   * Callback function used to format the manual entry.
   */
  manualEntry?: Function;

  /**
   * The width of the dropdown component.
   */
  width?: number;

  /**
   * Text which will display when no options are selected.
   */
  placeholder?: string;

  /**
   * This is needed if we want to dynamically reference an option
   */
  [key: string]: any;
}
