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

(function (app, $, undefined) {
    app.test = app.test || {
        assert: function (message, expr) {
            if (!expr) {
                throw new Error(message);
            }
            this.assert.count++;
            return true;
        },
        output: function (text, color) {
            var div = document.createElement('div');
            div.innerHTML = text;
            div.style.color = color;
            $("#fiddleHook").append(div);
        },
        testCase: function (name, tests) {
            var me = this;
            me.assert.count = 0;
            var successful = 0,
                testCount = 0,
                hasSetup = typeof tests.setUp == "function",
                hasTearDown = typeof tests.tearDown == "function";

            for (var test in tests) {
                if (!/^test/.test(test)) {
                    continue;
                }
                testCount++;
                try {
                    if (hasSetup) {
                        tests.setUp();
                    }
                    tests[test]();
                    me.output(test, "#0c0");

                    if (hasTearDown) {
                        tests.tearDown();
                    }

                    successful++;
                } catch (e) {
                    me.output(test + " failed: " + e.message, "#c00");
                }
            }

            var color = successful == testCount ? "#0c0" : "#c00";
            output("<strong>" + testCount + " tests.  " +
            (testCount - successful) + " failures</strong>", color);
        },
        run: function () {
            var me = this;
            me.assert.count = 0;

            me.testCase('strftime test', {
                setUp: function () {
                    me.date = new Date(2009, 9, 2, 22, 14, 45);
                },
                "test format specifier %Y": function () {
                    me.assert("%Y should return a full year", Date.formats.Y(me.date) === 2009);
                },
                "test format specifier %m": function () {
                    me.assert("%m should return a month", Date.formats.m(me.date) === "10");
                },
                "test format specifier %d": function () {
                    me.assert("%d should return date", Date.formats.d(me.date) === "02");
                },
                "test format specifier %y": function () {
                    me.assert("%y should return a year in two digits", Date.formats.y(me.date) === "09");
                },
                "test format specifier %F": function () {
                    me.assert("%F should act as %Y-%m-%d", Date.formats.F === '%Y-%m-%d');
                }
            });
        }
    }
    $(document).ready(function () {
        app.test.run();
    });
})(window.app = window.app || {}, jQuery)
