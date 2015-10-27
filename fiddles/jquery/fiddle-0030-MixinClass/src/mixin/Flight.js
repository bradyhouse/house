class Flight {

    constructor() {
        this.prototype = new Object();
        this.prototype.fly = this.fly;
    }

    fly() {
        Util.log('Flight mixin ~ <i>I can fly</i>');
    }
}
