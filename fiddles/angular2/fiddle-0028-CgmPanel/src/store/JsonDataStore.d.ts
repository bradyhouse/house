import { JsonDataService } from "./JsonDataService";
import { Observable } from "rxjs/Observable";
export declare class JsonDataStore {
    private jsonDataService;
    private _data;
    constructor(jsonDataService: JsonDataService);
    data: Observable<{}>;
    root: any;
    loadRawData(): void;
}
