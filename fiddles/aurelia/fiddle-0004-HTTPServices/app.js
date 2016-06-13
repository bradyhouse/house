import { YahooChartApiService } from './yahoo-chart-api.service';
import { inject } from "aurelia-framework";

@inject(YahooChartApiService)
export class App {
   constructor(yahooChartApiService) {
       this.service = yahooChartApiService;
   }

    activate(){
        this.service.getAll().then(data => {
            this.json =	data;
        });
    }
}
