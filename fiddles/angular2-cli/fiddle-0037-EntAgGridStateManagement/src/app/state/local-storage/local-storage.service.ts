import {
  Injectable
} from '@angular/core';
import {
  StateServiceInterface
} from '../state';
import {
  LocalStorageOptionsInterface, LocalStorageServiceInterface
} from './local-storage';

import { List } from 'immutable';


@Injectable()
export class LocalStorageService implements LocalStorageServiceInterface {

  params: any;
  options: LocalStorageOptionsInterface;
  isLocalStorageSupported: boolean;

  constructor() {
    this.params = new Map();
    this.options = <LocalStorageOptionsInterface> {
        appKey: 'fiddle',
        blackList: []
    };
    if (window.localStorage) {
      this.isLocalStorageSupported = true;
    }
  }

  read() {
    if (this.isLocalStorageSupported) {
      // tslint:disable-next-line: forin
      Object.keys(window.localStorage).forEach((key: string) => {
        const value: any = this.getItem(key);
        if (value !== null && value !== undefined) {
          this.params[key] = value;
        }
      });
      console.log('params', this.params);
    }
  }

  updateStateService(key: string, stateService: StateServiceInterface) {
    this.params.set(key, this.getItem(key));
    if (key !== this.options.appKey) {
      stateService.isReady = false;
    }
    console.log('key', key);
    console.log ('this.params.get(key)', this.params.get(key));
    // tslint:disable-next-line: forin
    for (const state in this.params.get(key)) {
      console.log('updateStateService', state);
      const privateKey: string = '_' + state;
      if (privateKey in stateService && state !== 'type') {
        console.log('updateStateService > privateKey', privateKey);
        const isValid: boolean = this.options.blackList.indexOf(state) === -1;

        if (isValid) {
          let value: any = this.params.get(key)[state];
          console.log('updateStateService', value);
          if (stateService.hasOwnProperty(privateKey)) {
            if (stateService[privateKey] && stateService[privateKey].constructor === List) {
              if (!value || value.constructor !== Array) {
                value = [];
              }
              stateService[privateKey] = List(value);
            } else {
              stateService[privateKey] = value;
            }
          }
        } else {
          delete this.params[key][state];
        }
      }
    }
    if (key !== this.options.appKey) {
      stateService.isReady = true;
    }
  }

  write(key: string, value: any, stateType: string) {
    if (!this.params.has(stateType)) {
      this.params[stateType] = {};
    }
    this.params.set(stateType, value);
    this.setItem(stateType, this.params.get(stateType));
  }

  clear(stateType: string) {
    this.params.set(stateType, {});
    this.setItem(stateType, this.params.get(stateType));
  }

  private getItem(key: string) {
    let value: any;

    if (this.isLocalStorageSupported) {
      if (window.localStorage[key]) {
        try {
          value = JSON.parse(window.localStorage[key]);
        } catch (e) {
          value = {};
        }
      }
    }

    return value;
  }

  private setItem(key: string, value: any) {
    if (this.isLocalStorageSupported) {
      window.localStorage[key] = JSON.stringify(value);
    }
  }

}
