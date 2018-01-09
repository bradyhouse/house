
import { DataService } from './data-service';

export interface Options {
  width: number;
  height: number;
  chartType?: string;
  title?: string;
  dataService?: DataService;
  loaded?: boolean;
}
