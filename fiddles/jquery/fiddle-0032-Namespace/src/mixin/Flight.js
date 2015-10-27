
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


