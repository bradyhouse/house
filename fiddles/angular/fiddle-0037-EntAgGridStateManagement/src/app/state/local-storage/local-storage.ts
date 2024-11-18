import { StateServiceInterface } from "../state";

export interface LocalStorageOptionsInterface {

  /**
   * List of fields (or state service attributes) that should be ignored.
   */
  blackList: string[];

  /**
   * Application layer key. Key used to store app wide settings.
   */
  appKey: string;

}

/**
 * Wrapper class for interacting with the HTML5 local storage.
 */
export interface LocalStorageServiceInterface {
    params: any;
    options: LocalStorageOptionsInterface;
    read(): void;
    updateStateService(key: string, stateService: StateServiceInterface): void;
    write(key: string, value: any, stateType: string): void;
    clear(stateType: string): void;
  }
