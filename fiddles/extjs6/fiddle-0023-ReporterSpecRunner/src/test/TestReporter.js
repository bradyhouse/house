/**
 * @class Test.Reporter
 * The Sencha Unit Tests Reporter
 */

Test.Reporter = function (config) {
    config = config || {};
    this.options = Test.Options.get();
    this.runnedSpecsCount = 0;
    this.failedSpecsCount = 0;
    this.disabledSpecsCount = 0;
    this.optionCheckBoxesEl = {};
    this.treeGrid = new Test.panel.TreeGrid({});

};

/**
 * Called before runner execution.
 * @param {jasmine.Runner} runner The Jasmine Runner
 */
Test.Reporter.prototype.reportRunnerStarting = function (runner) {
    this.runner = runner;
    this.startedAt = new Date();
    if (Test.BadGlobals) {
        Test.BadGlobals.setup();
    }
    this.logger = this.treeGrid;

    this.log(">> Started at " + this.startedAt.toString(), "info");

    if (!this.options.remote) {
        this.log(">> Warning! Because you access TestReporter locally, stack trace report isn't available.", "warning");
    }

    this.runner.filter(this.options.suites, this.options.specs);

    if (Test.BadGlobals) {
        Test.BadGlobals.report(this.logger);
    }
};

/**
 * Called after Jasmine runner execution ends.
 * @param {jasmine.Runner} runner The Jasmine Runner
 */
Test.Reporter.prototype.reportRunnerResults = function (runner) {
    Test.jsCoverage.updateTotal();
    this.renderResults(runner);
};

/**
 * Called before spec execution.
 * @param {jasmine.Runner} suite The Jasmine spec
 */
Test.Reporter.prototype.reportSuiteStarting = function (suite) {
    if (this.options.showTimings) {
        suite.startedAt = new Date();
    }
    if (Test.jsCoverage.isEnabled()) {
        Test.jsCoverage.add(suite);
    }
};

/**
 * Called after suite execution ends.
 * @param {jasmine.Runner} suite A Jasmine suite
 */
Test.Reporter.prototype.reportSuiteResults = function (suite) {
    var suiteEl = this.treeGrid ? this.treeGrid.suitesEls[suite.id] : undefined,
        status;

    if (suite.isEnabled()) {
        if (this.options.showTimings) {
            suite.time = (((new Date()).getTime() - suite.startedAt.getTime()) / 1000).toFixed(3);
        }

        Test.jsCoverage.update(suite);

        if (!suite.parentSuite && Test.BadGlobals) {
            Test.BadGlobals.report(this.logger, suite);
        }

        if (this.treeGrid && this.options.showPassed && !suiteEl) {
            suiteEl = this.treeGrid.addSuite(suite);
        }

        if (suiteEl) {
            status = suite.results().passed() ? "passed" : "failed";
            jasmine.Dom.addCls(suiteEl, status);
            jasmine.Dom.addCls(suiteEl.parentNode, status);

            if (Test.jsCoverage.isEnabled()) {
                this.treeGrid.updateSuiteEl(suite, Test.jsCoverage.getSuiteCoverage(suite));
            }

            if (suite.time) {
                this.treeGrid.updateSuiteEl(suite, " (" + suite.time + "s)");
            }
        }

    } else if (this.treeGrid && this.options.showDisabled && !suiteEl) {
        this.treeGrid.addSuite(suite);
    }

};

/**
 * Called before spec execution.
 * @param {jasmine.Runner} suite The Jasmine spec
 */
Test.Reporter.prototype.reportSpecStarting = function (spec) {
    this.currentSpec = spec;

    if (spec.isEnabled()) {
        if (this.options.showTimings) {
            spec.startedAt = new Date();
        }
        this.treeGrid.setStatus("Running: " + jasmine.util.htmlEscape(spec.getFullName()));
    }
};

/**
 * Called after spec execution.
 * @param {jasmine.Runner} suite The Jasmine spec
 */
Test.Reporter.prototype.reportSpecResults = function (spec) {
    var results, status;
    var progressBar = this.treeGrid.progressBar;

    if (spec.isEnabled()) {
        if (this.options.showTimings) {
            spec.time =
                (((new Date()).getTime() - spec.startedAt.getTime()) / 1000).toFixed(3);
        }
        results = spec.results();
        status = results.passed() ? "passed" : "failed";

        if (status === "failed") {
            if (!this.failedSpecsCount++) {
                progressBar.className += ' failed';
            }
        }

        if ((status === "failed" || this.options.showPassed) && spec.isEnabled() &&
            this.treeGrid) {
            this.treeGrid.addSpec(spec);
        }

        Test.SandBox.save(spec);

        this.runnedSpecsCount = this.runnedSpecsCount + 1;
    } else {
        this.disabledSpecsCount = this.disabledSpecsCount + 1;
        if (this.treeGrid && this.options.showDisabled) {
            this.treeGrid.addSpec(spec);
        }
    }

    var total = spec.env.totalSpecs;
    var remaining = --spec.env.remainingSpecs;

    if (remaining) {
        var percent = Math.round((total - remaining) / total * 1000) / 10;
        progressBar.style.width = percent + '%';
    } else {
        progressBar.style.display = 'none';
    }
};

/**
 * Updates runner message with failed and passed specs
 * @param {jasmine.Runner} runner The jasmine runner.
 */
Test.Reporter.prototype.renderResults = function (runner) {
    var cls = (this.failedSpecsCount > 0) ? "failed" : "passed",
        runTime,
        message;

    runTime = (new Date().getTime() - this.startedAt.getTime()) / 1000;

    message = this.runnedSpecsCount + " spec" +
        (this.runnedSpecsCount === 1 ? "" : "s" ) + " ran, " +
        this.failedSpecsCount + " failure" +
        (this.failedSpecsCount === 1 ? "" : "s") +
        " and " + this.disabledSpecsCount + " disabled";

    message += " in " + runTime + "s";

    message += Test.jsCoverage.getTotal() + ".";

    if (this.treeGrid) {
        if (Test.SandBox.getWin()._$jscoverage) {
            this.treeGrid.tabPanel.addCoverageSummary();
        }
        this.treeGrid.setStatus(message, cls);
    }
    this.log(">> Finished at " + new Date().toString(), "info");

};

Test.Reporter.prototype.log = function () {
    if (this.options.verbose || arguments.length === 2) {
        this.logger.log.apply(this.logger, arguments);
    }
};

Test.Reporter.prototype.getIframeContainer = function () {
    if (this.treeGrid) {
        //return this.treeGrid.tabPanel.children[1].el;
        return this.treeGrid.tabPanel.children[0].el;
    }
    return document.body;
};

