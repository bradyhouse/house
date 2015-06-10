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

app.view.rendered = function(app) {
    testCase('fiddle-0018-BootstrapTable test', {
        "assert store contains 782 records": function () {
            assert("app.store.data does not contain 782 records", window.app.store.data.length === 782);
        },
        "assert model has fields": function () {
            var model = new window.app.model();
            assert("app.model has no fields", model.fields.length > 0);
        },
        "assert view container exists": function () {
            assert("app.container doesn't exist", window.app.container);
        },
        "assert view container contains table": function () {
            assert("app.container doesn't contain a table", window.app.container.table);
        },
        "assert fiddleHook contains a rendered container": function () {
            assert("fiddleHook doesn't contain the rendered container", $('#fiddleHook').children('#fiddleContainer').length === 1);
        },
        "assert fiddleHook contains a rendered table": function () {
            assert("fiddleHook doesn't contain the rendered table", $('#fiddleHook').children('#fiddleContainer').children('#fiddleTable').length === 1);
        },
        "assert the rendered table contains 783 rows": function () {
            assert("table does not contain 783 rows", document.getElementsByTagName('tr').length == 783);
        },
        "assert the rendered table contains 11 columns": function () {
            assert("table does not contain 11 columns", document.getElementsByTagName('th').length == 11);
        },
        "assert the rendered table contains 8602 data cells": function () {
            assert("table does not contain 8602 data cells", document.getElementsByTagName('td').length == 8602);
        }

    });
};



