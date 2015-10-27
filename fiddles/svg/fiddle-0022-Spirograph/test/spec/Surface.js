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
            svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            svg.setAttribute('xmlns:ev', 'http://www.w3.org/2001/xml-events');
            svg.setAttribute('zoomAndPan', 'disabled');
            svg.setAttribute('style', 'width: 500px; height: 500px;');
            svg.setAttribute('onload', 'app.controller.onSurfaceLoad(evt);');

        });

        afterEach(function() {
            document.body.removeChild(document.getElementById('surface1'));
        });


        it("should have a width of 500px", function () {
            expect(surface.cssWidth).toEqual('500px');
        });

        it("should have a height of 500px", function () {
            expect(surface.cssHeight).toEqual('500px');
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
            expect(surface.docElement.outerHTML).toEqual(svg.outerHTML);
        });

    });
    describe("with auto bind enabled", function () {
        var fiddleHook,
            surface,
            svg;

        beforeEach(function () {
            fiddleHook = document.createElement('div');
            fiddleHook.setAttribute('id', 'fiddleHook');
            surface = app.test.surface({
                autoBind: true
            });
        });

        afterEach(function() {
            document.body.removeChild(document.getElementById('surface1'));
        });

        it("should be added to the DOM", function () {
            expect(document.getElementById('surface1')).toBeTruthy();
        });

    });
    describe("with auto bind and auto populate enabled", function () {
        var surface,
            controller = app.controller;

        beforeEach(function () {
            surface = app.test.surface({
                autoBind: true,
                autoPopulate: true
            });
        });

        afterEach(function() {
            document.body.removeChild(document.getElementById('surface1'));
        });

        it("should be added to the DOM", function () {
            expect(document.getElementById('surface1')).toBeTruthy();
        });
        it("should contain a group node", function () {
            expect(document.getElementById('surface1').getElementsByTagName('g').length == 1).toBeTruthy();
        });
        it("should contain a path node", function () {
            expect(surface.docElement.getElementsByTagName('g')[0].getElementsByTagName('path').length == 1).toBeTruthy();
        });

    });
});
