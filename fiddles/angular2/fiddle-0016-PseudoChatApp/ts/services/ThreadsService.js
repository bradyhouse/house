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
var models_1 = require("../models");
var MessagesService_1 = require("./MessagesService");
var _ = require("underscore");
var ThreadsService = (function () {
    function ThreadsService(messagesService) {
        this.messagesService = messagesService;
        this.currentThread = new Rx.BehaviorSubject(new models_1.Thread());
        this.threads = messagesService.messages
            .map(function (messages) {
            var threads = {};
            messages.map(function (message) {
                threads[message.thread.id] = threads[message.thread.id] ||
                    message.thread;
                var messagesThread = threads[message.thread.id];
                if (!messagesThread.lastMessage ||
                    messagesThread.lastMessage.sentAt < message.sentAt) {
                    messagesThread.lastMessage = message;
                }
            });
            return threads;
        })
            .shareReplay(1);
        this.orderedThreads = this.threads
            .map(function (threadGroups) {
            var threads = _.values(threadGroups);
            return _.sortBy(threads, function (t) { return t.lastMessage.sentAt; }).reverse();
        })
            .shareReplay(1);
        this.currentThreadMessages = this.currentThread
            .combineLatest(messagesService.messages, function (currentThread, messages) {
            if (currentThread && messages.length > 0) {
                return _.chain(messages)
                    .filter(function (message) {
                    return (message.thread.id === currentThread.id);
                })
                    .map(function (message) {
                    message.isRead = true;
                    return message;
                })
                    .value();
            }
            else {
                return [];
            }
        })
            .shareReplay(1);
        this.currentThread.subscribe(this.messagesService.markThreadAsRead);
    }
    ThreadsService.prototype.setCurrentThread = function (newThread) {
        this.currentThread.onNext(newThread);
    };
    ThreadsService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [MessagesService_1.MessagesService])
    ], ThreadsService);
    return ThreadsService;
})();
exports.ThreadsService = ThreadsService;
exports.threadsServiceInjectables = [
    angular2_1.bind(ThreadsService).toClass(ThreadsService)
];
