
export class Dictionary<T> {

    private items:Array<T> = [];

    add(key:string, value:T):void {
        this.items.push(value);
        this.items[key] = value;
    }

    getByIndex(index:number):T {
        return this.items[index];
    }

    getByKey(key:string):T {
        return this.items[key];
    }

    contains(key:string):boolean {
        return this.items[key] ? true : false;
    }


}
