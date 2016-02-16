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
var Rx = require("rx");
var initialMessages = [];
var MessagesService = (function () {
    function MessagesService() {
        this.newMessages = new Rx.Subject();
        this.updates = new Rx.Subject();
        this.create = new Rx.Subject();
        this.markThreadAsRead = new Rx.Subject();
        this.messages = this.updates
            .scan(initialMessages, function (messages, operation) {
            return operation(messages);
        })
            .shareReplay(1);
        this.create
            .map(function (message) {
            return function (messages) {
                return messages.concat(message);
            };
        })
            .subscribe(this.updates);
        this.newMessages
            .subscribe(this.create);
        this.markThreadAsRead
            .map(function (thread) {
            return function (messages) {
                return messages.map(function (message) {
                    if (message.thread.id === thread.id) {
                        message.isRead = true;
                    }
                    return message;
                });
            };
        })
            .subscribe(this.updates);
    }
    MessagesService.prototype.addMessage = function (message) {
        this.newMessages.onNext(message);
    };
    MessagesService.prototype.messagesForThreadUser = function (thread, user) {
        return this.newMessages
            .filter(function (message) {
            return (message.thread.id === thread.id) &&
                (message.author.id !== user.id);
        });
    };
    MessagesService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MessagesService);
    return MessagesService;
})();
exports.MessagesService = MessagesService;
exports.messagesServiceInjectables = [
    angular2_1.bind(MessagesService).toClass(MessagesService)
];
