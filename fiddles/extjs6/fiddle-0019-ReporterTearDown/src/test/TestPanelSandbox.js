/**
 * Renders spec dom sandbox tool.
 * @param {Jasmine.spec} spec The spec.
 * @param {HTMLElement} panelsEl The HTMLElement which encapsulate the tools panels.
 */
Test.panel.Sandbox = function (config) {
    this.persist = true;

    this.render();

    return this;
};

/**
 * Renders spec dom sandbox innerHTML.
 * @return {HTMElement} The formatted dom sandbox innerHTML.
 */
Test.panel.Sandbox.prototype.render = function () {
    this.el = new jasmine.Dom({
        //cls: "panel sandbox hideMe"
        cls: "panel sandbox"
    });
};
