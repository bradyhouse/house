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
var services_1 = require("../services/services");
var RxPipe_1 = require("../util/RxPipe");
var ChatThread = (function () {
    function ChatThread(threadsService) {
        this.threadsService = threadsService;
        this.selected = false;
    }
    ChatThread.prototype.onInit = function () {
        var _this = this;
        this.threadsService.currentThread
            .subscribe(function (currentThread) {
            _this.selected = currentThread &&
                _this.thread &&
                (currentThread.id === _this.thread.id);
        });
    };
    ChatThread.prototype.clicked = function (event) {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    };
    ChatThread = __decorate([
        angular2_1.Component({
            lifecycle: [angular2_1.LifecycleEvent.onInit],
            properties: ["thread"],
            selector: "chat-thread"
        }),
        angular2_1.View({
            directives: [angular2_1.NgIf],
            template: "\n  <div class=\"media conversation\">\n    <div class=\"pull-left\">\n      <img class=\"media-object avatar\"\n           src=\"{{thread.avatarSrc}}\">\n    </div>\n    <div class=\"media-body\">\n      <h5 class=\"media-heading contact-name\">{{thread.name}}\n        <span *ng-if=\"selected\">&bull;</span>\n      </h5>\n      <small class=\"message-preview\">{{thread.lastMessage.text}}</small>\n    </div>\n    <a (click)=\"clicked($event)\" class=\"div-link\">Select</a>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_1.ThreadsService])
    ], ChatThread);
    return ChatThread;
})();
var ChatThreads = (function () {
    function ChatThreads(threadsService) {
        this.threadsService = threadsService;
        this.threads = threadsService.orderedThreads;
    }
    ChatThreads = __decorate([
        angular2_1.Component({
            selector: "chat-threads"
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor, ChatThread],
            pipes: [RxPipe_1.RxPipe],
            template: "\n    <!-- conversations -->\n    <div class=\"row\">\n      <div class=\"conversation-wrap\">\n\n        <chat-thread\n             *ng-for=\"#thread of threads | rx\"\n             [thread]=\"thread\">\n        </chat-thread>\n\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [services_1.ThreadsService])
    ], ChatThreads);
    return ChatThreads;
})();
exports.ChatThreads = ChatThreads;
