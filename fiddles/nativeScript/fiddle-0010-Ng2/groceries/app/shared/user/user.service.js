"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var config_1 = require("../config");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.register = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http.post(config_1.Config.apiUrl + "Users", JSON.stringify({
            Username: user.email,
            Email: user.email,
            Password: user.password
        }), { headers: headers })
            .catch(this.handleErrors);
    };
    UserService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    UserService.prototype.login = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http.post(config_1.Config.apiUrl + "oauth/token", JSON.stringify({
            username: user.email,
            password: user.password,
            grant_type: "password"
        }), { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) {
            config_1.Config.token = data.Result.access_token;
        })
            .catch(this.handleErrors);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map