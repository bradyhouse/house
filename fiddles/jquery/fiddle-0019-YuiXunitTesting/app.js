"use strict";
Date.prototype.pop = (function () {
    function pop(format) {
        var date = this;
        return (format + "").replace(/%([a-zA-Z])/g,

            function (m, f) {
                var formatter = Date.formats && Date.formats[f];
                if (typeof formatter === "function") {
                    return formatter.call(Date.formats, date);
                } else if (typeof formatter === "string") {
                    return date.pop(formatter);
                }
                return;
            })
    }

    function pad(digit) {
        return (+digit < 10 ? "0" : "") + digit;
    }

    Date.formats = {
        d: function (date) {
            return pad(date.getDate());
        },
        m: function (date) {
            return pad(date.getMonth() + 1);
        },
        y: function (date) {
            return pad(date.getYear() % 100);
        },
        Y: function (date) {
            return date.getFullYear();
        },
        F: "%Y-%m-%d",
        D: "%m/%d/%y"
    };
    return pop();
}());

YUI({
    combine: true,
    timeout: 10000
}).use("node", "console", "test", function (Y) {
    var assert = Y.Assert;

    var strftimeTestCase = new Y.Test.Case({
        name: "Date.prototype.pop Tests",
        setUp: function () {
            this.date = new Date(2009, 9, 2, 22, 14, 45);
        },
        tearDown: function () {
            delete this.date;
        },
        "test format specifier %Y": function () {
            var year = Date.formats.Y(this.date);
            assert.isNumber(year);
            assert.areEqual(2009, year);
        },
        "test format specifier %m": function () {
            var month = Date.formats.m(this.date);
            assert.isString(month);
            assert.areEqual("10", month);
        },
        "test format specifier %d": function () {
            assert.areEqual("02", Date.formats.d(this.date));
        },
        "test format specifier %y": function () {
            assert.areEqual("09", Date.formats.y(this.date));
        },
        "test format specifier %F": function () {
            assert.areEqual("%Y-%m-%d", Date.formats.F);
        }
    });

    new Y.Console({
        style: 'block'
    }).render("#testReport");

    Y.Test.Runner.add(strftimeTestCase);
    Y.Test.Runner.run();

});
