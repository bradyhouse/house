describe('Star', function () {
    describe('default configuration', function () {
        var star,
            docElementNS;

        beforeEach(function () {
            star = app.test.star({});
            docElementNS = document.createElementNS(app.test.xmlNamespaces().xmlns, 'path');
            docElementNS.setAttribute('id', 'star1');
            docElementNS.setAttribute('stroke', 'black');
            docElementNS.setAttribute('stroke-width', 1);
            docElementNS.setAttribute('opacity', .5);
            docElementNS.setAttribute("onmousedown", 'app.controller.onPathMouseDown(evt, this.id);');
            docElementNS.setAttribute("onmouseover", 'app.controller.onPathMouseOver(evt, this.id);');
            docElementNS.setAttribute("onmouseout", 'app.controller.onPathMouseOut(evt, this.id);');
            docElementNS.setAttribute("d", "M 256 116 203 28 100 34 57 127 119 209 221 193 254 95 183 20 84 48 62 148 140 215 236 177 247 75 162 17 71 65 71 168 162 216 247 158 236 56 140 18 62 85 84 185 183 213 254 138 221 40 119 24 57 106 100 199 203 205 z");
            docElementNS.setAttribute("fill", '#56e9d4');
        });

        afterEach(function () {
            star = null;
            docElementNS = null;
        });

        it("should have a randomizeColor equal to false", function () {
            expect(star.randomizeColor).toEqual(false);
        });

        it("should have a randomizeShape equal to false", function () {
            expect(star.randomizeShape).toEqual(false);
        });

        it("should have a data attribute", function () {
            expect(star.data).toEqual("M 256 116 203 28 100 34 57 127 119 209 221 193 254 95 183 20 84 48 62 148 140 215 236 177 247 75 162 17 71 65 71 168 162 216 247 158 236 56 140 18 62 85 84 185 183 213 254 138 221 40 119 24 57 106 100 199 203 205 z");
        });

        it("should have a default docElement", function () {
            expect(star.docElementNS.outerHTML).toEqual(docElementNS.outerHTML);
        });

    });
});
