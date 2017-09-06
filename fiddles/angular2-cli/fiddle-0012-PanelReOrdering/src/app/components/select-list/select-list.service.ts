import { Injectable } from '@angular/core';
import {
  SelectListOptions,
  SelectListData
} from './index';

declare let jQuery:any;
declare let _:any;

@Injectable()
export class SelectListService {

  constructor() { }

  getSelect2Options(options:SelectListOptions) {
    let selectOptions:any = {};
    for (let key in options) {
      let property:any = options[key];
      if (property !== null && property !== undefined) {
        switch (key) {
          case 'isHideSearchBox':
            selectOptions.minimumResultsForSearch = -1;
            break;
          case 'width':
            selectOptions.width = property;
            break;
          case 'placeholder':
            selectOptions.placeholder = property;
            if (!options.isMultiSelect) {
              selectOptions.allowClear = true;
            }
            break;
          case 'manualEntry':
            selectOptions.createTag = property;
            break;
          case 'isMultiSelect':
            selectOptions.multiple = property;
            break;
          case 'isManualEntry':
            selectOptions.tags = property;
            break;
        }
      }
    }

    selectOptions.templateResult = this.templateResult;

    return selectOptions;
  }

  getValidatedValue(options:SelectListOptions) {
    let value:any = options.value;

    if (options.isMultiSelect) {
      let validValue:string[] = [];

      if (value) {
        value.forEach((item:string) => {
          if (_.find(options.data, {id: item})) {
            validValue.push(item);
          }
        });
      }

      if (validValue.length !== value.length) {
        value = validValue;
      }
    } else {
      if (!_.find(options.data, {id: value})) {
        if (!options.placeholder && options.data[0] !== undefined) {
          value = options.data[0].id;
        }
      }
    }

    return value;
  }

  filterSelectedOptions(options:SelectListOptions):SelectListData[] {
    let data:SelectListData[] = [];

    if (options.data) {
      data = options.data.filter((item:SelectListData) => {
        return !options.value || (options.value && options.value.indexOf(item.id) === -1);
      });
    }

    return data;
  }

  private templateResult(data:any) {
    let template:any = data.text;
    if (data.element && data.element.className) {
      template = jQuery('<span class="' + data.element.className + '">' + data.text + '</span>');
    }
    return template;
  }

}
