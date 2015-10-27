var isCommonJS = typeof window == "undefined" && typeof exports == "object";

/**
 * Top level namespace for Jasmine, a lightweight JavaScript BDD/spec/testing framework.
 *
 * @namespace
 */
var jasmine = {};

if (isCommonJS) exports.jasmine = jasmine;
/**
 * @private
 */
jasmine.unimplementedMethod_ = function () {
    throw new Error("unimplemented method");
};

/**
 * Use <code>jasmine.undefined</code> instead of <code>undefined</code>, since <code>undefined</code> is just
 * a plain old variable and may be redefined by somebody else.
 *
 * @private
 */
jasmine.undefined = jasmine.___undefined___;

/**
 * Show diagnostic messages in the console if set to true
 *
 */
jasmine.VERBOSE = false;

/**
 * Default interval in milliseconds for event loop yields (e.g. to allow network activity or to refresh the screen with the HTML-based runner). Small values here may result in slow test running. Zero means no updates until all tests have completed.
 *
 */
jasmine.DEFAULT_UPDATE_INTERVAL = 250;

/**
 * Maximum levels of nesting that will be included when an object is pretty-printed
 */
jasmine.MAX_PRETTY_PRINT_DEPTH = 40;

/**
 * Default timeout interval in milliseconds for waitsFor() blocks.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

/**
 * By default exceptions thrown in the context of a test are caught by jasmine so that it can run the remaining tests in the suite.
 * Set to false to let the exception bubble up in the browser.
 *
 */
jasmine.CATCH_EXCEPTIONS = true;

jasmine.getGlobal = function () {
    function getGlobal() {
        return this;
    }

    return getGlobal();
};

/**
 * Allows for bound functions to be compared.  Internal use only.
 *
 * @ignore
 * @private
 * @param base {Object} bound 'this' for the function
 * @param name {Function} function to find
 */
jasmine.bindOriginal_ = function (base, name) {
    var original = base[name];
    if (original.apply) {
        return function () {
            return original.apply(base, arguments);
        };
    } else {
        // IE support
        return jasmine.getGlobal()[name];
    }
};

jasmine.setTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'setTimeout');
jasmine.clearTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearTimeout');
jasmine.setInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'setInterval');
jasmine.clearInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearInterval');

jasmine.MessageResult = function (values) {
    this.type = 'log';
    this.values = values;
    this.trace = new Error(); // todo: test better
};

jasmine.MessageResult.prototype.toString = function () {
    var text = "";
    for (var i = 0; i < this.values.length; i++) {
        if (i > 0) text += " ";
        if (jasmine.isString_(this.values[i])) {
            text += this.values[i];
        } else {
            text += jasmine.pp(this.values[i]);
        }
    }
    return text;
};

jasmine.ExpectationResult = function (params) {
    this.type = 'expect';
    this.matcherName = params.matcherName;
    this.passed_ = params.passed;
    this.expected = params.expected;
    this.actual = params.actual;
    this.message = this.passed_ ? 'Passed.' : params.message;

    var trace = (params.trace || new Error(this.message));
    this.trace = this.passed_ ? '' : trace;
};

jasmine.ExpectationResult.prototype.toString = function () {
    return this.message;
};

jasmine.ExpectationResult.prototype.passed = function () {
    return this.passed_;
};

/**
 * Getter for the Jasmine environment. Ensures one gets created
 */
