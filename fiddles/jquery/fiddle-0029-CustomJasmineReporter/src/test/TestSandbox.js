Test.SandBoxImpl = function () {
};

Test.SandBoxImpl.prototype.domReady = function (fn) {
    if (document.addEventListener) {
        window.addEventListener('load', fn, false);
    } else {
        window.attachEvent('onload', fn, false);
    }
};

Test.SandBoxImpl.prototype.setup = function (config) {
    var me = this;
    me.requires = config.requires;
    me.domReady(function () {
        me.reporter = new Test.Reporter();
        me.createIframe();
    });
};

Test.SandBoxImpl.prototype.createIframe = function () {
    var me = this,
        iframe,
        win,
        doc;

    me.options = Test.Options.get();


    var src = me.options.quirksMode ? 'iframe-quirks.html?loadSpecs=true' : 'iframe.html?loadSpecs=true';

    src += '&compiled=' + !!me.options.compiled;

    if (me.options.specsset) {
        src += '&specsset=' + me.options.specsset;
    }

    /*iframe = new jasmine.Dom({
        tag: "iframe",
        id: 'sandboxIframe',
        cls: "sandboxIframe",
        name: "sandbox",
        frameBorder: 0,
        src: src
    });*/
    iframe = new jasmine.Dom({
        tag: "div",
        id: 'sandboxIframe',
        cls: "sandboxIframe",
        name: "sandbox"
    });

    me.reporter.getIframeContainer().appendChild(iframe);

    win = iframe.contentWindow || window.frames[iframe.name];
    this.iframe = iframe;
    this.win = win;
};

Test.SandBoxImpl.prototype.getIframe = function () {
    return this.iframe;
};

Test.SandBoxImpl.prototype.getWin = function () {
    return this.win;
};

Test.SandBoxImpl.prototype.getDoc = function () {
    return this.getIframe().contentDocument || this.getWin().document;
};

Test.SandBoxImpl.prototype.getBody = function () {
    return this.getDoc().body;
};

Test.SandBoxImpl.prototype.getHead = function () {
    return this.getDoc().getElementsByTagName("head")[0];
};

Test.SandBoxImpl.prototype.save = function (spec) {
    var doc = this.getDoc(),
        body = this.getBody(),
        children = body && body.childNodes || [],
        length = children.length,
        i = 0,
        child,
        lwas = this.lengthWas || (this.lengthWas = 0);

    if (!this.options || !this.options.disableBodyClean) {
        //this.clearComponents();
        //this.clearDomElements();
    }

    if (length != lwas) {
        if (!window.headless) {
            this.reporter.log(">> Warning the document.body dom element contains childNodes after spec execution !<br/>" +
                "Spec : " + jasmine.util.htmlEscape(spec.getFullName()) + ' <a href="?' +
                Test.Options.urlEncode({
                    specs: [spec.id],
                    suites: [],
                    disableBodyClean: true
                }) + '">Load this spec only and disable body autoclean</a><br/>',
                "warning");
        } else {
            this.reporter.log("Warning: " + spec.getFullName() + "doesn't clean properly the document.body.");
        }
        this.lengthWas = length;
    }

};

Test.SandBoxImpl.prototype.clearDomElements = function () {
    var doc = this.getDoc(),
        bd = this.getBody(),
        children = bd.childNodes,
        length = children.length,
        i, child;

    if (!this.options.disableBodyClean) {
        for (i = 0; i < length; i++) {
            child = children[i];
            if (child) {
                bd.removeChild(child);
            }
        }
    }
}

Test.SandBoxImpl.prototype.clearComponents = function () {
    var me = this,
        win = me.getWin(),
        comps, c, len, i;

    if (win.Ext && win.Ext.ComponentManager) {
        comps = win.Ext.ComponentManager.all.getArray();
        len = comps.length;
        for (i = 0; i < len; i++) {
            c = comps[i];
            c.destroy();
        }
    }
};

Test.SandBoxImpl.prototype.isRunning = function () {
    return !this.getWin().jasmine.getEnv().currentRunner_.queue.isRunning();
};

Test.SandBoxImpl.prototype.iScope = function (o) {
    if (typeof o === "function") {
        o = "(" + o.toString() + ")();";
    }
    return Test.SandBox.getWin().eval(o);
};

Test.SandBox = new Test.SandBoxImpl();
var iScope = Test.SandBox.iScope;
