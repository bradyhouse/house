describe("Calculator", function() {
    var calc;

    beforeEach(function() {
        calc = new Calculator();
    });

    it("should be able to add positive numbers", function(){
        calc.set(0);
        expect(calc.add(1)).toEqual(1);
        expect(calc.add(3)).toEqual(4);
        expect(calc.add(2)).toEqual(6);
        expect(calc.add(4)).toEqual(10);
    });

    it("should be able to add negative numbers", function(){
        calc.set(10);
        expect(calc.add(-1)).toEqual(9);
        expect(calc.add(-4)).toEqual(5);
    });

    it("should be able to subtract positive numbers", function(){
        calc.set(10);
        expect(calc.subtract(1)).toEqual(9);
    	expect(calc.subtract(3)).toEqual(6);
	    expect(calc.subtract(2)).toEqual(4);
	    expect(calc.subtract(4)).toEqual(0);
    });

    it("should be able to subtract negative numbers", function(){
        calc.set(10);
    	expect(calc.subtract(-1)).toEqual(11);
	    expect(calc.subtract(-3)).toEqual(14);
	    expect(calc.subtract(-2)).toEqual(16);
    	expect(calc.subtract(-4)).toEqual(20);
    });
    
    it("should be able to multiply numbers", function() {
	calc.set(10);
	expect(calc.multiply(1)).toEqual(10);
  	expect(calc.multiply(2)).toEqual(20);
        expect(calc.multiply(3)).toEqual(60);
	expect(calc.multiply(4)).toEqual(240);
    });

});
