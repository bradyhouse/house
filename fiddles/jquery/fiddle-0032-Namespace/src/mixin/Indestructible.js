
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
