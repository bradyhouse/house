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
var ChatNavBar_1 = require("./ts/components/ChatNavBar");
var ChatThreads_1 = require("./ts/components/ChatThreads");
var ChatWindow_1 = require("./ts/omponents/ChatWindow");
var services_1 = require("./ts/services/services");
var util_1 = require("./ts/util/util");
var services_2 = require("./ts/services/services");
var ChatExampleData_1 = require("./ts/ChatExampleData");
require("css/styles.scss");
var Fiddle = (function () {
    function Fiddle(messagesService, threadsService, userService) {
        this.messagesService = messagesService;
        this.threadsService = threadsService;
        this.userService = userService;
        ChatExampleData_1.ChatExampleData.init(messagesService, threadsService, userService);
    }
    Fiddle = __decorate([
        angular2_1.Component({
            selector: "fiddle-0016-ChatApp"
        }),
        angular2_1.View({
            directives: [ChatNavBar_1.ChatNavBar,
                ChatThreads_1.ChatThreads,
                ChatWindow_1.ChatWindow],
            template: "\n  <div>\n    <nav-bar></nav-bar>\n    <div class=\"container\">\n      <chat-threads></chat-threads>\n      <chat-window></chat-window>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_2.MessagesService, services_2.ThreadsService, services_2.UserService])
    ], Fiddle);
    return Fiddle;
})();
angular2_1.bootstrap(Fiddle, [services_1.servicesInjectables, util_1.utilInjectables]);
