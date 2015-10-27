/**
 * Renders Jasmine Blocks executed by spec.
 * @param {Jasmine.spec} spec The spec.
 * @param {HTMLElement} panelsEl The HTMLElement which encapsulate the tools panels.
 */
Test.panel.Blocks = function (config) {
    var blocks = config.spec.queue.blocks,
        length = blocks.length,
        cls = "panel blocks",
        children = [],
        i, block, codeHighLighter;

    for (i = 0; i < length; i++) {
        block = blocks[i];
        if (block.func) {
            children.push({
                cls: "blockTitle " + (block.func.typeName || "specSources"),
                html: block.func.typeName || 'it("' + jasmine.util.htmlEscape(config.spec.description) + '")'
            });

            codeHighLighter = new Test.CodeHighLighter({
                source: block.func.toString()
            });

            children.push({
                cls: "sources",
                html: codeHighLighter.renderJsSources()
            });
        }
    }

    this.el = new jasmine.Dom({
        cls: cls,
        children: children
    });

    return this;
};

Test.panel.Blocks.prototype.remove = function () {
    this.el.parentNode.removeChild(this.el);
};
