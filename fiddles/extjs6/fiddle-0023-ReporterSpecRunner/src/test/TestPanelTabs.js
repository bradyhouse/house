/**
 * @class Test.panel.TabPanel
 * Renders inspection tools htmlElement.
 * @param {Object} config The configuration object.
 */
Test.panel.TabPanel = function (config) {
    var me = this;

    me.options = Test.Options.get();

    me.spec = config.spec;
    me.container = config.container;
    me.el = new jasmine.Dom({
        cls: "tabpanel",
        onclick: function () {
            me.onTabPanelClick.apply(me, arguments);
        },
        children: [{
            cls: "toolBar"
        }, {
            cls: "panels"
        }]
    });

    me.toolbar = me.el.childNodes[0];
    me.body = me.el.childNodes[1];

    me.children = [];
    me.tabs = [];


    me.container.appendChild(me.el);
    me.renderToolBar();
    //me.add(new Test.panel.Infos({}));
    me.add(new Test.panel.Sandbox({}));

    if (me.options.panel) {
        me.activatePanel(me.options.panel);
    }

    return me;
};

/**
 * Adds a panel.
 * @param {Object} panel the panel to be added to this tabPanel.
 */
Test.panel.TabPanel.prototype.add = function (panel) {
    if (panel.el) {
        this.body.appendChild(panel.el);
    }
    if (panel.afterRender) {
        panel.afterRender();
    }
    this.children.push(panel);

    if (panel.afterRender) {
        panel.afterRender();
    }
};

/**
 * Adds a tab
 * @param {Object} panel the panel to be added to this tabPanel.
 */
Test.panel.TabPanel.prototype.addTab = function (cls, name, persist) {
    var el = this.toolbar.appendChild(new jasmine.Dom({
        tag: "span",
        cls: "toolbarTab " + cls,
        html: name
    }));

    this.tabs.push({
        el: el,
        persist: persist
    });
};

/**
 * Activate a tool panel and render it if needed.
 * @param {String} cls The panel className.
 */
Test.panel.TabPanel.prototype.activatePanel = function (cls) {
    var children = this.children,
        length = children.length,
        rendered = false,
        child, i;

    for (i = 0; i < length; i++) {
        child = children[i].el;
        jasmine.Dom.addCls(child, "hideMe");
        if (jasmine.Dom.hasCls(child, cls)) {
            jasmine.Dom.removeCls(child, "hideMe");
            if (children[i].persist && cls !== "jsCoverageSummary") {
                this.options.panel = cls;
            } else {
                delete this.options.panel;
            }
            rendered = true;
        }
    }

    if (rendered) {
        return;
    }

    if (this.spec) {
        if (cls === "blocks") {
            this.add(new Test.panel.Blocks({
                spec: this.spec
            }));
        }

        if (cls === "stackTrace") {
            this.add(new Test.panel.StackTrace({
                spec: this.spec
            }));
        }
    }

    if (this.suite && this.suite.jscoverage) {
        if (cls === "jsCoverage") {
            this.add(new Test.panel.jsCoverage({
                suite: this.suite
            }));
        }
    }
};

/**
 * Reporter HTMLElement click dispatcher.
 * @param {Event} event The event
 */
Test.panel.TabPanel.prototype.onTabPanelClick = function (event) {
    var el;
    event = event || window.event;
    el = event.target || event.srcElement;

    if (jasmine.Dom.hasCls(el, "toolbarTab")) {
        this.onTabClick(el);
    }
};

/**
 * Handle spec tools tab click.
 * @param {HTMLElement} el The tab HTMLElement.
 */
Test.panel.TabPanel.prototype.onTabClick = function (el) {
    var tools, panels, length, child, i;

    jasmine.Dom.addCls(el, "selected");

    tools = this.toolbar.childNodes;
    panels = this.body.childNodes;

    length = tools.length;
    for (i = 0; i < length; i++) {
        child = tools[i];
        if (child != el) {
            jasmine.Dom.removeCls(child, "selected");
        }
    }
    this.activatePanel(el.className.split(" ")[1]);
};


/**
 * Renders inspection tabpanel toolbar which contain tabs.
 * @param {jasmine.Spec} spec The jasmine spec.
 * @param {HTMLElement} toolBarEl The toolbar HTMLElement
 */
Test.panel.TabPanel.prototype.renderToolBar = function () {
    var spec = this.spec,
        suite = this.suite,
        toolbar = this.toolbar;

    if (this.tabs.length === 0) {
        this.addTab("infos selected", "Console", true);
        this.addTab("sandbox", "Iframe", true);
    } else {
        jasmine.Dom.addCls(this.tabs[0].el, "selected");
    }

    if (spec) {
        this.addTab("blocks", "Blocks");

        if (!jasmine.browser.isIE && !jasmine.browser.isOpera && this.spec.hasError) {
            this.addTab("stackTrace", "Stack Trace");
        }
    }

    if (suite && suite.jscoverage) {
        this.addTab("jsCoverage", "Suite Coverage");
    }
};

/**
 * Removes all non-persistant tabs.
 */
Test.panel.TabPanel.prototype.resetToolBar = function () {
    var children = this.tabs,
        length = children.length,
        child, i;

    for (i = length - 1; i >= 0; i--) {
        child = children[i];
        if (!child.persist) {
            this.toolbar.removeChild(child.el);
            jasmine.array.remove(children, child);
        }
        jasmine.Dom.removeCls(child.el, "selected");
    }

    this.renderToolBar();
};

/**
 * Removes all non-persistant panels.
 */
Test.panel.TabPanel.prototype.resetPanels = function () {
    var children = this.children,
        length = children.length,
        child, i;

    for (i = length - 1; i >= 0; i--) {
        child = children[i];
        if (!child.persist) {
            child.remove();
            jasmine.array.remove(children, child);
        }
        jasmine.Dom.addCls(child.el, "hideMe");
    }

    if (children[0]) {
        jasmine.Dom.removeCls(children[0].el, "hideMe");
    }
};

/**
 * Sets TabPanel current spec.
 */
Test.panel.TabPanel.prototype.setSpec = function (spec) {
    this.spec = spec;
    delete this.suite;
    this.resetToolBar();
    this.resetPanels();
};

/**
 * Sets TabPanel current suite.
 */
Test.panel.TabPanel.prototype.setSuite = function (suite) {
    this.suite = suite;
    delete this.spec;
    this.resetToolBar();
    this.resetPanels();
};

/**
 * Resize TabPanel dom element.
 */
Test.panel.TabPanel.prototype.resize = function (val) {
    this.el.style.height = val + "px";
    this.body.style.height = val - 40 + "px";
};

/**
 * Adds jscoverage persistant panel.
 */
Test.panel.TabPanel.prototype.addCoverageSummary = function () {
    this.addTab("jsCoverageSummary", "Coverage Summary", true);
    this.add(new Test.panel.jsCoverageSummary({}));
};

