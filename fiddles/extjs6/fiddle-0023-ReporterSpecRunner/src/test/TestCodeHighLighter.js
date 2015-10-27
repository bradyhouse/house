/**
 * @class Test.CodeHighLighter
 * A javascript simple source code higlighter and beautifier (optional).
 */
Test.CodeHighLighter = function (config) {
    /**
     * @cfg {String} source The source string to process.
     */
    this.source = config.source;
    this.lineNumber = config.lineNumber;
    this.linesFromJsCoverage = config.linesFromJsCoverage;

    this.beautify = config.beautify || this.lineNumber === undefined;
    this.highLightCode = config.highLightCode === false ? false : true;

    this.matchedComments = [];
    this.matchedStrings = [];
};

/**
 * Regular expressions.
 */
Test.CodeHighLighter.prototype.regExps = {
    strings: /"([^\\"\n]|\\.)*"|'([^\\'\n]|\\.)*'|"([^\\"\n]|\\\n)*"|'([^\\'\n]|\\\n)*'/gm,
    comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
    operators: /([\+\-\*\/=\?!]{1,3}|[\-\+]{1,2})/g,
    numbers: /\b([0-9]+)\b/g,
    keywords: [/\b(break)\b/g, /\b(case)\b/g, /\b(catch)\b/g, /\b(continue)\b/g, /\b(default)\b/g,
        /\b(delete)\b/g, /\b(do)\b/g, /\b(else)\b/g, /\b(false)\b/g, /\b(for)\b/g, /\b(function)\b/g,
        /\b(if)\b/g, /\b(in)\b/g, /\b(instanceof)\b/g, /\b(new)\b/g, /\b(null)\b/g,
        /\b(return)\b/g, /\b(switch)\b/g, /\b(this)\b/g, /\b(throw)\b/g, /\b(true)\b/g,
        /\b(try)\b/g, /\b(typeof)\b/g, /\b(var)\b/g, /\b(while)\b/g, /\b(with)\b/g],
    commasInsideParenthesis: /\(([^\(\)\{\}])+\)/g,
    arrayWithOneElement: /\[\n([^,\]]*)\n\]/g,
    commaBracket: /,\n\s*\{/g,
    multipleWhiteSpaces: /(\s+)/g,
    semiColon: /;/g,
    comma: /,/g,
    openedBrackets: /([\{\[])/g,
    closedBrackets: /([\}\]])/g,
    emptyObject: /\{\n\s*\n\}/g,
    openedBracketsWithNewLine: /[\{\[]$/g,
    closedBracketsWithNewLine: /^\s*[\}\]]/g,
    unwantedNewLines: /\n([\n,;\)])/g,
    newLine: /\n/g,
    firstSpaces: /^(\s)+/
};

/**
 * Populates an array of matched objects.
 * @param {String} value The match result.
 * @param {Number} index The index of the match.
 * @param {Array} matchedObjects The array of matches to populate.
 * @param {String} css The css to apply to the match.
 * @return {Boolean} Returns <tt>true</tt> is the match is inside another.
 */
Test.CodeHighLighter.prototype.matchObjects = function (value, index, matchedObjects, css) {
    matchedObjects.push({
        origValue: value,
        value: '<span class="jsHl' + css + '">' + jasmine.util.htmlEscape(value).replace("$", "$\b") + '</span>',
        start: index,
        end: index + value.length
    });
};

/**
 * Checks if a match is inside another matches.
 * @param {Object} matchedObject The checked match.
 * @param {Array} matchedOthers The array that contains other matches.
 * @return {Boolean} Returns <tt>true</tt> is the match is inside another.
 */
Test.CodeHighLighter.prototype.isInside = function (matchedObject, matchedOthers) {
    var start = matchedObject.start,
        end = matchedObject.end,
        length = matchedOthers.length,
        matchedOther, i;

    for (i = 0; i < length; i++) {
        matchedOther = matchedOthers[i];
        if (matchedOther.start < start && start < matchedOther.end) {
            return true;
        }
    }
    return false;
};

/**
 * This function get rid of any matches that are inside of other matches.
 * If a match isn't inside another it is replaced by a string in {@link #source}
 * in order to protect it from {@link #processOperatorsNumbersKeywords} replace tricks.
 * @param {Array} matchedObjects The array of matches to check.
 * @param {Array} matchedOthers The array that contains other matches.
 * @param {String} protect The replacement string
 */
Test.CodeHighLighter.prototype.fixOverlaps = function (matchedObjects, matchedOthers, protect) {
    var result = [],
        length = matchedObjects.length,
        matchedObject,
        i;

    for (i = 0; i < length; i++) {
        matchedObject = matchedObjects[i];
        if (!this.isInside(matchedObject, matchedOthers)) {
            this.source = this.source.replace(matchedObject.origValue, protect);
            result.push(matchedObject);
        }
    }
    return result;
};

/**
 * Replaces Strings and Comments in javascript source code.
 */
Test.CodeHighLighter.prototype.saveStringsAndComments = function () {
    var commentsRe = this.regExps.comments,
        stringsRe = this.regExps.strings,
        exec;


    while ((exec = commentsRe.exec(this.source))) {
        this.matchObjects(exec[0], exec.index, this.matchedComments, "Comment");
    }

    while ((exec = stringsRe.exec(this.source))) {
        this.matchObjects(exec[0], exec.index, this.matchedStrings, "String");
    }

    this.matchedComments = this.fixOverlaps(this.matchedComments, this.matchedStrings, "%%%%comment%%%%");
    this.matchedStrings = this.fixOverlaps(this.matchedStrings, this.matchedComments, '%%%%string%%%%');
};