jasmine.getEnv = function () {
    var env = jasmine.currentEnv_ = jasmine.currentEnv_ || new jasmine.Env();
    return env;
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isArray_ = function (value) {
    return jasmine.isA_("Array", value);
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isString_ = function (value) {
    return jasmine.isA_("String", value);
};

/**
 * @ignore
 * @private
 * @param value
 * @returns {Boolean}
 */
jasmine.isNumber_ = function (value) {
    return jasmine.isA_("Number", value);
};

/**
 * @ignore
 * @private
 * @param {String} typeName
 * @param value
 * @returns {Boolean}
 */
jasmine.isA_ = function (typeName, value) {
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
};

/**
 * Pretty printer for expecations.  Takes any object and turns it into a human-readable string.
 *
 * @param value {Object} an object to be outputted
 * @returns {String}
 */
jasmine.pp = function (value) {
    var stringPrettyPrinter = new jasmine.StringPrettyPrinter();
    stringPrettyPrinter.format(value);
    return stringPrettyPrinter.string;
};

/**
 * Returns true if the object is a DOM Node.
 *
 * @param {Object} obj object to check
 * @returns {Boolean}
 */
jasmine.isDomNode = function (obj) {
    return obj.nodeType > 0;
};

/**
 * Returns a matchable 'generic' object of the class type.  For use in expecations of type when values don't matter.
 *
 * @example
 * // don't care about which function is passed in, as long as it's a function
 * expect(mySpy).toHaveBeenCalledWith(jasmine.any(Function));
 *
 * @param {Class} clazz
 * @returns matchable object of the type clazz
 */
jasmine.any = function (clazz) {
    return new jasmine.Matchers.Any(clazz);
};

/**
 * Returns a matchable subset of a JSON object. For use in expectations when you don't care about all of the
 * attributes on the object.
 *
 * @example
 * // don't care about any other attributes than foo.
 * expect(mySpy).toHaveBeenCalledWith(jasmine.objectContaining({foo: "bar"});
 *
 * @param sample {Object} sample
 * @returns matchable object for the sample
 */
jasmine.objectContaining = function (sample) {
    return new jasmine.Matchers.ObjectContaining(sample);
};

/**
 * Jasmine Spies are test doubles that can act as stubs, spies, fakes or when used in an expecation, mocks.
 *
 * Spies should be created in test setup, before expectations.  They can then be checked, using the standard Jasmine
 * expectation syntax. Spies can be checked if they were called or not and what the calling params were.
 *
 * A Spy has the following fields: wasCalled, callCount, mostRecentCall, and argsForCall (see docs).
 *
 * Spies are torn down at the end of every spec.
 *
 * Note: Do <b>not</b> call new jasmine.Spy() directly - a spy must be created using spyOn, jasmine.createSpy or jasmine.createSpyObj.
 *
 * @example
 * // a stub
 * var myStub = jasmine.createSpy('myStub');  // can be used anywhere
 *
 * // spy example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 *
 * // actual foo.not will not be called, execution stops
 * spyOn(foo, 'not');

 // foo.not spied upon, execution will continue to implementation
 * spyOn(foo, 'not').andCallThrough();
 *
 * // fake example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 *
 * // foo.not(val) will return val
 * spyOn(foo, 'not').andCallFake(function(value) {return value;});
 *
 * // mock example
 * foo.not(7 == 7);
 * expect(foo.not).toHaveBeenCalled();
 * expect(foo.not).toHaveBeenCalledWith(true);
 *
 * @constructor
 * @see spyOn, jasmine.createSpy, jasmine.createSpyObj
 * @param {String} name
 */
jasmine.Spy = function (name) {
    /**
     * The name of the spy, if provided.
     */
    this.identity = name || 'unknown';
    /**
     *  Is this Object a spy?
     */
    this.isSpy = true;
    /**
     * The actual function this spy stubs.
     */
    this.plan = function () {
    };
    /**
     * Tracking of the most recent call to the spy.
     * @example
     * var mySpy = jasmine.createSpy('foo');
     * mySpy(1, 2);
     * mySpy.mostRecentCall.args = [1, 2];
     */
    this.mostRecentCall = {};

    /**
     * Holds arguments for each call to the spy, indexed by call count
     * @example
     * var mySpy = jasmine.createSpy('foo');
     * mySpy(1, 2);
     * mySpy(7, 8);
     * mySpy.mostRecentCall.args = [7, 8];
     * mySpy.argsForCall[0] = [1, 2];
     * mySpy.argsForCall[1] = [7, 8];
     */
    this.argsForCall = [];
    this.calls = [];
};

/**
 * Tells a spy to call through to the actual implemenatation.
 *
 * @example
 * var foo = {
 *   bar: function() { // do some stuff }
 * }
 *
 * // defining a spy on an existing property: foo.bar
 * spyOn(foo, 'bar').andCallThrough();
 */
jasmine.Spy.prototype.andCallThrough = function () {
    this.plan = this.originalValue;
    return this;
};

/**
 * For setting the return value of a spy.
 *
 * @example
 * // defining a spy from scratch: foo() returns 'baz'
 * var foo = jasmine.createSpy('spy on foo').andReturn('baz');
 *
 * // defining a spy on an existing property: foo.bar() returns 'baz'
 * spyOn(foo, 'bar').andReturn('baz');
 *
 * @param {Object} value
 */
jasmine.Spy.prototype.andReturn = function (value) {
    this.plan = function () {
        return value;
    };
    return this;
};

/**
 * For throwing an exception when a spy is called.
 *
 * @example
 * // defining a spy from scratch: foo() throws an exception w/ message 'ouch'
 * var foo = jasmine.createSpy('spy on foo').andThrow('baz');
 *
 * // defining a spy on an existing property: foo.bar() throws an exception w/ message 'ouch'
 * spyOn(foo, 'bar').andThrow('baz');
 *
 * @param {String} exceptionMsg
 */
jasmine.Spy.prototype.andThrow = function (exceptionMsg) {
    this.plan = function () {
        throw exceptionMsg;
    };
    return this;
};

/**
 * Calls an alternate implementation when a spy is called.
 *
 * @example
 * var baz = function() {
 *   // do some stuff, return something
 * }
 * // defining a spy from scratch: foo() calls the function baz
 * var foo = jasmine.createSpy('spy on foo').andCall(baz);
 *
 * // defining a spy on an existing property: foo.bar() calls an anonymnous function
 * spyOn(foo, 'bar').andCall(function() { return 'baz';} );
 *
 * @param {Function} fakeFunc
 */
jasmine.Spy.prototype.andCallFake = function (fakeFunc) {
    this.plan = fakeFunc;
    return this;
};

/**
 * Resets all of a spy's the tracking variables so that it can be used again.
 *
 * @example
 * spyOn(foo, 'bar');
 *
 * foo.bar();
 *
 * expect(foo.bar.callCount).toEqual(1);
 *
 * foo.bar.reset();
 *
 * expect(foo.bar.callCount).toEqual(0);
 */
jasmine.Spy.prototype.reset = function () {
    this.wasCalled = false;
    this.callCount = 0;
    this.argsForCall = [];
    this.calls = [];
    this.mostRecentCall = {};
};

jasmine.createSpy = function (name) {

    var spyObj = function () {
        spyObj.wasCalled = true;
        spyObj.callCount++;
        var args = jasmine.util.argsToArray(arguments);
        spyObj.mostRecentCall.object = this;
        spyObj.mostRecentCall.args = args;
        spyObj.argsForCall.push(args);
        spyObj.calls.push({object: this, args: args});
        return spyObj.plan.apply(this, arguments);
    };

    var spy = new jasmine.Spy(name);

    for (var prop in spy) {
        spyObj[prop] = spy[prop];
    }

    spyObj.reset();

    return spyObj;
};

/**
 * Determines whether an object is a spy.
 *
 * @param {jasmine.Spy|Object} putativeSpy
 * @returns {Boolean}
 */
jasmine.isSpy = function (putativeSpy) {
    return putativeSpy && putativeSpy.isSpy;
};

/**
 * Creates a more complicated spy: an Object that has every property a function that is a spy.  Used for stubbing something
 * large in one call.
 *
 * @param {String} baseName name of spy class
 * @param {Array} methodNames array of names of methods to make spies
 */
jasmine.createSpyObj = function (baseName, methodNames) {
    if (!jasmine.isArray_(methodNames) || methodNames.length === 0) {
        throw new Error('createSpyObj requires a non-empty array of method names to create spies for');
    }
    var obj = {};
    for (var i = 0; i < methodNames.length; i++) {
        obj[methodNames[i]] = jasmine.createSpy(baseName + '.' + methodNames[i]);
    }
    return obj;
};

/**
 * All parameters are pretty-printed and concatenated together, then written to the current spec's output.
 *
 * Be careful not to leave calls to <code>jasmine.log</code> in production code.
 */
jasmine.log = function () {
    var spec = jasmine.getEnv().currentSpec;
    spec.log.apply(spec, arguments);
};

/**
 * Function that installs a spy on an existing object's method name.  Used within a Spec to create a spy.
 *
 * @example
 * // spy example
 * var foo = {
 *   not: function(bool) { return !bool; }
 * }
 * spyOn(foo, 'not'); // actual foo.not will not be called, execution stops
 *
 * @see jasmine.createSpy
 * @param obj
 * @param methodName
 * @return {jasmine.Spy} a Jasmine spy that can be chained with all spy methods
 */
var spyOn = function (obj, methodName) {
    return jasmine.getEnv().currentSpec.spyOn(obj, methodName);
};
if (isCommonJS) exports.spyOn = spyOn;

/**
 * Creates a Jasmine spec that will be added to the current suite.
 *
 * // TODO: pending tests
 *
 * @example
 * it('should be true', function() {
 *   expect(true).toEqual(true);
 * });
 *
 * @param {String} desc description of this specification
 * @param {Function} func defines the preconditions and expectations of the spec
 */
var it = function (desc, func) {
    return jasmine.getEnv().it(desc, func);
};
if (isCommonJS) exports.it = it;

/**
 * Creates a <em>disabled</em> Jasmine spec.
 *
 * A convenience method that allows existing specs to be disabled temporarily during development.
 *
 * @param {String} desc description of this specification
 * @param {Function} func defines the preconditions and expectations of the spec
 */
var xit = function (desc, func) {
    return jasmine.getEnv().xit(desc, func);
};
if (isCommonJS) exports.xit = xit;

/**
 * Starts a chain for a Jasmine expectation.
 *
 * It is passed an Object that is the actual value and should chain to one of the many
 * jasmine.Matchers functions.
 *
 * @param {Object} actual Actual value to test against and expected value
 * @return {jasmine.Matchers}
 */
var expect = function (actual) {
    return jasmine.getEnv().currentSpec.expect(actual);
};
if (isCommonJS) exports.expect = expect;

/**
 * Defines part of a jasmine spec.  Used in cominbination with waits or waitsFor in asynchrnous specs.
 *
 * @param {Function} func Function that defines part of a jasmine spec.
 */
var runs = function (func) {
    jasmine.getEnv().currentSpec.runs(func);
};
if (isCommonJS) exports.runs = runs;

/**
 * Waits a fixed time period before moving to the next block.
 *
 * @deprecated Use waitsFor() instead
 * @param {Number} timeout milliseconds to wait
 */
var waits = function (timeout) {
    jasmine.getEnv().currentSpec.waits(timeout);
};
if (isCommonJS) exports.waits = waits;

/**
 * Waits for the latchFunction to return true before proceeding to the next block.
 *
 * @param {Function} latchFunction
 * @param {String} optional_timeoutMessage
 * @param {Number} optional_timeout
 */
var waitsFor = function (latchFunction, optional_timeoutMessage, optional_timeout) {
    jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec, arguments);
};
if (isCommonJS) exports.waitsFor = waitsFor;

/**
 * A function that is called before each spec in a suite.
 *
 * Used for spec setup, including validating assumptions.
 *
 * @param {Function} beforeEachFunction
 */
var beforeEach = function (beforeEachFunction) {
    jasmine.getEnv().beforeEach(beforeEachFunction);
};
if (isCommonJS) exports.beforeEach = beforeEach;

/**
 * A function that is called after each spec in a suite.
 *
 * Used for restoring any state that is hijacked during spec execution.
 *
 * @param {Function} afterEachFunction
 */
var afterEach = function (afterEachFunction) {
    jasmine.getEnv().afterEach(afterEachFunction);
};
if (isCommonJS) exports.afterEach = afterEach;

/**
 * Defines a suite of specifications.
 *
 * Stores the description and all defined specs in the Jasmine environment as one suite of specs. Variables declared
 * are accessible by calls to beforeEach, it, and afterEach. Describe blocks can be nested, allowing for specialization
 * of setup in some tests.
 *
 * @example
 * // TODO: a simple suite
 *
 * // TODO: a simple suite with a nested describe block
 *
 * @param {String} description A string, usually the class under test.
 * @param {Function} specDefinitions function that defines several specs.
 */
var describe = function (description, specDefinitions) {
    return jasmine.getEnv().describe(description, specDefinitions);
};
if (isCommonJS) exports.describe = describe;

/**
 * Disables a suite of specifications.  Used to disable some suites in a file, or files, temporarily during development.
 *
 * @param {String} description A string, usually the class under test.
 * @param {Function} specDefinitions function that defines several specs.
 */
var xdescribe = function (description, specDefinitions) {
    return jasmine.getEnv().xdescribe(description, specDefinitions);
};
if (isCommonJS) exports.xdescribe = xdescribe;


// Provide the XMLHttpRequest class for IE 5.x-6.x:
jasmine.XmlHttpRequest = (typeof XMLHttpRequest == "undefined") ? function () {
    function tryIt(f) {
        try {
            return f();
        } catch (e) {
        }
        return null;
    }

    var xhr = tryIt(function () {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        }) ||
        tryIt(function () {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        }) ||
        tryIt(function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }) ||
        tryIt(function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        });

    if (!xhr) throw new Error("This browser does not support XMLHttpRequest.");

    return xhr;
} : XMLHttpRequest;
/**
 * @namespace
 */
