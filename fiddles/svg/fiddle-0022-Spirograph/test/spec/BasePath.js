describe("BasePath", function () {

    describe("default configuration", function() {
        var basePath,
            docElement;

        beforeEach(function () {
            basePath = app.test.basePath({});
            docElement = document.createElementNS(app.test.xmlNamespaces().xmlns, 'path');
            docElement.setAttribute('id', 'path1');
            docElement.setAttribute('stroke', 'black');
            docElement.setAttribute('stroke-width', 1);
            docElement.setAttribute('opacity', .5);
            docElement.setAttribute("onmousedown", 'app.controller.onPathMouseDown(evt, this.id);');
            docElement.setAttribute("onmouseover", 'app.controller.onPathMouseOver(evt, this.id);');
            docElement.setAttribute("onmouseout", 'app.controller.onPathMouseOut(evt, this.id);');
        });


        it("should have a default docElement", function() {
            expect(basePath.docElementNS.outerHTML).toEqual(docElement.outerHTML);
        });
    })

});
