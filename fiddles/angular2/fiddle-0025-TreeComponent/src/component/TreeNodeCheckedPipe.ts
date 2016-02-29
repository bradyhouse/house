import {Pipe} from 'angular2/core';

@Pipe({
    name: 'treeNodeChecked',
    pure: false
})
export class TreeNodeCheckedPipe {
    store = [];
    transform (node) {
        this.store.length = 0;
        this.store.push(...node.filter((node)=>node.checked))
        return this.store;
    }
}