jasmine.util = {};

/**
 * Declare that a child class inherit it's prototype from the parent class.
 *
 * @private
 * @param {Function} childClass
 * @param {Function} parentClass
 */
jasmine.util.inherit = function (childClass, parentClass) {
    /**
     * @private
     */
    var subclass = function () {
    };
    subclass.prototype = parentClass.prototype;
    childClass.prototype = new subclass();
};

jasmine.util.formatException = function (e) {
    var lineNumber;
    if (e.line) {
        lineNumber = e.line;
    }
    else if (e.lineNumber) {
        lineNumber = e.lineNumber;
    }

    var file;

    if (e.sourceURL) {
        file = e.sourceURL;
    }
    else if (e.fileName) {
        file = e.fileName;
    }

    var message = (e.name && e.message) ? (e.name + ': ' + e.message) : e.toString();

    if (file && lineNumber) {
        message += ' in ' + file + ' (line ' + lineNumber + ')';
    }

    return message;
};

jasmine.util.htmlEscape = function (str) {
    if (!str) return str;
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

jasmine.util.argsToArray = function (args) {
    var arrayOfArgs = [];
    for (var i = 0; i < args.length; i++) arrayOfArgs.push(args[i]);
    return arrayOfArgs;
};

jasmine.util.extend = function (destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
};

/**
 * Base class for pretty printing for expectation results.
 */
jasmine.PrettyPrinter = function () {
    this.ppNestLevel_ = 0;
};

/**
 * Formats a value in a nice, human-readable string.
 *
 * @param value
 */
jasmine.PrettyPrinter.prototype.format = function (value) {
    this.ppNestLevel_++;
    try {
        if (value === jasmine.undefined) {
            this.emitScalar('undefined');
        } else if (value === null) {
            this.emitScalar('null');
        } else if (value === jasmine.getGlobal()) {
            this.emitScalar('<global>');
        } else if (value.jasmineToString) {
            this.emitScalar(value.jasmineToString());
        } else if (typeof value === 'string') {
            this.emitString(value);
        } else if (jasmine.isSpy(value)) {
            this.emitScalar("spy on " + value.identity);
        } else if (value instanceof RegExp) {
            this.emitScalar(value.toString());
        } else if (typeof value === 'function') {
            this.emitScalar('Function');
        } else if (typeof value.nodeType === 'number') {
            this.emitScalar('HTMLNode');
        } else if (value instanceof Date) {
            this.emitScalar('Date(' + value + ')');
        } else if (value.__Jasmine_been_here_before__) {
            this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
        } else if (jasmine.isArray_(value) || typeof value == 'object') {
            value.__Jasmine_been_here_before__ = true;
            if (jasmine.isArray_(value)) {
                this.emitArray(value);
            } else {
                this.emitObject(value);
            }
            delete value.__Jasmine_been_here_before__;
        } else {
            this.emitScalar(value.toString());
        }
    } finally {
        this.ppNestLevel_--;
    }
};

jasmine.PrettyPrinter.prototype.iterateObject = function (obj, fn) {
    for (var property in obj) {
        if (!obj.hasOwnProperty(property)) continue;
        if (property == '__Jasmine_been_here_before__') continue;
        fn(property, obj.__lookupGetter__ ? (obj.__lookupGetter__(property) !== jasmine.undefined &&
        obj.__lookupGetter__(property) !== null) : false);
    }
};

jasmine.PrettyPrinter.prototype.emitArray = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitObject = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitScalar = jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitString = jasmine.unimplementedMethod_;

jasmine.StringPrettyPrinter = function () {
    jasmine.PrettyPrinter.call(this);

    this.string = '';
};
jasmine.util.inherit(jasmine.StringPrettyPrinter, jasmine.PrettyPrinter);

jasmine.StringPrettyPrinter.prototype.emitScalar = function (value) {
    this.append(value);
};

jasmine.StringPrettyPrinter.prototype.emitString = function (value) {
    this.append("'" + value + "'");
};

jasmine.StringPrettyPrinter.prototype.emitArray = function (array) {
    if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
        this.append("Array");
        return;
    }

    this.append('[ ');
    for (var i = 0; i < array.length; i++) {
        if (i > 0) {
            this.append(', ');
        }
        this.format(array[i]);
    }
    this.append(' ]');
};

