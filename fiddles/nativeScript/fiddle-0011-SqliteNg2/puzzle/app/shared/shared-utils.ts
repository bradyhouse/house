import "rxjs/add/operator/map";

export class SharedUtils {

    static overlay(updates:any, obj:any):any {
        for(let prop in updates){
            if (obj.hasOwnProperty(prop)) {
                obj[prop]=updates[prop];
            }
        }
        return obj;
    }

    static mapLevelDimensions(level:number):any {
        switch(level) {
            case 8:
                return {
                    cols: 10,
                    rows: 10
                }
            case 7:
                return {
                    cols: 9,
                    rows: 9
                }
            case 6:
                return {
                    cols: 8,
                    rows: 8
                }
            case 5:
                return {
                    cols: 7,
                    rows: 7
                }
            case 4:
                return {
                    cols: 6,
                    rows: 6
                }
            case 3:
                return {
                    cols: 5,
                    rows: 5
                }
            case 2:
                return {
                    cols: 4,
                    rows: 4
                }
            default:
                return {
                    cols: 3,
                    rows: 3
                }
        }
    }

    static isEven (x:number) {
        return (x % 2) == 0;
    }

    static isValid (sequence:number[]):boolean {

        let inversionCounts:number[] = [],
            inversionSum:number = 0;


        sequence.map(function (a:number, x:number, arr) {
            var inversions = arr.filter(function (b:number, y:number) {
                return y > x && b < a;
            });

            if (inversions.length) {
                inversionCounts.push(inversions.length);
            } else {
                inversionCounts.push(0);
            }
        });

        inversionCounts.map(function (cnt) {
            inversionSum += cnt;
        });

        return SharedUtils.isEven(inversionSum);
    }

    static generateSequence (min:number, max:number, count:number):number[] {

        let range:number[] = [],
            num:number = 0,
            matches:number[] = [],
            i:number = 0;

        while (i < count) {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
            matches = range.filter(function (elem:number) {
                return elem == num;
            });
            if (matches.length == 0) {
                range.push(num);
                i++;
            }
        }

        return range;
    }

    static generateGameSequence(min:number, max:number, count:number):number[] {
        var sequence:number[] = SharedUtils.generateSequence(min, max, count);
        while (!SharedUtils.isValid(sequence)) {
            sequence = SharedUtils.generateSequence(min, max, count);
        }
        return sequence;
    }

    static onCallback(args:any, fn:any, scope:any):void {
        if (typeof fn === 'function') {
            if (scope) {
                fn.apply(scope, args);
            } else {
                fn(args);
            }
        }
    }

}
