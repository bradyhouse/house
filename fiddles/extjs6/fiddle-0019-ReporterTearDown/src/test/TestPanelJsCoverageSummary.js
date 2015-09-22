/**
 * @class jasmine.panel.jsCoverageSummary
 * Creates and renders the persistant jscoverage summary panel.
 * @param {Object} config The configuration object.
 */
Test.panel.jsCoverageSummary = function (config) {
    var me = this;

    me.el = new jasmine.Dom({
        tag: "div",
        cls: "panel jsCoverageSummary hideMe",
        onclick: function () {
            me.onClick.apply(me, arguments);
        },
        children: [{
            cls: "sbody"
        }]
    });

    me.body = me.el.childNodes[0];
    me.persist = true;
    this.renderSummary();
    return me;
};

/**
 * Renders summary view.
 */
Test.panel.jsCoverageSummary.prototype.renderSummary = function () {
    var coverage = Test.jsCoverage.getCoverage(),
        filename, result;

    if (!this.summary) {
        result = '<table class="summary" border="0" cellpadding="0" cellspacing="0"><tbody>';
        result += '<tr class="line header"><td class="fileName">File</td><td class="statements">Statements</td><td class="executed">Executed</td><td class="percentage">Percentage</td></tr>';
        result += '<tr class="line total">';
        result += '<td class="fileName">Total</td>';
        result += '<td class="statements">' + Test.jsCoverage.statements + "</td>";
        result += '<td class="executed">' + Test.jsCoverage.executed + "</td>";
        result += '<td class="percentage">' + this.renderPercentage(Test.jsCoverage.percentage) + "</td>";
        result += '</tr>';

        for (filename in coverage) {
            if (!coverage.hasOwnProperty(filename)) {
                continue;
            }
            result += '<tr class="line">';
            result += '<td class="fileName"><a>' + filename + "</a></td>";
            result += '<td class="statements">' + coverage[filename].statements + "</td>";
            result += '<td class="executed">' + coverage[filename].executed + "</td>";
            result += '<td class="percentage">' + this.renderPercentage(coverage[filename].percentage) + "</td>";
            result += '</tr>';
        }
        result += '</tbody></table>';
        this.summary = result;
    }
    this.body.innerHTML = this.summary;
};

/**
 * Renders percentage progress bar.
 * @return {String} The progressbar html.
 */
Test.panel.jsCoverageSummary.prototype.renderPercentage = function (percent) {
    var result = percent + '%<div class="limit" style="width:300px;">';
    result += '<div class="result" style="width:' + 3 * percent + 'px;"></div>';

    result += '</div>';
    return result;
};

/**
 * Renders percentage progress bar.
 * @return {String} The progressbar html.
 */
Test.panel.jsCoverageSummary.prototype.onClick = function (event) {
    var el;
    event = event || window.event;
    el = event.target || event.srcElement;

    if (el.tagName === "A") {
        this.renderSource(Test.jsCoverage.getCoverage()[el.innerHTML]);
    }

    if (jasmine.Dom.hasCls(el, "back")) {
        this.renderSummary();
    }
};

/**
 * Renders file source.
 */
Test.panel.jsCoverageSummary.prototype.renderSource = function (coverage) {
    this.body.innerHTML = "";
    this.body.appendChild(new jasmine.Dom({
        cls: "back",
        html: "Back"
    }));

    this.body.appendChild(new jasmine.Dom({
        cls: "sources",
        html: new Test.CodeHighLighter({
            source: coverage.source.join("\n"),
            linesFromJsCoverage: coverage,
            highLightCode: false
        }).renderJsSources()
    }));
};
