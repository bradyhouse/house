/**
 * @class jasmine.panel.jsCoverage
 * Creates and renders a per spec jscoverage panel.
 * @param {Object} config The configuration object.
 */
Test.panel.jsCoverage = function (config) {
    this.el = new jasmine.Dom({
        tag: "div",
        cls: "panel jsCoverage",
        children: [{
            cls: "sources",
            html: new Test.CodeHighLighter({
                source: config.suite.jscoverage.file.source.join("\n"),
                linesFromJsCoverage: config.suite.jscoverage.file,
                highLightCode: false
            }).renderJsSources()
        }]
    });
    return this;
};

Test.panel.jsCoverage.prototype.remove = function () {
    this.el.parentNode.removeChild(this.el);
};
