import { AgTreeGridOptions } from './ag-tree-grid-options';
import { AgTreeGridEvent } from './ag-tree-grid-event';

export interface AgTreeGridImpl {

  options: AgTreeGridOptions;

  AgTreeGridOnEvent(event: AgTreeGridEvent): void;

}
