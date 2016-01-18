describe('Stars', function() {
    describe("default config", function () {
        var stars;
        beforeEach(function () {
            stars = new app.test.stars({});
        });
        it("should have autoInit flag set to false", function () {
            expect(stars.autoInit).toEqual(false);
        });
        it("should have a vertice count of 667", function() {
            expect(stars.verticeCount).toEqual(667);
        });
        it("should have a material count of 8", function() {
            expect(stars.materialCount).toEqual(8);
        });
        it("should have a system count of 24", function() {
            expect(stars.systemCount).toEqual(24);
        });
        it("should have a distance of 1000", function() {
            expect(stars.distance).toEqual(1000);
        });
    });
});
