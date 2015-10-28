describe("Surface", function () {
    describe("with default configuration", function () {
        var surface,
            svg;

        beforeEach(function () {
            surface = app.test.surface({});
            svg = document.createElementNS(app.test.xmlNamespaces().xmlns, 'svg');
            svg.setAttribute('id', 'surface1');
            svg.setAttribute('width', '500px');
            svg.setAttribute('height', '500px');
            svg.setAttribute('zoomAndPan', 'disabled');

        });

        afterEach(function() {
            document.body.removeChild(document.getElementById('surface1'));
        });

        it("should have a coordinate system width of 500px", function () {
            expect(surface.coorWidth).toEqual('500px');
        });

        it("should have a coordinate system heigh of 500px", function () {
            expect(surface.coorHeight).toEqual('500px');
        });

        it("should have a hook equal to the window.document.body", function () {
            expect(surface.hook).toEqual(window.document.body);
        });

        it("should have an svg docElement", function () {
            expect(surface.docElementNS.outerHTML).toEqual(svg.outerHTML);
        });

    });
});