jasmine.StringPrettyPrinter.prototype.emitObject = function (obj) {
    if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
        this.append("Object");
        return;
    }

    var self = this;
    this.append('{ ');
    var first = true;

    this.iterateObject(obj, function (property, isGetter) {
        if (first) {
            first = false;
        } else {
            self.append(', ');
        }

        self.append(property);
        self.append(' : ');
        if (isGetter) {
            self.append('<getter>');
        } else {
            self.format(obj[property]);
        }
    });

    this.append(' }');
};

jasmine.StringPrettyPrinter.prototype.append = function (value) {
    this.string += value;
};
/**
 * Formats a value in a nice, human-readable string.
 *
 * @param value
 */
jasmine.PrettyPrinter.prototype.format = function (value) {
    if (this.ppNestLevel_ > 40) {
        throw new Error('jasmine.PrettyPrinter: format() nested too deeply!');
    }

    this.ppNestLevel_++;
    try {
        if (value === jasmine.undefined) {
            this.emitScalar('undefined');
        } else if (value === null) {
            this.emitScalar('null');
        } else if (value === jasmine.getGlobal()) {
            this.emitScalar('<global>');
        } else if (value.expectedClass) {   //override of value instanceof jasmine.Matchers.Any
            this.emitScalar(value.toString());
        } else if (typeof value === 'string') {
            this.emitString(value);
        } else if (jasmine.isSpy(value)) {
            this.emitScalar("spy on " + value.identity);
        } else if (value instanceof RegExp) {
            this.emitScalar(value.toString());
        } else if (typeof value === 'function') {
            this.emitScalar('Function');
        } else if (typeof value.nodeType === 'number') {
            this.emitScalar('HTMLNode');
        } else if (value instanceof Date) {
            this.emitScalar('Date(' + value + ')');
        } else if (value.__Jasmine_been_here_before__) {
            this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
        } else if (jasmine.isArray_(value) || typeof value == 'object') {
            value.__Jasmine_been_here_before__ = true;
            if (jasmine.isArray_(value)) {
                this.emitArray(value);
            } else {
                this.emitObject(value);
            }
            delete value.__Jasmine_been_here_before__;
        } else {
            this.emitScalar(value.toString());
        }
    } catch (e) {
    } finally {
        this.ppNestLevel_--;
    }
};


