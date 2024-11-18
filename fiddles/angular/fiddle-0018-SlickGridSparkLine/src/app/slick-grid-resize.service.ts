import { SlickGridAutoSizeService } from './slick-grid-auto-size.service';
declare let ResizeSensor:any;

export class SlickGridResizeService {
    private _resizeSensor:any;
    private _resizeTimeout:any;

    init(element:any, slickGridAutoSizeService:SlickGridAutoSizeService) {
        this._resizeSensor = new ResizeSensor(element, () => {
            this.resize(slickGridAutoSizeService);
        });
    }

    private resize(slickGridAutoSizeService:SlickGridAutoSizeService) {
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);
        }

        this._resizeTimeout = setTimeout(() => {
            if (slickGridAutoSizeService.grid) {
                slickGridAutoSizeService.grid.resizeCanvas();
                slickGridAutoSizeService.autoSizeColumns();
            }
        }, 100);
    }
}
