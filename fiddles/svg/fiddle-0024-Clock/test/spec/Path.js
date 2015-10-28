describe("Path", function () {

    describe("default configuration", function() {
        var basePath,
            docElement;

        beforeEach(function () {
            basePath = app.test.path({});
            docElement = document.createElementNS(app.test.xmlNamespaces().xmlns, 'path');
            docElement.setAttribute('id', 'path1');
        });


        it("should have a default docElement", function() {
            expect(basePath.docElementNS.outerHTML).toEqual(docElement.outerHTML);
        });
    })

});