// Extend: creates whitespaces indent
jasmine.StringPrettyPrinter.prototype.getIndent = function () {
    var whiteSpaces = "",
        i;

    for (i = 0; i < this.ws; i++) {
        whiteSpaces += " ";
    }

    return whiteSpaces;
};

// Override: pre-format object
jasmine.StringPrettyPrinter.prototype.emitObject = function (obj) {
    var self = this,
        first = true,
        indent;

    this.append('{\n');
    if (!this.ws) {
        this.ws = 0;
    }
    this.ws += 4;
    indent = this.getIndent();
    var i = 0;
    this.iterateObject(obj, function (property, isGetter) {

        if (first) {
            first = false;
        } else {
            self.append(',\n');
        }

        self.append(indent + property);
        self.append(' : ');
        if (isGetter) {
            self.append('<getter>');
        } else {
            if (typeof obj[property] !== "object") {
                self.format(obj[property]);
            } else {
                self.append("<Object>");
            }
        }
    });

    this.ws -= 4;
    indent = this.getIndent();

    this.append(indent + '\n' + indent + '}');

};
/**
 * Basic browsers detection.
 */
jasmine.browser = {};
jasmine.browser.isIE = !!window.ActiveXObject;
jasmine.browser.isIE6 = jasmine.browser.isIE && !window.XMLHttpRequest;
jasmine.browser.isIE7 = jasmine.browser.isIE && !!window.XMLHttpRequest && !document.documentMode;
jasmine.browser.isIE8 = jasmine.browser.isIE && !!window.XMLHttpRequest && !!document.documentMode && !window.performance;
jasmine.browser.isIE9 = jasmine.browser.isIE && !!window.performance;
jasmine.browser.isSafari3 = /safari/.test(navigator.userAgent.toLowerCase()) && /version\/3/.test(navigator.userAgent.toLowerCase());
jasmine.browser.isOpera = !!window.opera;
jasmine.browser.isOpera11 = jasmine.browser.isOpera && parseInt(window.opera.version(), 10) > 10;
jasmine.array = {};

