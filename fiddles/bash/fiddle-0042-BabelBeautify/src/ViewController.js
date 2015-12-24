

app.ViewController = class {

    config() {
        return {
            name: 'ViewController1',
            mixins: []
        }
    }

    constructor(config) {
        this._prototype = new Object();
        this._mixins = config && config.hasOwnProperty('mixins') ? this._mixins = config.mixins : this.config().mixins;
        this._name = config && config.hasOwnProperty('name') ? this._name = config.name : this.config().name;

        this.init();
    }

    get prototype() {
        return this._prototype;
    }
    get name() {
        return this._name;
    }

    get mixins() {
        return this._mixins;
    }

    applyMixin(mixin) {
        var target = this,
            source = mixin.prototype;

        Object.getOwnPropertyNames(source).forEach(function (name) {
            if (name !== "constructor") Object.defineProperty(target, name,
                Object.getOwnPropertyDescriptor(source, name));
        });
    }

    init() {
        var statement = '',
            mixin = null,
            i = 0;

        for (; i < this.mixins.length; i++) {
            statement = 'new ' + this.mixins[i] + '();';
            mixin = eval(statement);
            if (mixin) {
                this.applyMixin(mixin);
            }
        }
    }

}
