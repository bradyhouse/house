
export class Util {

    static get radianToDegreeConstant():number {
        return 180 / Math.PI;
    }

    static constrain(num:number, min:number, max:number):number {
        let x = parseFloat(num);
        if (min === null) {
            min = num;
        }
        if (max === null) {
            max = num;
        }
        return (x < min) ? min : ((x > max) ? max : x);
    }

}