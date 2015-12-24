app.view.Viewport = class {
    config() {
        return {
            mixins: ['app.view.mixin.Three']
        }
    }

    constructor(config) {
        this._mixins = config && config.hasOwnProperty('mixins') ? this._mixins = config.mixins : this.config().mixins;
        this.init();
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
        for (let m = 0; m < this.mixins.length; m++) {
            let statement = 'new ' + this.mixins[m] + '();',
                mixin = eval(statement);
            if (mixin) {
                this.applyMixin(mixin);
            }
        }
    }
}
