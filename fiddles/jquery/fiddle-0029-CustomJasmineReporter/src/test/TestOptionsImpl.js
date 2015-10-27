Test.OptionsImpl = function () {
    this.optionCheckBoxesEl = {};
    this.options = this.urlDecode(window.location.search.substring(1));
    this.options.remote = window.location.toString().search("http:") !== -1;
    this.startAutoReloadTask();

};

Test.OptionsImpl.prototype.get = function () {
    return this.options;
};

/**
 * Takes an object and converts it to an encoded URL.
 * @param {Object} o The object to encode
 * @return {String}
 */
Test.OptionsImpl.prototype.urlEncode = function (object) {
    var buf = [],
        e = encodeURIComponent,
        value, property, length, i;

    for (property in object) {
        if (!object.hasOwnProperty(property)) {
            continue;
        }
        value = object[property];
        if (jasmine.isArray_(value)) {
            length = value.length;
            for (i = 0; i < length; i++) {
                buf.push(property + '=' + e(value[i]));
            }
        } else {
            buf.push(property + '=' + e(value));
        }
    }
    return buf.join('&');
};

Test.hashString = function (s, hash) {
    hash = hash || 0;

    // see http://www.cse.yorku.ca/~oz/hash.html
    for (var c, i = 0, n = s.length; i < n; ++i) {
        c = s.charCodeAt(i);
        hash = c + (hash << 6) + (hash << 16) - hash;
    }

    return hash;
};

/**
 * Takes an encoded URL and and converts it to an object. Example:
 * @param {String} string
 * @return {Object} A literal with members
 */
Test.OptionsImpl.prototype.urlDecode = function (string) {
    var obj = {},
        pairs, d, name, value, pair, i, length;

    if (string != "") {
        pairs = string.split('&');
        d = decodeURIComponent;
        length = pairs.length;
        for (i = 0; i < length; i++) {
            pair = pairs[i].split('=');
            name = d(pair[0]);
            value = d(pair[1]);
            obj[name] = !obj[name] ? value : [].concat(obj[name]).concat(value);
        }
    }
    function parseStringOrId(str) {
        var id = parseInt(str, 10);
        if (String(id) !== str) {
            id = Test.hashString(str);
        }
        return id;
    }

    if (obj.specs) {
        obj.specs = jasmine.isArray_(obj.specs) ? obj.specs : [obj.specs];
        length = obj.specs.length;
        for (i = 0; i < length; i++) {
            obj.specs[i] = parseStringOrId(obj.specs[i]);
        }
    } else {
        obj.specs = [];
    }

    if (obj.suites) {
        obj.suites = jasmine.isArray_(obj.suites) ? obj.suites : [obj.suites];
        length = obj.suites.length;
        for (i = 0; i < length; i++) {
            obj.suites[i] = parseStringOrId(obj.suites[i]);
        }
    } else {
        obj.suites = [];
    }

    return obj;
};

/**
 * Renders option checkbox and label.
 * @param {String} name The option name.
 * @param {String} labelText The label text.
 * @return {HTMLElement} The option HTMLElement
 */
Test.OptionsImpl.prototype.renderCheckbox = function (name, labelText) {
    var me = this,
        checkbox = new jasmine.Dom({
            tag: "input",
            cls: "option " + name,
            id: name,
            type: "checkbox",
            onclick: function () {
                me.onCheckboxClick.apply(me, arguments);
            }
        });

    me.optionCheckBoxesEl[name] = checkbox;

    return new jasmine.Dom({
        tag: "span",
        cls: "show",
        children: [checkbox, {
            tag: "label",
            html: labelText,
            htmlFor: name
        }]
    });
};

/**
 * Checks options checkboxs if needed.
 */
Test.OptionsImpl.prototype.check = function () {
    var property, checkbox;

    for (property in this.options) {
        if (!this.options.hasOwnProperty(property)) {
            continue;
        }
        checkbox = this.optionCheckBoxesEl[property];
        if (checkbox) {
            checkbox.checked = this.options[property];
        }
    }
};

/**
 * Options checkbox check/uncked handler.
 * @param {HTMLElement} el The checkbox HTMLElement
 */
Test.OptionsImpl.prototype.onCheckboxClick = function (event) {
    var el, opt, row, length, i;
    event = event || window.event;
    el = event.target || event.srcElement;
    opt = el.className.split(" ")[1];
    if (el.checked) {
        this.options[opt] = true;
    } else {
        delete this.options[opt];
    }
};

/**
 * Reloads current page with reporter options.
 */
Test.OptionsImpl.prototype.reloadWindow = function (reset) {
    var options = this.options,
        encoded = this.urlEncode(options),
        location = window.location;

    if (reset) {
        options.specs = [];
        options.suites = [];
    }

    if (location.search === '?' + encoded) {
        location.reload();
    } else {
        location.search = encoded;
    }
};

/**
 * Reloads current page with reporter options.
 */
Test.OptionsImpl.prototype.runFailed = function () {
    var items = document.querySelectorAll(".checkbox-col"),
        specFails = document.querySelectorAll(".spec.failed"),
        specFailThreshold = 50,
        rowType = specFails.length > specFailThreshold ? 'parent-suite' : 'spec',
        jDom = jasmine.Dom,
        treeGrid = Test.panel.TreeGrid;

    // reset so as not to compete with any previously set checkboxes
    Test.Options.options.specs = [];
    Test.Options.options.suites = [];

    // loop through the rows
    for (var i = items.length; i--;) {
        var checkboxCol = items[i],
            next = checkboxCol.nextSibling,
            parent = checkboxCol.parentNode,
            checkbox = checkboxCol.firstChild;

        // if the row is the right type (spec or parent-suite) check the checkbox
        if (jDom.hasCls(next, rowType) && jDom.hasCls(parent, "failed")) {
            checkbox.checked = true;
            this.onCheck(checkbox);
        } else {  // else uncheck
            checkbox.checked = false;
        }
    }
    Test.Options.reloadWindow();
};


/**
 * Starts autoReload task.
 */
Test.OptionsImpl.prototype.startAutoReloadTask = function () {
    var me = this;
    if (me.options.autoReload) {
        var interval = setInterval(function () {
            if (Test.SandBox.isRunning()) {
                clearInterval(interval);

                setTimeout(function () {
                    me.reloadWindow();
                }, 2000);
            }
        }, 1500);
    }
};

Test.OptionsImpl.prototype.isChecked = function (o) {
    var specs = this.options.specs,
        suites = this.options.suites,
        id = o.id;

    if (o.suite) {
        return specs && jasmine.array.indexOf(specs, id) !== -1;
    } else {
        return suites && jasmine.array.indexOf(suites, id) !== -1;
    }

    return false;
};

Test.Options = new Test.OptionsImpl();
