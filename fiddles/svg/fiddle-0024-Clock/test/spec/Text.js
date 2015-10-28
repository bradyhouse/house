describe("Text", function () {

    describe("default configuration", function () {
        var text,
            docElement;

        /**
         *  Verify that when an empty config is passed to the
         *  constructor, the resulting class instance
         *  has the following properties:
         *
         *      <text id="text1" style="text-anchor: start;" font-family="arial" font-size="12">&amp;nbsp;</text>
         */

        beforeEach(function () {
            text = app.test.text({});
            docElement = document.createElementNS(app.test.xmlNamespaces().xmlns, 'text');
            docElement.setAttribute('id', 'text1');
            docElement.setAttribute("style", "text-anchor: start;");
            docElement.setAttribute("font-family", "arial");
            docElement.setAttribute("font-size", "12");
        });

        it("should have a default docElement", function () {
            expect(text.docElementNS.outerHTML).toEqual(docElement.outerHTML);
        });
    });

});
