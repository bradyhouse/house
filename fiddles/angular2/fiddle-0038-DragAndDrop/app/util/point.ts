import {Offset, OffsetInterface} from './offset';
import {Region, RegionInterface} from './region';
import {Util} from './util';

export interface PointInterface {
    x:number;
    y:number;
    origin?():PointInterface;
    clone?():PointInterface;
    toString?():string;
    equals?(point:PointInterface):boolean;
    isCloseTo?(point:PointInterface, threshold:number);
    isContainedBy?(region:RegionInterface):boolean;
    roundedEquals?(point:PointInterface):boolean;
    getDistanceTo?(point:PointInterface):number;
    getAngleTo?(point:PointInterface):number;
}


export class Point extends Region implements PointInterface {


    origin():PointInterface {
        return {
            x: 0,
            y: 0
        }
    }

    clone():PointInterface {
        return new Point (this.x, this.y);
    }

    toString():string {
        return "Point[" + this.x + "," + this.y + "]";
    }

    equals(point:PointInterface):boolean {
        return (this.x === point.x && this.y === point.y);
    }

    isCloseTo(point:PointInterface, threshold:number) {
        return this.getDistanceTo(point) <= threshold;
    }

    isContainedBy(region:RegionInterface):boolean {
        return region.contains(this);
    }

    roundedEquals(point:PointInterface):boolean {
        return (Math.round(this.x) === Math.round(point.x) &&
        Math.round(this.y) === Math.round(point.y));
    }

    getDistanceTo(point:PointInterface):number {
        let deltaX = this.x - point.x,
            deltaY = this.y - point.y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    getAngleTo(point:PointInterface):number {
        let deltaX = this.x - point.x,
            deltaY = this.y - point.y;
        return Math.atan2(deltaY, deltaX) * Util.radianToDegreeConstant;
    }

    constructor(x:number, y:number) {
        super(y, x, y, x);
    }

}