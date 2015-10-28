describe("Rectangle", function () {

    /**
     *  Verify that when an empty config is passed to the
     *  constructor, the resulting class instance
     *  has the following properties:
     *
     *      id: 'rect1',
     *      x: 0,
     *      y: 0,
     *      fill: '#000000',
     *      height: 50,
     *      width: 50,
     *      xmlns: Util.xmlNamespaces().xmlns,
     *      hook: null,
     *      autoBind: false,
     *      stroke-width: 1,
     *      stroke: 'black'
     */

    describe("default configuration", function () {
        var rectangle,
            docElement;

        beforeEach(function () {
            rectangle = app.test.rectangle({});
            docElement = document.createElementNS(app.test.xmlNamespaces().xmlns, "rect");
            docElement.setAttribute('id', "rect1");
        });


        it("should have a default docElement", function () {
            expect(rectangle.docElementNS.outerHTML).toEqual(docElement.outerHTML);
        });

        it("should not be added to the DOM", function () {
            expect(document.getElementById('rect1')).toBeFalsy();
        });

    });

});