/**
 * Checks whether or not the specified item exists in the array.
 * Array.prototype.indexOf is missing in Internet Explorer, unfortunately.
 * We always have to use this static method instead for consistency
 * @param {Array} array The array to check
 * @param {Mixed} item The item to look for
 * @param {Number} from (Optional) The index at which to begin the search
 * @return {Number} The index of item in the array (or -1 if it is not found)
 */
jasmine.array.indexOf = function (array, item, from) {
    if (array.indexOf) {
        return array.indexOf(item, from);
    }

    var i, length = array.length;

    for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
        if (array[i] === item) {
            return i;
        }
    }

    return -1;
};

/**
 * Removes the specified item from the array. If the item is not found nothing happens.
 * @param {Array} array The array
 * @param {Mixed} item The item to remove
 * @return {Array} The passed array itself
 */
jasmine.array.remove = function (array, item) {
    var index = this.indexOf(array, item);

    if (index !== -1) {
        array.splice(index, 1);
    }

    return array;
};
/**
 * Creates an HTMLElement.
 * @param {Object/HTMLElement} config Ext DomHelper style element config object.
 * If no tag is specified (e.g., {tag:'input'}) then a div will be automatically generated with the specified attributes.
 * @return {HTMLElement} The created HTMLElement
 */
jasmine.Dom = function (config) {
    var element, children, length, child, i, property;

    config = config || {};

    if (config.tagName) {
        return config;
    }

    element = document.createElement(config.tag || "div");
    children = config.children || [];
    length = children.length;

    delete config.tag;

    for (i = 0; i < length; i++) {
        child = children[i];
        element.appendChild(new jasmine.Dom(child));
    }
    delete config.children;

    if (config.cls) {
        jasmine.Dom.setCls(element, config.cls);
        delete config.cls;
    }

    if (config.html) {
        jasmine.Dom.setHTML(element, config.html);
        delete config.html;
    }

    if (config.style) {
        jasmine.Dom.setStyle(element, config.style);
        delete config.style;
    }

    for (property in config) {
        if (!config.hasOwnProperty(property)) {
            continue;
        }
        element[property] = config[property];
    }

    return element;
};

