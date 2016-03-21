import {Injectable} from "angular2/core";
import {JsonDataService} from "./JsonDataService";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {RawData} from "../model/RawData";
import {TreeNode} from "../model/TreeNode";
import {List} from 'immutable';
import {asObservable} from "./asObservable";
import {BehaviorSubject} from "rxjs/Rx";
import * as meta from '../meta';

@Injectable()
export class JsonDataStore {

    private _data:BehaviorSubject<List<RawData>> = new BehaviorSubject(List([]));

    constructor(private jsonDataService:JsonDataService) {
        this.loadRawData();
    }
    get data() {
        return asObservable(this._data);
    }

    get root() {
        return this._root;
    }

    loadRawData() {
        this.jsonDataService.request("data.json")
            .subscribe(
                res => {
                    let nodes = (<Object[]>res.json()).map((node:any) =>
                        new RawData({title: node.title, children: node.children}));
                    this._data.next(List(nodes));
                },
                err => console.log("Error retrieving data")
            );
    }


}
