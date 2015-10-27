(function(app) {
    "use strict";


    class Util {
        static log(msg) {
            var div = document.createElement('div');
            div.innerHTML = msg;
            div.style.color = "red";
            $("#fiddleHook").append(div);
        }
    }


    window.mixin = window.mixin || {};
    window.mixin.Flight = class {
        constructor() {
            this.prototype = new Object();
            this.prototype.fly = this.fly;
        }
        fly() {
            Util.log('Flight mixin ~ <i>I can fly</i>');
        }
    }


    window.mixin = window.mixin || {}
    window.mixin.Strength = class {
        constructor() {
            this.prototype = new Object();
            this.prototype.flex = this.flex;
        }
        flex() {
            Util.log('Strength mixin ~ <i>I am super strong</i>');
        }
    }


    window.mixin = window.mixin || {};
    window.mixin.Indestructible = class {
        constructor() {
            this.prototype = new Object();
            this.prototype.destroy = this.destroy;
        }
        destroy() {
            Util.log('Indestructible mixin ~ <i>I am indestructible</i>');
        }
    }


    class SuperHero {
        config() {
            return {
                name: 'AcmeMan',
                mixins: ['Indestructible']
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
        init() {
            var statement = '',
                mixin = null,
                i = 0;
            Util.log('I am <i>' + this.name + '</i>');
            for (; i < this.mixins.length; i++) {
                statement = 'new window.mixin.' + this.mixins[i] + '();';
                mixin = eval(statement);
                if (mixin) {
                    this.applyMixin(mixin);
                }
            }
        }
        applyMixin(mixin) {
            var target = this,
                source = mixin.prototype;
            Object.getOwnPropertyNames(source).forEach(function(name) {
                if (name !== "constructor") Object.defineProperty(target, name,
                    Object.getOwnPropertyDescriptor(source, name));
            });
        }
    }


    class SuperMan extends SuperHero {
        constructor() {
            super({
                name: 'SuperMan',
                mixins: [
                    'Flight',
                    'Strength',
                    'Indestructible'
                ]
            });
        }
    }


    app.controller = app.controller || {
        onDomContentLoaded: function() {
            var superMan = new SuperMan();
            superMan.fly();
            superMan.flex();
            superMan.destroy();
        }
    };
    document.body.addEventListener('DOMContentLoaded', app.controller.onDomContentLoaded(), false);
})(window.app = window.app || {})
