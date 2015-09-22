/**
 * Renders stack trace tool.
 * @param {Jasmine.spec} The jasmine spec.
 * @return {HTMLElement} The created HTMLElement.
 */
Test.panel.StackTrace = function (config) {
    this.spec = config.spec;
    this.badLinesEls = [];

    var resultItems = this.spec.results().getItems(),
        length = resultItems.length,
        result,
        error,
        lines,
        i;

    if (jasmine.browser.isIE || !this.spec.hasError) {
        return this;
    }

    for (i = 0; i < length; i++) {
        result = resultItems[i];
        if (result.type == "expect" && result.passed && !result.passed()) {
            if (result.error) {
                error = result.error;
                break;
            }
        }
    }

    if (error) {
        lines = this.extractStackTrace(error);

        this.el = new jasmine.Dom({
            tag: "div",
            cls: "panel stackTrace",
            children: this.renderStackLines(lines)
        });
    }

    return this;
};

/**
 * Extracts error stack trace.
 * @param {Error} e The javascript error object.
 * @return {Array} An array which contains all stack trace files and lineNumbers.
 */
Test.panel.StackTrace.prototype.extractStackTrace = function (error) {
    var stack = error.stack || error.stackTrace,
        results = [],
        lines, line, length, i, extract, file, lineNumber;

    if (stack) {
        lines = stack.split("\n");
        length = lines.length;
        for (i = 0; i < length; i++) {
            line = lines[i];
            if (line.search("jasmine.js") === -1) {
                extract = this.extractFileAndLine(line);
                if (extract) {
                    results.push(extract);
                }
            }
        }
    } else {
        file = error.sourceURL || error.fileName;
        lineNumber = error.line || error.lineNumber;

        if (file && lineNumber) {
            results.push({
                file: file,
                lineNumber: lineNumber
            });
        }
    }
    return results;
};

/**
 * Extracts filename and line number from a stack trace line.
 * @param {String} line The stack trace line.
 * @return {Object} An object containing the filename and the line number or null.
 */
Test.panel.StackTrace.prototype.extractRe = /((http:\/\/|file:\/\/\/).*\.js)[^:]*:(\d*)/;
Test.panel.StackTrace.prototype.extractFileAndLine = function (line) {
    var result = line.match(this.extractRe);

    if (!result) {
        return null;
    }

    return {
        file: result[1],
        lineNumber: result[3]
    };
};

/**
 * Render stack trace lines.
 * @param {String} file The filename.
 * @param {String/Number} lineNumber The line number.
 * @return {Array} An array containing all strace trace HTMLElements.
 */
Test.panel.StackTrace.prototype.renderStackLines = function (lines) {
    var els = [],
        length = lines.length,
        el, line, i, file, lineNumber;

    for (i = 0; i < length; i++) {
        line = lines[i];
        file = line.file;
        lineNumber = parseInt(line.lineNumber, 0);
        el = new jasmine.Dom({
            cls: "stackTraceLine",
            children: [{
                cls: "fileName",
                html: "File: " + file + " (line " + lineNumber + ")"
            }, {
                cls: "sources",
                html: this.renderTraceFileSource(file, lineNumber)
            }]
        });

        this.badLinesEls.push({
            el: el.childNodes[1],
            line: lineNumber
        });
        els.push(el);
    }

    return els;
};

/**
 * Downloads source file.
 * @param {String} url The filename url.
 * @return {String} The file source or null.
 */
Test.panel.StackTrace.prototype.getFile = function (file) {
    var request;

    if (jasmine.browser.isIE || Test.Options.remote) {
        return null;
    }
    this.downloadedFiles = this.downloadedFiles || {};

    if (!this.downloadedFiles[file]) {
        request = new XMLHttpRequest();

        if (!request) {
            return null;
        }
        request.open("GET", file + "?" + (new Date()).getTime(), false);

        request.send("");

        this.downloadedFiles[file] = request.responseText;
    }

    return this.downloadedFiles[file];
};

/**
 * Renders stack trace source file.
 * @param {String} file The filename.
 * @param {String/Number} lineNumber The line number.
 * @return {HTMLElement} The javascript source file HTMLElement.
 */
Test.panel.StackTrace.prototype.jscoverageFileRe = /(http:\/\/|file:\/\/\/)[^\/]*/;

Test.panel.StackTrace.prototype.renderTraceFileSource = function (file, lineNumber) {
    var highLightCode = true,
        source, instrumented_file, i, length, line;

    if (Test.SandBox.getWin()._$jscoverage) {
        instrumented_file = SandBox.getWin()._$jscoverage[file.replace(this.jscoverageFileRe, "")];
        if (instrumented_file) {
            highLightCode = false;
            source = instrumented_file.source.join("\n");
            linesFromJsCoverage = {};
            length = instrumented_file.length;
            for (i = 0; i < length; i++) {
                line = instrumented_file[i];
                if (line === 0) {
                    linesFromJsCoverage[i - 1] = true;
                }
            }
        }
    }
    source = source || this.getFile(file);

    return new Test.CodeHighLighter({
        source: source,
        highLightCode: highLightCode,
        lineNumber: lineNumber
    }).renderJsSources();
};

/**
 * Ensure that line which contains the error is visible without scroll.
 */
Test.panel.StackTrace.prototype.afterRender = function () {
    var length = this.badLinesEls.length,
        badLine, firstChild, el, i, lineHeigth, visiblesLines;

    for (i = 0; i < length; i++) {
        badLine = this.badLinesEls[i];
        el = badLine.el;
        lineHeigth = 16;
        visiblesLines = el.clientHeight / lineHeigth;
        el.scrollTop = Math.max(badLine.line - visiblesLines / 2, 0) * lineHeigth;
    }

    this.badLinesEls = [];
};

Test.panel.StackTrace.prototype.remove = function () {
    this.el.parentNode.removeChild(this.el);
};
