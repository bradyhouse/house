describe('Saturn', function() {

    describe("default configuration", function () {
        var saturn,
            threeToolkit;

        beforeEach(function () {
            saturn = app.test.saturn({});
            threeToolkit = app.test.toolkit().three;
        });

        it("should be an instance of a toolkit > three > Object class", function () {
            expect(saturn instanceof threeToolkit.Object).toBeTruthy();
        });

        it("should have a planet group that is an instance of THREE.Object3D", function() {
            expect(saturn.planetGroup instanceof THREE.Object3D).toBeTruthy();
        });

        it("should have a animateOrbit flag")




    });


});
