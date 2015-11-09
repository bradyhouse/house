(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)return a(o, !0);
                if (i)return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
        app.metadata = app.metadata || {
                gitHubUrl: 'https://github.com/bradyhouse/house/tree/master/fiddles/svg/fiddle-0024-Clock'
            };

    }, {}], 2: [function (require, module, exports) {

        app.view = app.view || {};
        app.view.button = app.view.button || {};
        app.view.button.mixin = app.view.button.mixin || {};
        app.view.clock = app.view.clock || {};
        app.view.clock.mixin = app.view.clock.mixin || {};

    }, {}], 3: [function (require, module, exports) {

        var a = require('./metadata.js'),
            b = require('./namespaces.js');


    }, {"./metadata.js": 1, "./namespaces.js": 2}]
}, {}, [3]);
