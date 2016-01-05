describe('Template', function() {

    describe("Math.max", function () {
        var a,
            b;

        beforeEach(function () {
            a = 150;
            b = 300;
        });

        it("should confirm b > a", function () {
            expect(Math.max(a, b)).toEqual(b);
        });


    });


});
