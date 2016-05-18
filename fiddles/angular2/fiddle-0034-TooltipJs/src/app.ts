
@Component({
    selector: 'app',
    template: `
        <div class="container left">
            <tooltip
                    [options]="tooltipOptions"
            ></tooltip>
            <span *ngFor="#node of nodes">
                <p (mouseover)="onMouseOver($event)" (mouseout)="onMouseOut($event)">{{node}}</p>
            </span>
        </div>
    `,
    directives: [Tooltip]
})
class App {

    private _lines:Array<{field:string, value:string}> = [
        {field: 'Name', value: 'Bob'},
        {field: 'Address', value: 'NY'},
        {field: 'Age', value: '40'},
        {field: 'Hobbies', value: 'jousting'},
        {field: 'Favorite Color', value: 'blue'}
    ];
    private _tooltipOptions:TooltipInterface = {};
    private _nodes:Array<string> = ['A', 'B', 'C', 'D', 'E']

    get width():number {
        return window.innerWidth;
    }

    get height():number {
        return window.innerHeight;
    }

    get nodes():Array<string> {
        return this._nodes;
    }

    onMouseOver(event:any):void {

        let elText:Array<{field:string, value:string}> = [{field: 'Node', value: event.srcElement.outerText}];

        this.tooltipOptions = <TooltipInterface>{
            left: event.x,
            top: event.y,
            lines: elText.concat(this._lines),
            visible: true
        };

    }

    onMouseOut(event:any):void {
        this.tooltipOptions = <TooltipInterface>{};
    }

    get tooltipOptions():TooltipInterface {
        return this._tooltipOptions;
    }

    set tooltipOptions(options:TooltipInterface) {
        this._tooltipOptions = options;
    }

}
