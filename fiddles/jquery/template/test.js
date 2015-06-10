"use strict";

function assert(message, expr) {
    if (!expr) {
        throw new Error(message);
    }
    assert.count++;
    return true;
}
function output(text, color) {
    var testHook = $('#fiddleTestHook'),
        p = document.createElement('div');
    p.class = 'row';
    p.innerHTML = text;
    p.style.color = color;
    testHook.append(p);
}
function testCase(name, tests) {

    assert.count = 0;
    var successful = 0,
        testCount = 0,
        hasSetup = typeof tests.setUp == "function",
        hasTearDown = typeof tests.tearDown == "function";

    for (var test in tests) {
        if (!/^assert/.test(test)) {
            continue;
        }
        testCount++;
        try {
            if (hasSetup) {
                tests.setUp();
            }
            tests[test]();
            output(test, "#0c0");

            if (hasTearDown) {
                tests.tearDown();
            }

            successful++;
        } catch (e) {
            output(test + " failed: " + e.message, "#c00");
        }
    }

    var color = successful == testCount ? "#0c0" : "#c00";
    output("<strong>" + testCount + " tests.  " +
    (testCount - successful) + " failures</strong>", color);
}


assert.count = 0;

testCase('strftime test', {
    setUp: function () {
        this.date = new Date(2009, 9, 2, 22, 14, 45);
    },
    "test format specifier %Y": function () {
        assert("%Y should return a full year", Date.formats.Y(this.date) === 2009);
    },
    "test format specifier %m": function () {
        assert("%m should return a month", Date.formats.m(this.date) === "10");
    },
    "test format specifier %d": function () {
        assert("%d should return date", Date.formats.d(this.date) === "02");
    },
    "test format specifier %y": function () {
        assert("%y should return a year in two digits", Date.formats.y(this.date) === "09");
    },
    "test format specifier %F": function () {
        assert("%F should act as %Y-%m-%d", Date.formats.F === '%Y-%m-%d');
    }
});

