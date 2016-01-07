describe('Orbit', function() {
    describe("default config", function () {
        var orbit;
        beforeEach(function () {
            orbit = new app.test.orbit({});
        });
        it("should have autoInit flag set to false", function () {
            expect(stars.autoInit).toEqual(false);
        });
        it("should have a segment count of 120", function() {
            expect(stars.verticeCount).toEqual(120);
        });
        it("should have a distance of 10", function() {
            expect(stars.materialCount).toEqual(10);
        });
    });
});
