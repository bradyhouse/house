app.toolkit.three.Publisher = class {

    constructor() {
        this._messageTypes = {};
    }

    get messageTypes() { return this._messageTypes; }

    subscribe(message, subscriber, callback) {
        var subscribers = this.messageTypes[message];
        if (subscribers) {
            if (this.findSubscriber(subscribers, subscriber) != -1) {
                return;
            }
        }
        else {
            subscribers = [];
            this.messageTypes[message] = subscribers;
        }

        subscribers.push({subscriber: subscriber, callback: callback});
    }

    unsubscribe(message, subscriber, callback) {
        if (subscriber) {
            var subscribers = this.messageTypes[message];

            if (subscribers) {
                var i = this.findSubscriber(subscribers, subscriber, callback);
                if (i != -1) {
                    this.messageTypes[message].splice(i, 1);
                }
            }
        }
        else {
            delete this.messageTypes[message];
        }
    }

    publish(message) {
        var subscribers = this.messageTypes[message];

        if (subscribers) {
            for (var i = 0; i < subscribers.length; i++) {
                var args = [];
                for (var j = 0; j < arguments.length - 1; j++) {
                    args.push(arguments[j + 1]);
                }
                subscribers[i].callback.apply(subscribers[i].subscriber, args);
            }
        }
    }

    findSubscriber(subscribers, subscriber) {
        for (var i = 0; i < subscribers.length; i++) {
            if (subscribers[i] == subscriber) {
                return i;
            }
        }
        return -1;
    }

}
