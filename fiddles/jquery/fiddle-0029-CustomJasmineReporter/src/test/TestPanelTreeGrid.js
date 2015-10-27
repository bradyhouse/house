/**
 * @class Test.panel.TreeGrid
 * Creates and renders reporter treegrid.
 * @param {Object} config The configuration object.
 */
Test.panel.TreeGrid = function (config) {
    var me = this;
    me.options = Test.Options.get();

    me.el = document.body.appendChild(new jasmine.Dom({
        tag: "div",
        cls: "treegrid",
        ondblclick: function (e) {
            me.onDoubleClick(e);
        },
        onmousedown: function () {
            me.onMouseDown.apply(me, arguments);
        },
        onmouseup: function () {
            me.onMouseUp.apply(me, arguments);
        },
        onmousemove: function () {
            me.onMouseMove.apply(me, arguments);
        },
        children: [{
            cls: "header",
            children: [{
                cls: "logo",
                html: "Sencha"
            }, {
                cls: 'headerBar',
                children: [{
                    cls: "statusMessage",
                    children: [{
                        tag: 'span',
                        html: '&#160;'
                    }, {
                        // This is the actual *progressBar* -- it fills up to 100% and
                        // is then hidden.
                        cls: 'progressBar passed'
                    }, {
                        // This is actually the bottom border of the status area when
                        // done but is the unfinished part of the progressBar during the
                        // run.
                        cls: 'progressBar'
                    }]
                }, {
                    cls: 'runActions',
                    children: [{
                        tag: "span",
                        cls: "runLabel",
                        html: "Run:"
                    }, {
                        tag: "a",
                        cls: "actionLink run-failed",
                        html: "Failed",
                        onclick: function () {
                            Test.Options.runFailed.apply(me, arguments);
                        }
                    }, {
                        tag: "a",
                        cls: "actionLink run-checked",
                        html: "Checked",
                        onclick: function () {
                            Test.Options.reloadWindow();
                        }
                    }, {
                        tag: "a",
                        cls: "actionLink run-all",
                        html: "All",
                        onclick: function () {
                            Test.Options.reloadWindow(true);
                        }
                    }]
                }]
            }, {
                cls: "toolBar",
                children: [{
                    tag: "span",
                    cls: "options",
                    children: [
                        Test.Options.renderCheckbox("showPassed", "Show passed"),
                        Test.Options.renderCheckbox("showDisabled", "Show disabled"),
                        Test.Options.renderCheckbox("collapseAll", "Collapse all"),
                        Test.Options.renderCheckbox("disableTryCatch", "No Jasmine try/catch"),
                        //Test.Options.renderCheckbox("disableBodyClean", "Disable Body Autoclean"),
                        //Test.Options.renderCheckbox("disableCacheBuster", "Disable CacheBuster"),
                        //Test.Options.renderCheckbox("showTimings", "Show Timings"),
                        //Test.Options.renderCheckbox("verbose", "Show jasmine logs"),
                        //Test.Options.renderCheckbox("autoReload", "Automatic reload"),
                        //Test.Options.renderCheckbox("quirksMode", "Quirks Mode")
                    ]
                }]
            }]
        }, {
            tag: "div",
            cls: "tbody",
            onclick: function () {
                me.onBodyClick.apply(me, arguments);
            }
        }, {
            cls: "resizer",
            html: "&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;"
        }]
    }));
    me.tabPanel = new Test.panel.TabPanel({
        container: me.el
    });

    Test.Options.check();
    me.header = me.el.childNodes[0];
    var topBar = me.header.childNodes[1];
    me.statusMessage = topBar.childNodes[0];
    me.progressBar = me.statusMessage.childNodes[1];
    me.toolBar = me.header.childNodes[2];
    me.body = me.el.childNodes[1];
    me.resizer = me.el.childNodes[2];

    me.suites = {};
    me.specs = {};
    me.suitesEls = {};
    me.specsEls = {};
    if (me.options.resizer) {
        me.tabPanel.resize(parseInt(me.options.resizer, 10));
    }
    me.resizeBody();
    window.onresize = function () {
        me.resizeBody();
    };
};

