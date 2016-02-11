/// <reference path="typings/angular2/angular2.d.ts" />

import {
    Component,
    View,
    NgFor,
    bootstrap
} from "angular2/angular2";

@Component({
    selector: 'fiddle-0009-NgFor'
})
@View({
    directives: [NgFor],
    template: `
  <div *ng-for="#c of cities">{{ c }}</div>

  <hr>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
      </tr>
    </thead>
    <tr *ng-for="#p of people">
      <td>{{ p.name }}</td>
      <td>{{ p.age }}</td>
      <td>{{ p.city }}</td>
    </tr>
  </table>

  <hr>

  <div *ng-for="#item of peopleByCity">
    <div>{{ item.city }}</div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tr *ng-for="#p of item.people">
        <td>{{ p.name }}</td>
        <td>{{ p.age }}</td>
      </tr>
    </table>
  </div>

  <hr>

  <div *ng-for="#c of cities; #num = index">
    {{ num+1 }} - {{ c }}
  </div>
  `
})
class Fiddle {
    cities: Array<string>;
    people: Array<Object>;
    peopleByCity: Object;

    constructor() {
        this.cities = ['Miami', 'Sao Paulo', 'New York'];
        this.people = [
            { name: 'Anderson', age: 35, city: 'Sao Paulo' },
            { name: 'John', age: 12, city: 'Miami' },
            { name: 'Peter', age: 22, city: 'New York' }
        ];
        this.peopleByCity = [
            {
                city: 'Miami',
                people: [
                    { name: 'John', age: 12 },
                    { name: 'Angel', age: 22 }
                ]
            },
            {
                city: 'Sao Paulo',
                people: [
                    { name: 'Anderson', age: 35 },
                    { name: 'Felipe', age: 36 }
                ]
            }
        ];
    };
}

bootstrap(Fiddle);
