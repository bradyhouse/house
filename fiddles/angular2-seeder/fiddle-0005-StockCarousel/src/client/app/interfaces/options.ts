
import { DataService } from './data-service';

export interface Options {
  width: number;
  height: number;
  title?: string;
  dataService?: DataService;
  loaded?: boolean;
}