/**
 * Renders suite htmlElement.
 * @param {jasmine.Suite} suite The jasmine suite.
 * @return {HTMLElement} The suite HTMLElement
 */
Test.panel.TreeGrid.prototype.addSuite = function (suite) {
    var options = {},
        parent = suite.parentSuite,
        padding = 18,
        prefix = suite.isDisabled() ? "xdescribe :" : "describe: ",
        cls = "noexpand",
        row, property;

    if (suite.children_.length !== 0) {
        cls = this.options.collapseAll ? "expand" : "collapse";
    }

    if (parent) {
        this.suitesEls[parent.id] || this.addSuite(parent);
        while (parent) {
            padding += 18;
            parent = parent.parentSuite;
        }
    }
    row = this.createRow(this.options.collapseAll && suite.parentSuite, suite);
    for (property in this.options) {
        if (!this.options.hasOwnProperty(property)) {
            continue;
        }
        options[property] = this.options[property];
    }

    options.suite = suite.id;
    delete options.spec;

    this.suitesEls[suite.id] = new jasmine.Dom({
        tag: "div",
        id: "suite-" + suite.id,
        cls: "suite" + (suite.isDisabled() ? " disabled" : "") + (padding === 18 ? " parent-suite" : ""),
        style: {
            "paddingLeft": padding + "px"
        },
        children: [{
            cls: cls
        }, {
            tag: "span",
            cls: "description",
            html: prefix + suite.description
        }]
    });

    row.appendChild(this.suitesEls[suite.id]);
    var clear = new jasmine.Dom({tag: 'div'});
    clear.style.clear = 'both';
    row.appendChild(clear);
    this.suites[suite.id] = suite;

    return this.suitesEls[suite.id];
};

/**
 * Updates suite dom element by adding a code coverage percentage to it's description.
 * @param {HTMLElement} The suite dom element.
 * @param {jasmine.Suite} The jasmine suite.
 */
Test.panel.TreeGrid.prototype.updateSuiteEl = function (suite, text) {
    var description = this.suitesEls[suite.id].childNodes[1];
    jasmine.Dom.setHTML(description, description.innerHTML + text);
};

/**
 * Renders spec htmlElement.
 * @param {jasmine.Spec} spec The jasmine spec.
 * @return {HTMLElement} The spec HTMLElement
 */
Test.panel.TreeGrid.prototype.addSpec = function (spec) {
    var options = {},
        padding = 18,
        suite = spec.suite,
        suffix = spec.time ? " (" + spec.time + "s)" : "",
        row, prefix, status, property, specEl, resultPanel;

    if (spec.isEnabled()) {
        prefix = "it ";
        status = spec.results().passed() ? "passed" : "failed";
    } else {
        prefix = "xit ";
        status = "disabled";
    }

    if (suite) {
        this.suitesEls[suite.id] || this.addSuite(suite);
        while (suite) {
            padding += 18;
            suite = suite.parentSuite;
        }
    }

    row = this.createRow(this.options.collapseAll, spec);
    for (property in this.options) {
        if (this.options.hasOwnProperty(property)) {
            options[property] = this.options[property];
        }
    }

    options.spec = spec.id;
    delete options.suite;

    specEl = {
        id: "spec-" + spec.id,
        cls: "spec " + status,
        style: {
            "paddingLeft": padding + "px"
        },
        children: [{
            cls: this.options.collapseAll ? "expand" : "collapse"
        }, {
            tag: "span",
            cls: "description",
            html: prefix + spec.description + suffix
        }]
    };

    resultPanel = this.renderSpecResults(spec);
    if (this.options.collapseAll) {
        resultPanel.style.display = "none";
    }

    if (resultPanel.innerHTML === "") {
        specEl.children[0].cls = "noexpand";
    }

    specEl.children.push(resultPanel);

    specEl = new jasmine.Dom(specEl);
    this.specsEls[spec.id] = specEl;
    this.specs[spec.id] = spec;
    row.appendChild(specEl);
    jasmine.Dom.addCls(row, status);
    var clear = new jasmine.Dom({tag: 'div'});
    clear.style.clear = 'both';
    row.appendChild(clear);

    if (resultPanel.scrollHeight > 26) {
        jasmine.Dom.addCls(row, 'results-collapsed')
    }
};

