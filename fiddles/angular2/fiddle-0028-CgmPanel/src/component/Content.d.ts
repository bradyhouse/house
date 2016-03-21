import { DataJsonApi } from './DataJsonApi';
export declare class ContentController {
    private dataJsonApi;
    _selectedNodes: String[];
    constructor(dataJsonApi: DataJsonApi);
    configureGrid(): void;
    parseColumns(rec: any): any[];
    onTreeNodeCheckChange(event: any): void;
    treeHeight: number;
    selectedNodes: String[];
    gridOptions: {
        enableFilter: boolean;
        enableColResize: boolean;
        rowSelection: string;
        enableSorting: boolean;
    };
    gridHeight: number;
}
