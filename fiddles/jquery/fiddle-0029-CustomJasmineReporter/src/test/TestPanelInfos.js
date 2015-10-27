/**
 * Renders infos panel.
 */
Test.panel.Infos = function () {
    this.el = new jasmine.Dom({
        tag: "div",
        cls: "panel infos",
        children: [{
            cls: "logs"
        }]
    });
    this.logs = this.el.childNodes[0];
    this.persist = true;
    return this;
};

/**
 * Print a message into console.
 * @param {String} message The message.
 * @param {String} cls (optional) an extra cls to add to the message.
 */
Test.panel.Infos.prototype.log = function (message, cls) {
    var log = this.logs.appendChild(new jasmine.Dom({
        cls: "infoMessage",
        html: message
    }));

    if (cls) {
        jasmine.Dom.addCls(log, cls);
    }
};
