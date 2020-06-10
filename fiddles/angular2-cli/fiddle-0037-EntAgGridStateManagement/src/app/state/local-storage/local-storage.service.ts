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

  params: Map<string, any>;
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
    } else {
      console.warn('Local Storage is not supported');
    }
  }

  read() {
    if (this.isLocalStorageSupported) {
      Object.keys(window.localStorage).forEach((key: string) => {
        const value: any = this.getItem(key);
        if (value !== null && value !== undefined) {
          this.params[key] = value;
        }
      });
    }
  }

  updateStateService(key: string, stateService: StateServiceInterface) {
    this.params.set(key, this.getItem(key));
    if (key !== this.options.appKey) {
      stateService.isReady = false;
    }
    const state = this.params.get(key);
    if (state && state !== undefined && Object.entries(state).length) {
      Object.keys(state).forEach((property: string) => {
        const privateProperty: string = '_' + property;
        if (privateProperty in stateService && property !== 'type') {
          const isValid: boolean = this.options.blackList.indexOf(property) === -1;
          if (isValid) {
            let value: any = state[property];
            if (stateService.hasOwnProperty(privateProperty)) {
              if (stateService[privateProperty] && stateService[privateProperty].constructor === List) {
                if (!value || value.constructor !== Array) {
                  value = [];
                }
                stateService[privateProperty] = List(value);
              } else {
                stateService[privateProperty] = value;
              }
            }
          }
        }
      });
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
