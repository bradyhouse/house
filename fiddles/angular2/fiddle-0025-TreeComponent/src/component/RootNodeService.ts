import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {User} from '../models';
import {TreeNode} from './TreeNode';


export class RootNodeService {

    _root: TreeNode;

    set root(value) {
        this._root = value;
    }
    get root() {
        return this._root;
    }


}