@Injectable()
class ChartViewModel {
    private _top:number;
    private _left:number;
    private _right:number;
    private _bottom:number;

    constructor(top:number, left:number, right:number, bottom:number) {
        this._top = top;
        this._left = left;
        this._right = right;
        this._bottom = bottom;
    }

    get top():number {
        return this._top;
    }

    get left():number {
        return this._left;
    }

    get right():number {
        return this._right;
    }

    get bottom():number {
        return this._bottom;
    }

    get verticalPadding():number {
        return this.top + this.bottom;
    }

    get horizontalPadding():number {
        return this.left + this.right;
    }
}