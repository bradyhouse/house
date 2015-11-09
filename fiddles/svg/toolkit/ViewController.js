
class ViewController {

    config() {
        return {
            name: 'ViewController1',
            mixins: [],
            view: null
        }
    }

    constructor(config) {
        this._prototype = new Object();
        this._mixins = config && config.hasOwnProperty('mixins') ? this._mixins = config.mixins : this.config().mixins;
        this._name = config && config.hasOwnProperty('name') ? this._name = config.name : this.config().name;
        this._view = config && config.hasOwnProperty('view') ? this._view = config.view : this.config().view;
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

    get view() {
        return this._view;
    }


    applyMixin(mixin) {
        var target = this,
            source = mixin.prototype;

        Object.getOwnPropertyNames(source).forEach(function (name) {
            if (name !== "constructor" || name!== "afterInit") Object.defineProperty(target, name,
                Object.getOwnPropertyDescriptor(source, name));
        });

        if(mixin.prototype.hasOwnProperty('afterInit')) {
            mixin.prototype.afterInit(this.view, this);
        }
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
