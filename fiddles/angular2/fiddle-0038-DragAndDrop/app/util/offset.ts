import {Injectable} from '@angular/core';
import Injectable = ng.Injectable;

@Injectable()
export interface OffsetInterface {
    x:number;
    y:number;
    copy?():OffsetInterface;
    copyFrom?(offset:OffsetInterface):void;
    toString?():string;
    equals?(offset:OffsetInterface):boolean;
    round?(to:any):void;
    isZero?():boolean;
}


export class Offset implements OffsetInterface{
    x:number;
    y:number;

    static fromObject(offset:OffsetInterface) {
        return new Offset(offset.x, offset.y);
    }

    constructor(x:number, y:number) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;
    }

    copy():OffsetInterface {
       return new Offset(this.x, this.y);
    }

    copyFrom(offset:OffsetInterface):void {
        this.x = offset.x;
        this.y = offset.y;
    }

    toString():string {
        return "Offset[" + this.x + "," + this.y + "]";
    }

    equals(offset:OffsetInterface):boolean {
        return (this.x == offset.x && this.y == offset.y);
    }

    round(to:any):void {
        if (!isNaN(to)) {
            let factor = Math.pow(10, to);
            this.x = Math.round(this.x * factor) / factor;
            this.y = Math.round(this.y * factor) / factor;
        } else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
    }

    isZero():boolean {
        return this.x == 0 && this.y == 0;
    }

}