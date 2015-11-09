describe('Circle', function() {

    describe("default configuration", function () {
        var circle,
            docElement;

        beforeEach(function () {
            circle = app.test.circle({});
            docElement = document.createElementNS(app.test.xmlNamespaces().xmlns, 'circle');
            docElement.setAttribute('id', 'circle1');
        });

        it("should have a default docElement", function () {
            expect(circle.docElementNS.outerHTML).toEqual(docElement.outerHTML);
        });

        it("should have a radius of zero", function () {
            expect(circle.radius).toEqual(0);
        });

        it("should have a diameter of zero", function () {
            expect(circle.diameter).toEqual(0);
        });

        it("should have a circumference of zero", function () {
            expect(circle.circumference).toEqual(0);
        });

    });

    describe("svg child", function() {

        var svg;

        beforeEach(function() {

            svg = app.test.surface({
                hook: window.document.body,
                autoBind: true,
                style: 'background: #000',
                children: [
                    app.test.circle({
                        centerX: '50%',
                        centerY: '50%',
                        radius: 100,
                        fill: "blue",
                        fillOpacity: .75,
                        stroke: "white",
                        strokeWidth: "18",
                        strokeDash: "1%,2.91%,0.03%,2.91%,0.03%,2.91%,0.03%,2.91%,0.03%,2.91%"
                    })
                ]
            });

        });

        it("should be added to the DOM", function() {
            expect(document.getElementById('circle1')).toBeTruthy();
        });


    });

});
