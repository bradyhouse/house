function Calculator() {
    this.currentTotal = 0;
}

Calculator.prototype.set = function(newValue) {
    this.currentTotal = newValue;
    return this.currentTotal;
};

Calculator.prototype.add = function(toAdd) {
    this.currentTotal += toAdd;
    return this.currentTotal;
};

Calculator.prototype.subtract = function(toSub) {
    this.currentTotal -= toSub;
    return this.currentTotal;
};

Calculator.prototype.divide = function(toDivide) {
    if (toDivide === 0) {
        throw "Error division by zero";
    }
    this.currentTotal /= toDivide;
    return this.currentTotal;
};

Calculator.prototype.multiply = function(toMultiply) {
   this.currentTotal *= toMultiply;
   return this.currentTotal;
};
