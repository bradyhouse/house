describe('Planet', function() {
    var planet,
        threeToolkit,
        map;

    beforeEach(function () {
        planet = app.test.planet({});
        threeToolkit = app.test.toolkit().three;
        map = app.test.metadata().urls.planet;
    });

    describe("Default Configuration", function () {
        it("should be an instance of app.toolkit.three.Object class", function () {
            expect(planet instanceof threeToolkit.Object).toBeTruthy();
        });
        it("should have a messageTypes object", function() {
            expect(planet.messageTypes instanceof Object).toBeTruthy();
        });
        it("should have a size of 1", function() {
            expect(planet.size).toEqual(1);
        });
        it("should have a distance of 0.0", function() {
            expect(planet.distance).toEqual(0.0);
        });
        it("should have a period of 0.0", function() {
            expect(planet.period).toEqual(0.0);
        });
        it("should have a map equal to the default planet map", function() {
            expect(planet.map).toEqual(map);
        });
        it("should have a revolution speed equal to .002", function() {
            expect(planet.revolutionSpeed).toEqual(.002);
        })
    });

    describe("Subscribe method", function() {
        it("should take 3 arguments", function() {
            expect(planet.subscribe.length).toEqual(3);
        });
    });

    describe("Unsubscribe method", function() {
        it("should take 3 arguments", function() {
            expect(planet.unsubscribe.length).toEqual(3);
        });
    });

    describe("Publish method", function() {
        it("should take 1 argument", function() {
           expect(planet.publish.length).toEqual(1);
        });
    });





});
