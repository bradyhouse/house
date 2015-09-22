describe("Group", function () {

    describe("default configuration", function () {
        var group,
            docElement;

        beforeEach(function () {
            group = app.test.group({});
            docElement = document.createElementNS(app.test.xmlNamespaces().xmlns, 'g');
            docElement.setAttribute('id', 'group1');
            docElement.setAttribute("onkeyup", "app.controller.onShapeGroupKeyUp(evt);");
            docElement.setAttribute('onmousedown', 'app.controller.onShapeGroupMouseDown(evt);');
        });
        afterEach(function() {
            group = null;
            docElement = null;
        });

        it("should have a default docElement", function () {
            expect(group.docElementNS.outerHTML).toEqual(docElement.outerHTML);
        });
    });

});
