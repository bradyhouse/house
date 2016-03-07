import {Pipe} from 'angular2/core';

@Pipe({
    name: 'treeNodeSearch',
    pure: false
})
export class TreeNodeSearchPipe {
    store = [];
    transform (value, [queryString]) {
        this.store.length = 0;
        this.store.push(...value.filter((node)=>
            node.name.includes(queryString) ||
            node.containsName(queryString) ||
            node.parent.name.includes(queryString)
        ))
        return this.store;
    }
}
