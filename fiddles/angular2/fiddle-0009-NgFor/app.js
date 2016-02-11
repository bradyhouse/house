var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var Fiddle = (function () {
    function Fiddle() {
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
    }
    ;
    Fiddle = __decorate([
        angular2_1.Component({
            selector: 'fiddle-0009-NgFor'
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor],
            template: "\n  <div *ng-for=\"#c of cities\">{{ c }}</div>\n\n  <hr>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Age</th>\n        <th>City</th>\n      </tr>\n    </thead>\n    <tr *ng-for=\"#p of people\">\n      <td>{{ p.name }}</td>\n      <td>{{ p.age }}</td>\n      <td>{{ p.city }}</td>\n    </tr>\n  </table>\n\n  <hr>\n\n  <div *ng-for=\"#item of peopleByCity\">\n    <div>{{ item.city }}</div>\n\n    <table>\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Age</th>\n        </tr>\n      </thead>\n      <tr *ng-for=\"#p of item.people\">\n        <td>{{ p.name }}</td>\n        <td>{{ p.age }}</td>\n      </tr>\n    </table>\n  </div>\n\n  <hr>\n\n  <div *ng-for=\"#c of cities; #num = index\">\n    {{ num+1 }} - {{ c }}\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle);
