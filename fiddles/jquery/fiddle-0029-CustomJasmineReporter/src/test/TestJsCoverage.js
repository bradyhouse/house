/**
 * @singleton Test.jsCoverage
 * The jscoverage manager.
 */
Test.jsCoverage = {
    executed: 0,
    coverage: {},

    isEnabled: function () {
        return !!Test.SandBox.getWin()._$jscoverage;
    },

    getCoverage: function () {
        return this.coverage;
    },

    getSandBoxCoverage: function () {
        return Test.SandBox.getWin()._$jscoverage;
    },
    /**
     * Adds suite to the jscoverage manager.
     * @param {jasmine.Suite} The jasmine suite.
     */
    add: function (suite) {
        var coverage = this.getSandBoxCoverage(),
            filename, file, property, statement;

        if (!coverage) {
            return;
        }
        filename = this.getFileName(suite.coverageFile);
        file = coverage[filename];
        if (coverage && file) {
            for (property in file) {
                if (!file.hasOwnProperty(property)) {
                    continue;
                }
                statement = file[property];
            }
        }
    },
    /**
     * This methods try to find the corresponding javascript source file.
     * @param {String} The filename.
     */
    getFileName: function (filename) {
        var coverage = this.getSandBoxCoverage(),
            property;

        if (!coverage || !filename) {
            return;
        }

        if (coverage[filename]) {
            return filename;
        }

        for (property in coverage) {
            if (property.search(filename) !== -1) {
                return property;
            }
        }
    },
    /**
     * Updates suite coverage results after execution.
     * @param {jasmine.Suite} The jasmine suite.
     */
    update: function (suite) {
        var coverage = this.getSandBoxCoverage(),
            statements = 0,
            executed = 0,
            property, statement, filename, file;

        if (!coverage) {
            return;
        }

        filename = this.getFileName(suite.coverageFile);
        file = coverage[filename];

        if (file) {
            suite.jscoverage = {
                file: []
            };

            for (property in file) {
                if (!file.hasOwnProperty(property)) {
                    continue;
                }
                statement = file[property];

                suite.jscoverage.file[property] = statement;

                if (!isNaN(property) && statement !== undefined) {
                    statements = statements + 1;
                    if (statement !== 0) {
                        this.executed = this.executed + 1;
                        executed = executed + 1;
                    }
                }
            }
            suite.jscoverage.percentage = ((executed / statements) * 100).toFixed(2);
            suite.jscoverage.statements = statements;
            suite.jscoverage.executed = executed;
            this.coverage[filename] = suite.jscoverage.file;
            this.coverage[filename].percentage = suite.jscoverage.percentage;
            this.coverage[filename].statements = suite.jscoverage.statements;
            this.coverage[filename].executed = suite.jscoverage.executed;
        }
    },
    /**
     * Returns suite coverage text.
     * @param {jasmine.Suite} The jasmine suite.
     * @return {String} The Code coverage text<
     */
    getSuiteCoverage: function (suite) {
        if (suite.jscoverage) {
            return " - Code coverage: " + suite.jscoverage.percentage + "%";
        }
        return '';
    },
    /**
     * Gets total code coverage.
     * @return {String} A string with total code coverage.
     */
    getTotal: function () {
        if (this.percentage) {
            return " - Code coverage: " + this.percentage + "%";
        }

        return '';
    },

    updateTotal: function () {
        var coverage = this.getSandBoxCoverage(),
            statements = 0,
            file, filename, statement, property, fstatements, fexecuted, create;

        if (!coverage) {
            return "";
        }

        for (filename in coverage) {
            if (!coverage.hasOwnProperty(filename)) {
                continue;
            }
            file = coverage[filename];
            fstatements = 0;
            fexecuted = 0;

            create = !this.coverage[filename];
            if (create) {
                this.coverage[filename] = [];
            }
            for (property in file) {
                if (!file.hasOwnProperty(property)) {
                    continue;
                }
                statement = file[property];

                if (!isNaN(property)) {
                    if (statement !== undefined) {
                        statements = statements + 1;
                        fstatements = fstatements + 1;
                    }
                    if (create) {
                        this.coverage[filename][property] = 0;
                    }
                }
            }

            if (create) {
                this.coverage[filename].source = file.source;
                this.coverage[filename].statements = fstatements;
                this.coverage[filename].executed = fexecuted;
                this.coverage[filename].percentage = ((fexecuted / fstatements) * 100).toFixed(2);
            }

        }
        this.statements = statements;
        this.percentage = ((this.executed / statements) * 100).toFixed(2);
    }

};
