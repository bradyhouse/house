(function (app, $, undefined) {

    app.output = function (text, color) {
        var div = document.createElement('div');
        div.setAttribute('style', 'text-align: left;');
        div.innerHTML = text;
        div.style.color = color;
        $("#fiddleHook").append(div);
    };


    app.output.digits = function (min, max, count) {

        var range = [],
            number = 0,
            matches = [],
            i = 0;

        while (i < count) {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
            matches = range.filter(function (elem) {
                return elem == number;
            });
            if (matches.length == 0) {
                range.push(number);
                i++;
            }
        }

        return range;
    };

    app.output.pad = function (digit) {
        var str = digit + '';
        if (str.length == 1) {
            return '&nbsp;&nbsp;&nbsp;' + str;
        }
        return str;
    }

    $(document).ready(function () {

        var rows = [],
            tab = '&nbsp;&nbsp;&nbsp;',
            i = 1;

        for (var x = 0; x < 10; x++) {
            rows.push(app.output.digits(1, 15, 15));
        }

        rows.map(function (row) {

            app.output(app.output.pad(i) + tab + '|' + tab + row + '', "#000F");
            i++;
        });

    });
})(window.app = window.app || {}, jQuery)
