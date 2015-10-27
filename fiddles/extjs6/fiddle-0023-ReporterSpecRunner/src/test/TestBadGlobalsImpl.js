/**
 * Init allowedGlobals array.
 */
Test.BadGlobalsImpl = function (reporter) {
    this.results = [];
};

Test.BadGlobalsImpl.prototype.setup = function () {
    var me = this,
        win = Test.SandBox.getWin(),
        property;

    // whitelist support
    win.addGlobal = function () {
        me.addGlobal.apply(me, arguments);
    };

    me.allowedGlobals = {};
    for (property in win) {
        me.allowedGlobals[property] = true;
    }
    // add firebug globals variables to white list
    me.allowedGlobals._firebug = true;
    me.allowedGlobals._createFirebugConsole = true;
    me.allowedGlobals.loadFirebugConsole = true;
    me.allowedGlobals.console = true;
};


/**
 * Append to suite HTMLElement warning messages if improper global variables are found.
 * @param {HTMLElement} suiteEl The suite HTMLElement.
 */
Test.BadGlobalsImpl.prototype.report = function (info, suite) {
    var allowedGlobals = this.allowedGlobals,
        win = Test.SandBox.getWin(),
        property, message, value;

    for (property in win) {
        if (!allowedGlobals[property]) {
            value = jasmine.pp(win[property]);
            message = ">> Bad global variable found in " + (suite ? suite.description : "global scope") + "<br/>" + property + " = " + value;
            info.log(message, "warning");
            this.results[property] = {
                where: (suite ? ('in suite' + suite.description) : "global scope"),
                value: value
            };
            allowedGlobals[property] = true;
        }
    }
};

Test.BadGlobalsImpl.prototype.addGlobal = function (property) {
    this.allowedGlobals[property] = true;
};

if (!jasmine.browser.isIE && !jasmine.browser.isOpera) {
    Test.BadGlobals = new Test.BadGlobalsImpl();
}