/**
 * Process strings and comments saved by {@link #saveStringsAndComments}.
 */
Test.CodeHighLighter.prototype.processStringsAndComments = function () {
    var matches = this.matchedComments,
        length = matches ? matches.length : 0,
        value, i;

    for (i = 0; i < length; i++) {
        value = matches[i].value;
        this.source = this.source.replace("%%%%comment%%%%", value);
    }

    matches = this.matchedStrings;
    length = matches ? matches.length : 0;

    for (i = 0; i < length; i++) {
        value = matches[i].value;
        this.source = this.source.replace('%%%%string%%%%', value);
    }
};

/**
 * Highlight operators, numbers and keywords.
 */
Test.CodeHighLighter.prototype.processOperatorsNumbersKeywords = function () {
    var regexps = this.regExps,
        keywords = regexps.keywords,
        length = keywords.length,
        i;

    this.source = jasmine.util.htmlEscape(this.source).replace(
        regexps.operators, '<span class="jsHlOperator">$1</span>').replace(
        regexps.numbers, '<span class="jsHlNumber">$1</span>');

    for (i = 0; i < length; i++) {
        this.source = this.source.replace(keywords[i], '<span class="jsHlKeyword">$1</span>');
    }
};

/**
 * Format and highligth javascript sources.
 * @return The HTML formatted and highlighted code
 */
Test.CodeHighLighter.prototype.process = function () {
    this.saveStringsAndComments();

    if (this.beautify) {
        this.prepareIndent();
        this.doIndent();
    }

    this.processOperatorsNumbersKeywords();

    this.processStringsAndComments();

    return this.source;
};

/**
 * Render sources with line numbers.
 * @return The HTML formatted and highlighted code
 */
Test.CodeHighLighter.prototype.renderJsSources = function () {
    var result = 'No code found.',
        linesFromJsCoverage = this.linesFromJsCoverage,
        lineNumber = this.lineNumber,
        source = this.source,
        lines, line, i, errorCls, length, lineNumberCls;

    if (source) {
        source = this.highLightCode ? this.process() : source;
        lines = source.split("\n");
        length = lines.length;

        result = '<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="lineNumbers">';
        for (i = 0; i < length; i++) {
            errorCls = "";
            lineNumberCls = "";
            if (lineNumber) {
                errorCls = i === (lineNumber - 1) ? " error" : "";
            }
            if (linesFromJsCoverage) {
                lineNumberCls = !isNaN(linesFromJsCoverage[i + 1]) ? " lineNumberGreen" : "";
                lineNumberCls = linesFromJsCoverage[i + 1] === 0 ? " lineNumberRed" : lineNumberCls;

            }
            result += '<div class="lineNumber' + errorCls + lineNumberCls + '">' + (i + 1) + '</div>';
        }

        result += '</td><td><pre class="code">' + source + '</pre></td></tr></tbody></table>';
    }

    this.source = result;

    return this.source;
};

/**
 * Prepares source code. It crops double whitespace and append new lines.
 * This function is used generally to preformat the code that come from a
 * Function.prototype.toString.
 */
Test.CodeHighLighter.prototype.prepareIndent = function () {
    var regexps = this.regExps,
        matches, length, i, m;

    this.source = this.source.replace(
        regexps.multipleWhiteSpaces, " ").replace(
        regexps.semiColon, ";\n").replace(
        regexps.comma, ",\n").replace(
        regexps.openedBrackets, "$1\n").replace(
        regexps.closedBrackets, "\n$1\n");


    // remove newline after commas inside code parenthesis
    matches = this.source.match(regexps.commasInsideParenthesis);

    length = matches ? matches.length : 0;
    for (i = 0; i < length; i++) {
        m = matches[i];
        this.source = this.source.replace(m, m.replace(regexps.newLine, ""));
    }

    // fixes various bad formatting
    this.source = this.source.replace(regexps.arrayWithOneElement, "[$1]").replace(
        regexps.emptyObject, "{}").replace(
        regexps.commaBracket, ", {").replace(
        regexps.unwantedNewLines, "$1");
};

/**
 * Creates a string composed of n whitespaces
 * @param {Number} number The number of white spaces.
 * @return {String} A multiple whitespace string.
 */
Test.CodeHighLighter.prototype.addWhiteSpaces = function (number) {
    var whiteSpaces = "",
        i;

    for (i = 0; i < number; i++) {
        whiteSpaces += " ";
    }

    return whiteSpaces;
};

/**
 * Indents pre-formatted source code.
 */
Test.CodeHighLighter.prototype.doIndent = function () {
    var regexps = this.regExps,
        results = [],
        indent = 0,
        sources = this.source.split("\n"),
        length = sources.length,
        whiteSpaces = "",
        source, i;

    for (i = 0; i < length; i++) {
        source = sources[i].replace(regexps.firstSpaces, '');
        if (source !== "") {
            if (source.search(regexps.closedBracketsWithNewLine) !== -1) {
                indent = Math.max(indent - 4, 0);
                whiteSpaces = this.addWhiteSpaces(indent);
            }
            results.push(whiteSpaces + source);
            if (source.search(regexps.openedBracketsWithNewLine) !== -1) {
                indent += 4;
                whiteSpaces = this.addWhiteSpaces(indent);
            }
        }
    }
    this.source = results.join("\n");
};
