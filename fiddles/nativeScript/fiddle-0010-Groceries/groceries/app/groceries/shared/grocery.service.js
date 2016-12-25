"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var shared_1 = require("../../shared");
var grocery_model_1 = require("./grocery.model");
var GroceryService = (function () {
    function GroceryService(http, zone) {
        this.http = http;
        this.zone = zone;
        this.items = new Rx_1.BehaviorSubject([]);
        this.allItems = [];
    }
    GroceryService.prototype.load = function () {
        var _this = this;
        var headers = this.getHeaders();
        headers.append("X-Everlive-Sort", JSON.stringify({ ModifiedAt: -1 }));
        return this.http.get(shared_1.BackendService.apiUrl + "Groceries", {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            data.Result.forEach(function (grocery) {
                _this.allItems.push(new grocery_model_1.Grocery(grocery.Id, grocery.Name, grocery.Done || false, grocery.Deleted || false));
                _this.publishUpdates();
            });
        })
            .catch(this.handleErrors);
    };
    GroceryService.prototype.add = function (name) {
        var _this = this;
        return this.http.post(shared_1.BackendService.apiUrl + "Groceries", JSON.stringify({ Name: name }), { headers: this.getHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            _this.allItems.unshift(new grocery_model_1.Grocery(data.Result.Id, name, false, false));
            _this.publishUpdates();
        })
            .catch(this.handleErrors);
    };
    GroceryService.prototype.setDeleteFlag = function (item) {
        var _this = this;
        return this.put(item.id, { Deleted: true, Done: false })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            item.deleted = true;
            item.done = false;
            _this.publishUpdates();
        });
    };
    GroceryService.prototype.toggleDoneFlag = function (item) {
        item.done = !item.done;
        this.publishUpdates();
        return this.put(item.id, { Done: item.done })
            .map(function (res) { return res.json(); });
    };
    GroceryService.prototype.restore = function () {
        var _this = this;
        var indeces = [];
        this.allItems.forEach(function (grocery) {
            if (grocery.deleted && grocery.done) {
                indeces.push(grocery.id);
            }
        });
        var headers = this.getHeaders();
        headers.append("X-Everlive-Filter", JSON.stringify({
            "Id": {
                "$in": indeces
            }
        }));
        return this.http.put(shared_1.BackendService.apiUrl + "Groceries", JSON.stringify({
            Deleted: false,
            Done: false
        }), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            _this.allItems.forEach(function (grocery) {
                if (grocery.deleted && grocery.done) {
                    grocery.deleted = false;
                    grocery.done = false;
                }
            });
            _this.publishUpdates();
        })
            .catch(this.handleErrors);
    };
    GroceryService.prototype.permanentlyDelete = function (item) {
        var _this = this;
        return this.http
            .delete(shared_1.BackendService.apiUrl + "Groceries/" + item.id, { headers: this.getHeaders() })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var index = _this.allItems.indexOf(item);
            _this.allItems.splice(index, 1);
            _this.publishUpdates();
        })
            .catch(this.handleErrors);
    };
    GroceryService.prototype.put = function (id, data) {
        return this.http.put(shared_1.BackendService.apiUrl + "Groceries/" + id, JSON.stringify(data), { headers: this.getHeaders() })
            .catch(this.handleErrors);
    };
    GroceryService.prototype.publishUpdates = function () {
        var _this = this;
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(function () {
            // must emit a *new* value (immutability!)
            _this.items.next(_this.allItems.slice());
        });
    };
    GroceryService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + shared_1.BackendService.token);
        return headers;
    };
    GroceryService.prototype.handleErrors = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error);
    };
    GroceryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_1.NgZone])
    ], GroceryService);
    return GroceryService;
}());
exports.GroceryService = GroceryService;