/**
 * Adds className to an HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 */
jasmine.Dom.addCls = function (element, cls) {
    var split, length, i;

    if (!element.className) {
        jasmine.Dom.setCls(element, cls);
        return;
    }

    split = element.className.split(" ");
    length = split.length;

    for (i = 0; i < length; i++) {
        if (split[i] == cls) {
            return;
        }
    }

    element.className = element.className + " " + cls;
};

/**
 * Removes className to HTMLElement.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 */
jasmine.Dom.removeCls = function (element, cls) {
    var split, length, classArray, i;

    if (!element.className) {
        return;
    }

    classArray = [];
    split = element.className.split(" ");
    length = split.length;

    for (i = 0; i < length; i++) {
        if (split[i] !== cls) {
            classArray.push(split[i]);
        }
    }

    element.className = classArray.join(" ");
};

/**
 * Checks if a dom element has a className.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 * @return {Boolean}
 */
jasmine.Dom.hasCls = function (element, cls) {
    var split, length, classArray, i;

    if (!element.className) {
        return;
    }

    split = element.className.split(" ");
    length = split.length;

    for (i = 0; i < length; i++) {
        if (split[i] === cls) {
            return true;
        }
    }

    return false;
};

/**
 * Sets HTMLElement className.
 * @param {HTMLElement} element The HTMLElement
 * @param {String} cls The className string
 */
jasmine.Dom.setCls = function (element, cls) {
    element.className = cls;
};

/**
 * Sets HTMLElement innerHTML
 * @param {HTMLElement} element The HTMLElement
 * @param {String} html The innerHTML text
 */
jasmine.Dom.setHTML = function (element, html) {
    element.innerHTML = html;
};

/**
 * Sets HTMLElement style
 * @param {HTMLElement} element The HTMLElement
 * @param {String} style The style property to set
 */
jasmine.Dom.setStyle = function (element, style) {
    var property;
    for (property in style) {
        if (style.hasOwnProperty(property)) {
            element.style[property] = style[property];
        }
    }
};