/**
 * Returns a suite by id.
 * @param {String/Number} id The suite id.
 * @return {jasmine.Suite} The jasmine suite.
 */
Test.panel.TreeGrid.prototype.getSuite = function (id) {
    return this.suites[parseInt(id, 10)];
};

/**
 * Returns a spec by id.
 * @param {String/Number} id The spec id.
 * @return {jasmine.Spec} The jasmine spec.
 */
Test.panel.TreeGrid.prototype.getSpec = function (id) {
    return this.specs[parseInt(id, 10)];
};

/**
 * Body elements click event dispatcher.
 */
Test.panel.TreeGrid.prototype.onBodyClick = function (event) {
    event = event || window.event;
    var el = event.target || event.srcElement,
        cls = el.className,
        i;

    if (cls) {
        if (jasmine.Dom.hasCls(el, "results-expander")) {
            return;
        }

        if (jasmine.Dom.hasCls(el, "collapse")) {
            this.onCollapse(el);
            return;
        }

        if (jasmine.Dom.hasCls(el, "expand")) {
            this.onExpand(el);
            return;
        }
        if (jasmine.Dom.hasCls(el, "select-checkbox")) {
            this.onCheck(el);
            return;
        }
        for (i = 0; i < 6; i++) {
            if (cls && jasmine.Dom.hasCls(el, "row")) {
                this.onRowClick(el);
                return;
            }
            el = el.parentNode;
            if (!el) {
                break;
            }
            cls = el.className;
        }
    }
};

/**
 * Checkboxes listener.
 */
Test.panel.TreeGrid.prototype.onCheck = function (el) {
    var next = el.parentNode.nextSibling,
        id;

    if (jasmine.Dom.hasCls(next, "spec")) {
        id = parseInt(next.id.replace("spec-", ""), 10);
        if (el.checked) {
            if (jasmine.array.indexOf(this.options.specs, id) === -1) {
                this.options.specs.push(id);
            }
        } else {
            jasmine.array.remove(this.options.specs, id);
        }
    } else {
        id = parseInt(next.id.replace("suite-", ""), 10);
        if (el.checked) {
            if (jasmine.array.indexOf(this.options.suites, id) === -1) {
                this.options.suites.push(id);
            }
        } else {
            jasmine.array.remove(this.options.suites, id);
        }
    }
};

/**
 * Returns row dom element by spec or suite.
 * @param {jasmine.Suite/jasmine.Spec} o A suite or a spec.
 * @return {HTMLElement} The row dom element.
 */
Test.panel.TreeGrid.prototype.getRow = function (o) {
    if (!o.suite && this.suitesEls[o.id]) {
        return this.suitesEls[o.id].parentNode;
    } else if (this.specsEls[o.id]) {
        return this.specsEls[o.id].parentNode;
    }
};

/**
 * Iterates nested rows calling the supplied function.
 * @param {HTMLElement} row The row.
 * @param {Function} fn The function.
 * @param {Boolean} recursive recurse in all children suite (default to true)
 */
Test.panel.TreeGrid.prototype.onEachRow = function (row, fn, recursive) {
    var me = this,
        id = row.childNodes[1].id,
        traverse = function (s, func) {
            var children = s.children_,
                i, child, length, r;

            if (children) {
                length = children.length;
                for (i = 0; i < length; i++) {
                    child = children[i];
                    r = me.getRow(child);
                    if (r) {
                        func.call(me, r, child);
                        if (child.children_ && recursive !== false) {
                            traverse(child, func);
                        }
                    }
                }
            }
        },
        spec, suite;

    if (id.search("suite") !== -1) {
        suite = this.getSuite(id.replace("suite-", ""));
        traverse(suite, fn);
    } else {
        spec = this.getSpec(id.replace("spec-", ""));
        traverse(spec, fn);
    }
};

/**
 * Collapse click handler.
 */
