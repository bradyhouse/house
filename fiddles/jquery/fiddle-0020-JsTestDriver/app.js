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

