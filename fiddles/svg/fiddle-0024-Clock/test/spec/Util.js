describe("Util", function () {
    describe("xmlNamespaces", function () {

        var xmlNamespaces,
            test = 1;

        beforeEach(function () {
            xmlNamespaces = app.test.xmlNamespaces();
        });

        it('should have an xmlns property equal to "http://www.w3.org/2000/svg"', function () {
            expect(xmlNamespaces.xmlns).toEqual('http://www.w3.org/2000/svg');
        });
        it('should have an xmlnsXLink property equal to "http://www.w3.org/1999/xlink"', function () {
            expect(xmlNamespaces.xmlnsXLink).toEqual('http://www.w3.org/1999/xlink');
        });
        it('should have an xmlnsEv property equal to "http://www.w3.org/2001/xml-events"', function () {
            expect(xmlNamespaces.xmlnsEv).toEqual('http://www.w3.org/2001/xml-events');
        });
    });
    describe("color", function () {

        var lastColor = '#000000',
            color = '#FFFFFF';

        for (var i = 0; i < 10; i++) {
            beforeEach(function () {
                color = app.test.color();
            });

            afterEach(function () {
                lastColor = color;
            });

            it('should not generate a color equal to the previous color', function () {
                expect(app.test.color()===lastColor).toBeFalsy();
            });
        }
    });
    describe("splitAttribute", function() {

        var fiddleHook,
            surface,
            svg;

        beforeEach(function () {
            surface = app.test.surface({
                autoBind: true,
                autoPopulate: true
            });
        });

        it("should throw an error when no parameters are specified", function() {
            expect(app.test.splitAttribute).toThrow();
        });

        it("should throw an error when no id parameter is specified", function() {
            expect(app.test.splitAttribute.bind("a")).toThrow();
        });

        it("should throw an error when the field parameter is not specified", function() {
            expect(app.test.splitAttribute.bind(null, "a")).toThrow();
        });

        it("should throw an error when the id is invalid", function() {
            expect(app.test.splitAttribute.bind("zoomandpan", "x")).toThrow();
        });

        it("should split the value when the field and id are valid", function() {
            expect(app.test.splitAttribute.bind("zoomandpan", "surface1", null).length == 1).toBeTruthy();
        });

        it("should split the default when the field is invalid and the id is valid", function() {
            expect(app.test.splitAttribute.bind("x", "surface1", "disabled").length ==1).toBeTruthy();
        });

    });
    describe("mapFromQueryString", function() {
        it("should throw an error when no parameters are specified", function() {
            expect(app.test.mapFromQueryString).toThrow();
        });
        it("should throw an error when only an url is specified", function() {
            expect(app.test.mapFromQueryString.bind(location.search)).toThrow();
        });
    });
});
