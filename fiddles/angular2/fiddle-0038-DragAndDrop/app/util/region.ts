import {Injectable} from '@angular/core';
import Injectable = ng.Injectable;
import {OffsetInterface, Offset} from './offset';
import {Util} from './util';

@Injectable()
export interface RegionInterface {
    isRegion:boolean;
    x:number;
    y:number;
    top:number;
    bottom:number;
    left:number;
    right:number;
    contains?(region:RegionInterface):boolean;
    intersect?(region:RegionInterface):boolean;
    union?(region:RegionInterface):RegionInterface;
    constrainTo?(region:RegionInterface):RegionInterface;
    adjust?(top:number, right:number, bottom:number, left:number):RegionInterface;
    getOutOfBoundOffset?(axis:string, offset:OffsetInterface):any;
    getOutOfBoundOffsetX?(offset:OffsetInterface):number;
    getOutOfBoundOffsetY?(offset:OffsetInterface):number;
    isOutOfBound?(axis:string, offset:OffsetInterface):boolean;
    isOutOfBoundX?(offset:OffsetInterface):boolean;
    isOutOfBoundY?(offset:OffsetInterface):boolean;
    restrict?(axis:string, offset:OffsetInterface, factor:number):OffsetInterface;
    restrictX?(x:number,factor:number):number;
    restrictY?(y:number,factor:number):number;
    getSize?():Object;
    copy?():RegionInterface;
    copyFrom?(region:RegionInterface):RegionInterface;
    toString?():string;
    translateBy?(x:number, y:number):RegionInterface;
    round?():RegionInterface;
    equals?(region:RegionInterface):boolean;
}


export class Region implements RegionInterface{

    isRegion:boolean;
    x:number;
    y:number;
    top:number;
    bottom:number;
    left:number;
    right:number;

    static from(region:RegionInterface):Region {
        return new Region(region.top, region.right, region.bottom, region.left);
    }

    contains(region:RegionInterface):boolean {
        return (region.x >= this.x &&
        region.right <= this.right &&
        region.y >= this.y &&
        region.bottom <= this.bottom);
    }

    intersect(region:RegionInterface):boolean {
        let t = Math.max(this.y, region.y),
            r = Math.min(this.right, region.right),
            b = Math.min(this.bottom, region.bottom),
            l = Math.max(this.x, region.x);

        if (b > t && r > l) {
            return true;
        }
        else {
            return false;
        }
    }

    union(region:RegionInterface):RegionInterface {
        let t = Math.min(this.y, region.y),
            r = Math.max(this.right, region.right),
            b = Math.max(this.bottom, region.bottom),
            l = Math.min(this.x, region.x);

        return new Region(t, r, b, l);
    }

    constrainTo(region:RegionInterface):RegionInterface {
        this.top = this.y = Util.constrain(this.top, region.y, region.bottom);
        this.bottom = Util.constrain(this.bottom, region.y, region.bottom);
        this.left = this.x = Util.constrain(this.left, region.x, region.right);
        this.right = Util.constrain(this.right, region.x, region.right);
        return this;
    }

    adjust(top:number, right:number, bottom:number, left:number):RegionInterface {
        this.top = this.y += top;
        this.left = this.x += left;
        this.right += right;
        this.bottom += bottom;
        return this;
    }

    getOutOfBoundOffset(axis:string, offset:OffsetInterface):any {
        switch(axis) {
            case 'x'| 'X':
                return this.getOutOfBoundOffsetX(offset);
                break;
            case 'y'| 'Y':
                return this.getOutOfBoundOffsetY(offset);
                break;
            default:
                return new Offset(this.getOutOfBoundOffsetX(offset), this.getOutOfBoundOffsetY(offset));
                break;
        }
    }

    getOutOfBoundOffsetX(offset:OffsetInterface):number {
        if (offset.x <= this.x) {
            return this.x - offset.x;
        } else if (offset.x >= this.right) {
            return this.right - offset.x;
        }
        return 0;
    }

    getOutOfBoundOffsetY(offset:OffsetInterface):number {
        if (offset.y <= this.y) {
            return this.y - offset.y;
        } else if (offset.y >= this.bottom) {
            return this.bottom - offset.y;
        }
        return 0;
    }

    isOutOfBound(axis:string, offset:OffsetInterface):boolean {
        switch(axis) {
            case 'x' | 'X':
                return this.isOutOfBoundX(offset);
                break;
            case 'y' | 'Y':
                return this.isOutOfBoundY(offset);
                break;
            default:
                return (this.isOutOfBoundX(offset) || this.isOutOfBoundY(offset));
                break;
        }
    }

    isOutOfBoundX(offset:OffsetInterface):boolean {
        return (offset.x < this.x || offset.x > this.right);
    }

    isOutOfBoundY(offset:OffsetInterface):boolean {
        return (offset.y < this.y || offset.y > this.bottom);
    }

    restrict(axis:string, offset:OffsetInterface, factor:number):OffsetInterface {
        let newOffset:Offset = offset.copy();
        switch(axis) {
            case 'x'|'X':
                newOffset.x = this.restrictX(offset.x, factor);
                break;
            case 'y'|'Y':
                newOffset.y = this.restrictY(offset.y, factor);
                break;
            default:
                newOffset.x = this.restrictX(offset.x, factor);
                newOffset.y = this.restrictY(offset.y, factor);
                break;
        }
        return newOffset;
    }

    restrictX(x:number, factor:number):number {
        if (!factor) {
            factor = 1;
        }

        if (x <= this.x) {
            x -= (x - this.x) * factor;
        }
        else if (x >= this.right) {
            x -= (x - this.right) * factor;
        }
        return x;
    }

    restrictY(y:number, factor:number):number {
        if (!factor) {
            factor = 1;
        }

        if (y <= this.y) {
            y -= (y - this.y) * factor;
        }
        else if (y >= this.bottom) {
            y -= (y - this.bottom) * factor;
        }
        return y;
    }

    getSize():Object {
        return {
            width: this.right - this.x,
            height: this.bottom - this.y
        };
    }

    copy():RegionInterface {
        return new Region(this.y, this.right, this.bottom, this.x);
    }

    copyFrom(region:RegionInterface):RegionInterface {
        this.top = this.y = region.y;
        this.right = region.right;
        this.bottom = region.bottom;
        this.left = this.x = region.x;
        return this;
    }

    toString():string {
        return "Region[" + this.top + "," + this.right + "," + this.bottom + "," + this.left + "]";
    }

    translateBy(x:number, y:number):RegionInterface {
        this.top = this.y += y;
        this.right += x;
        this.bottom += y;
        this.left = this.x += x;
        return this;
    }

    round():RegionInterface {
        this.top = this.y = Math.round(this.y);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = this.x = Math.round(this.x);
        return this;
    }

    equals(region:RegionInterface):boolean {
        return (this.top === region.top && this.right === region.right && this.bottom === region.bottom && this.left === region.left);
    }

    constructor(top:number, right:number, bottom:number, left:number) {
        this.y = this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.x = this.left = left;
    }

}