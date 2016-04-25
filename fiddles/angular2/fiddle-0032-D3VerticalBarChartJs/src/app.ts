@Component({
    selector: 'app',
    template: `
        <div class="panel">
            <bar-chart
            [options]="options"
            (ready)="onChartReady($event)">
            </bar-chart>
        </div>
        `,
    directives: [BarChart]
})
class App {

    data:Array<ChartInterface> = [];

    private _width:number = window.innerWidth - 50;
    private _height:number = window.innerHeight - 50;
    private _simulate:boolean = false;
    private _delay:number = 1000;
    private _title:string = meta.fiddleHeader;
    private _barchart:BarChart;

    constructor(@Inject(Http) private http:any) {

    }

    private request(url:string) {
        return this.http
            .get(url)
            .map(res => res.json());
    }

    onChartReady(barchart:BarChart) {
        this._barchart = barchart;
        this.request(meta.urls.data).subscribe((res:any) => {
            if (res.items) {
                this._barchart.data = res.items;
            }
        });
    }

    get options():BarChartInterface {
        return {
            title: this._title,
            simulate: this._simulate,
            delay: 2000,
            scaleFn: (d:any):number => {
                let value = d && d.value ? d.value : 0,
                    tolerance:number = 50,
                    scale:number = (+value) / (+tolerance);
                return scale;
            },
            scaleRange: [.05, 50]
        }
    }

}