Test.panel.TreeGrid.prototype.onCollapse = function (el) {
    el = el.parentNode;
    jasmine.Dom.setCls(el.childNodes[0], "expand");

    if (jasmine.Dom.hasCls(el, "suite")) {
        this.onEachRow(el.parentNode, function (row, o) {
            var childNode = row.childNodes[1],
                icon = childNode.childNodes[0],
                content = childNode.childNodes[2];

            row.style.display = "none";
            if (jasmine.Dom.hasCls(icon, "collapse")) {
                jasmine.Dom.setCls(icon, "expand");
            }
            if (o.suite) {
                content.style.display = "none";
            }
        });
    } else {
        el.childNodes[2].style.display = "none";
    }
};

/**
 * Expand click handler.
 */
Test.panel.TreeGrid.prototype.onExpand = function (el) {
    el = el.parentNode;
    jasmine.Dom.setCls(el.childNodes[0], "collapse");

    if (jasmine.Dom.hasCls(el, "suite")) {
        this.onEachRow(el.parentNode, function (row, o) {
            row.style.display = "block";
        }, false);
    } else {
        el.childNodes[2].style.display = "block";
    }
};

/**
 * Row click click handler.
 */
Test.panel.TreeGrid.prototype.onRowClick = function (el) {
    var rows = el.parentNode.childNodes,
        length = rows.length,
        id, i;

    for (i = 0; i < length; i++) {
        jasmine.Dom.removeCls(rows[i], "selected");
    }
    jasmine.Dom.addCls(el, "row selected");
    id = el.childNodes[1].id;

    if (id.search("spec") !== -1) {
        this.tabPanel.setSpec(this.getSpec(id.replace("spec-", "")));
    }
    if (id.search("suite") !== -1) {
        this.tabPanel.setSuite(this.getSuite(id.replace("suite-", "")));
    }
};

/**
 * Creates row dom element.
 * @param {Boolean} hide Sets the row visibility.
 * @param {jasmine.Suite/jasmine.Spec} The suite or the spec.
 * @return {HTMLElement} The row.
 */
Test.panel.TreeGrid.prototype.createRow = function (hide, o) {
    var row = this.body.appendChild(new jasmine.Dom({
        tag: "div",
        cls: "row",
        style: {
            display: hide ? "none" : "block"
        },
        children: [{
            cls: "checkbox-col",
            children: [{
                tag: "input",
                cls: "select-checkbox",
                type: "checkbox"
            }]
        }]

    }));

    if (Test.Options.isChecked(o)) {
        row.childNodes[0].childNodes[0].checked = true;
    }

    return row;
};

/**
 * Resizer
 */

Test.panel.TreeGrid.prototype.onDoubleClick = function (event) {
    var el;

    event = event || window.event;
    el = event.target || event.srcElement;

    if (jasmine.Dom.hasCls(el, "resizer")) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        this.options.resizer = 0;
        this.tabPanel.el.style.height = '0';
        this.resizeBody();
    }
};

/**
 * MouseDown event listener. (resizing starts)
 */
Test.panel.TreeGrid.prototype.onMouseDown = function (event) {
    var el;

    event = event || window.event;
    el = event.target || event.srcElement;

    if (jasmine.Dom.hasCls(el, "resizer")) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        this.pageY = event.pageY || event.clientY;

        this.startHeight = this.tabPanel.el.clientHeight;
        document.body.style.cursor = "row-resize";
    }
};

/**
 * MouseDown event listener. (resize in progress)
 */
Test.panel.TreeGrid.prototype.onMouseMove = function (event) {
    var el, diff;
    if (this.pageY) {
        event = event || window.event;
        el = event.target || event.srcElement;
        diff = Math.max(200, this.startHeight - ((event.pageY || event.clientY) - this.pageY));
        diff = Math.min(diff, document.body.clientHeight - 200);

        this.tabPanel.resize(diff);
        this.options.resizer = diff;
        this.resizeBody();
    }
};

/**
 * MouseUp event listener. (resize ends)
 */
Test.panel.TreeGrid.prototype.onMouseUp = function (event) {
    document.body.style.cursor = "auto";
    delete this.pageY;
};


/**
 * Returns treegrid innerHeight.
 * @return {Number} The innerHeight.
 */
