import {bootstrap} from 'angular2/platform/browser';
import {Component, enableProdMode, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';

let metadata = {
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0017-AjaxGetRequest',
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
};

@Injectable()
class JsonPlaceHolderApi {
    constructor(private http: Http) {}
    getPost() {
        const endpoint = "http://jsonplaceholder.typicode.com/posts";
        return this.http
            .get(endpoint)
            .map(res => res.json());
    }
}

@Component({
    selector: 'app',
    template: `
    <div class="enter-stage-south">
      <h4>Angular2 Basic Get Request</h4>
      <button type="button" (click)="makeRequest()">Make Request</button>
      <br/><br/>
      <pre>{{data | json}}</pre>
    </div>`,
    providers: [HTTP_PROVIDERS, JsonPlaceHolderApi]
})
class App {
    data: Object;
    constructor(private jsonPlaceHolderApi: JsonPlaceHolderApi) {
        console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
        console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
        console.group();

    }
    makeRequest(): void {
        this.jsonPlaceHolderApi.getPost().subscribe((res: Response) => {
            this.data = res;
        });
    }
}

enableProdMode();
bootstrap(App)
    .catch(err => console.error(err));
