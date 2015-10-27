
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