Test.panel.TreeGrid.prototype.getInnerHeight = function () {
    return (window.innerHeight || document.documentElement.clientHeight) - this.header.offsetTop * 2;
};

/**
 * Resizes treegrid.
 */
Test.panel.TreeGrid.prototype.resizeBody = function () {
    var height = this.getInnerHeight();

    height -= this.resizer.offsetHeight + this.tabPanel.el.offsetHeight + this.header.offsetHeight;
    height -= 2;
    height = Math.max(30, height);
    this.body.style.height = height + 'px';
};

/**
 * End of Resizer
 */


/**
 * Results expander click toggle handler.
 * @param {Event} event The event
 */
Test.panel.TreeGrid.prototype.onExpanderClick = function (resultsEl, e) {
    var el = e.target || e.srcElement,
        expanderCollapseCls = 'expander-collapse',
        resultsExpandedCls = 'results-expanded',
        isCollapsed = jasmine.Dom.hasCls(el, expanderCollapseCls) ? 'removeCls' : 'addCls';

    jasmine.Dom[isCollapsed](el, expanderCollapseCls);
    jasmine.Dom[isCollapsed](resultsEl, resultsExpandedCls);
};

/**
 * Renders specs results.
 * @param {jasmine.Spec} spec The spec.
 * @return {HTMLElement} The spec results dom element.
 */
Test.panel.TreeGrid.prototype.renderSpecResults = function (spec) {
    var me = this,
        resultItems = spec.results().getItems(),
        length = resultItems.length,
        resultsEl,
        resultEl,
        result,
        i;

    resultsEl = new jasmine.Dom({
        cls: "results",
        children: [{
            cls: 'results-expander expander-expand',
            onclick: function (e) {
                e = e || window.event;
                me.onExpanderClick.apply(me, [resultsEl, e]);
            }
        }]
    });

    for (i = 0; i < length; i++) {
        result = resultItems[i];
        if (result.type === "expect" && result.passed) {

            if (!result.passed()) {
                resultEl = this.renderFailedResult(result);
            } else {
                resultEl = this.renderPassedResult(result);
            }
            if (i === 0) {
                jasmine.Dom.addCls(resultEl, "first");
            }

            resultsEl.appendChild(resultEl);

            if (result.error) {
                break;
            }
        }
    }

    return resultsEl;
};

/**
 * Renders failed spec result.
 * @param {Object} result The spec result.
 * @return {HTMLElement} The spec result message HTMLElement
 */
Test.panel.TreeGrid.prototype.renderFailedResult = function (result) {
    var message = result.message,
        children;

    children = [{
        cls: "prettyPrint",
        html: jasmine.util.htmlEscape(message)
    }];

    return new jasmine.Dom({
        cls: "resultMessage fail",
        children: children
    });
};


/**
 * Renders failed spec result.
 * @param {Object} result The spec result.
 * @return {HTMLElement} The spec result message HTMLElement
 */
Test.panel.TreeGrid.prototype.renderPassedResult = function (result) {
    var children = [{
        cls: "prettyPrint",
        html: "Actual: " + jasmine.pp(result.actual) + "\nExpected: " + jasmine.pp(result.expected) + "\nMatcher: " + result.matcherName + "."
    }];

    return new jasmine.Dom({
        cls: "resultMessage pass",
        children: children
    });
};

/**
 * Returns tabPanel console.
 */
Test.panel.TreeGrid.prototype.getInfoPanel = function () {
    return this.tabPanel.children[0];
};

/**
 * Print a message into info console.
 * @param {String} message The message.
 * @param {String} cls (optional) an extra cls to add to the message.
 */
Test.panel.TreeGrid.prototype.log = function (message, cls) {
    //this.getInfoPanel().log(message, cls);
};

/**
 * Sets statubar message, this method can also add a className.
 * @param {String} message The message.
 * @param {String} cls The className (optional).
 */
Test.panel.TreeGrid.prototype.setStatus = function (message, cls) {
    jasmine.Dom.setHTML(this.statusMessage.firstChild, message);
    if (cls) {
        jasmine.Dom.addCls(this.statusMessage, cls);
    }
    // Some test (somehow) cause the body to scroll, so fix it
    document.body.scrollTop = 0;
};
