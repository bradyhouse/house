describe('Viewport', function() {

    describe("default configuration", function () {
        var viewport;

        beforeEach(function () {
            viewport = app.test.viewport({});
        });

        it("should confirm b > a", function () {
            expect(Math.max(a, b)).toEqual(b);
        });


    });


});
