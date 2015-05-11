(function (app, $, undefined) {
    "use strict";
    app.store = app.store || {
        operations: [
            '+',
            '-',
            '%',
            'x',
            'C',
            '/',
            '+/-'
        ],
        buttonTypes: [
            'warning',
            'success'
        ],
        buttons: [{
            row: 1,
            col: 0,
            text: 'C',
            type: 'success'
        },
            {
                row: 1,
                col: 1,
                text: '+/-',
                type: 'success'
            },
            {
                row: 1,
                col: 2,
                text: '%',
                type: 'success'
            },
            {
                row: 1,
                col: 3,
                text: '/',
                type: 'warning'
            },
            {
                row: 2,
                col: 0,
                text: '7',
                type: 'success'
            },
            {
                row: 2,
                col: 1,
                text: '8',
                type: 'success'
            },
            {
                row: 2,
                col: 2,
                text: '9',
                type: 'success'
            },
            {
                row: 2,
                col: 3,
                text: 'x',
                type: 'warning'
            },
            {
                row: 3,
                col: 0,
                text: '4',
                type: 'success'
            },
            {
                row: 3,
                col: 1,
                text: '5',
                type: 'success'
            },
            {
                row: 3,
                col: 2,
                text: '6',
                type: 'success'
            },
            {
                row: 3,
                col: 3,
                text: '-',
                type: 'warning'
            },
            {
                row: 4,
                col: 0,
                text: '1',
                type: 'success'
            },
            {
                row: 4,
                col: 1,
                text: '2',
                type: 'success'
            },
            {
                row: 4,
                col: 2,
                text: '3',
                type: 'success'
            },
            {
                row: 4,
                col: 0,
                text: '+',
                type: 'warning'
            },
            {
                row: 5,
                col: 0,
                text: '0',
                type: 'success'
            },
            {
                row: 5,
                col: 1,
                text: '.',
                type: 'success'
            },
            {
                row: 5,
                col: 2,
                text: '=',
                type: 'warning'
            }],
        buttonRowCount: 5,
        isOperation: function (operation) {
            var filter = function (possibleOperation) {
                    if (possibleOperation === operation) {
                        return true;
                    }
                    return false;
                },
                arrFilter = app.store.operations.filter(filter);
            if (arrFilter) {
                return true;
            }
            return false;
        },
        findButtonRow: function (rowId) {
            var filter = function (obj) {
                if (obj.row === rowId) {
                    return true;
                }
                return false;
            };
            return app.store.buttons.filter(filter);
        },
        buffer: {
            a: {
                numeral: [],
                fractional: [],
                isDecimal: false,
                sign: '+'
            },
            b: {
                numeral: [],
                fractional: [],
                isDecimal: false,
                sign: '+'
            },
            c: null,
            op: null
        }
    };
    app.controller = app.controller || {
        bindBuffer: function (ctrl, buffer) {
            var valueA = ctrl.bindInputBuffer(buffer.a),
                valueB = ctrl.bindInputBuffer(buffer.b);
            return {
                a: parseFloat(valueA),
                b: parseFloat(valueB)
            }
        },
        bindInputBuffer: function (bufferInput) {
            var digit = '',
                str = '',
                i = 0;
            if (bufferInput.numeral.length > 0) {
                if (bufferInput.sign === '-') {
                    str = '-';
                }
                for (; i < bufferInput.numeral.length; i++) {
                    digit = bufferInput.numeral[i];
                    str += digit;
                }
            }
            if (bufferInput.isDecimal) {
                str += '.';
                if (bufferInput.fractional.length > 0) {
                    for (i = 0; i < bufferInput.fractional.length; i++) {
                        digit = bufferInput.fractional[i];
                        str += digit;
                    }
                } else {
                    str += '0';
                }
            }
            return parseFloat(str);
        },
        bufferDecimal: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveBuffer(buffer);
            activeBuffer.isDecimal = true;
        },
        bufferOperation: function (buffer, operation) {
            buffer.op = operation;
        },
        bufferNumeralDigit: function (ctrl, buffer, value) {
            var activeNumeralBuffer = ctrl.mapActiveNumeralBuffer(buffer);
            activeNumeralBuffer.push(value);
        },
        bufferFractionalDigit: function (ctrl, buffer, value) {
            var activeFractionalBuffer = ctrl.mapActiveFractionalBuffer(buffer);
            activeFractionalBuffer.push(value);
        },
        bufferNegate: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveBuffer(buffer),
                newSign = '-';

            if (activeBuffer.sign === '-') {
                newSign = '+';
            }
            activeBuffer.sign = newSign;
        },
        bufferComputation: function (buffer, value) {
            buffer.c = value;
        },
        clearBuffer: function (buffer) {
            buffer.a.fractional = [];
            buffer.a.numeral = [];
            buffer.a.sign = '+';
            buffer.a.isDecimal = false;
            buffer.b.fractional = [];
            buffer.b.numeral = [];
            buffer.b.isDecimal = false;
            buffer.b.sign = '+';
            buffer.c = null;
            buffer.op = null;
        },
        compute: function (ctrl, operation, buffer, readout) {
            switch (operation) {
                case '+':
                    return ctrl.commandAdd(ctrl, buffer, readout);
                case '-':
                    return ctrl.commandSubtract(ctrl, buffer, readout);
                case 'x':
                    return ctrl.commandMultiply(ctrl, buffer, readout);
                case '/':
                    return ctrl.commandDivide(ctrl, buffer, readout);
                case '%':
                    return ctrl.commandPercent(ctrl, buffer, readout);
                case 'C':
                    return ctrl.commandClear(ctrl, buffer, readout);
                case '+/-':
                    return ctrl.commandNegate(ctrl, buffer, readout);
                case '.':
                    return ctrl.commandDecimal(ctrl, buffer, readout);
                default:
                    return ctrl.commandError(ctrl, buffer, readout);
            }
        },
        commandAdd: function (ctrl, buffer, readout) {
            var boundBuffer = ctrl.bindBuffer(ctrl, buffer),
                computation = boundBuffer.a + boundBuffer.b;
            ctrl.bufferComputation(buffer, computation);
            ctrl.writeToReadOut(readout, computation);
        },
        commandClear: function (ctrl, buffer, readout) {
            ctrl.writeToReadOut(readout, '0.00');
        },
        commandDecimal: function (ctrl, buffer, readout) {

        },
        commandDivide: function (ctrl, buffer, readout) {
            var boundBuffer = ctrl.bindBuffer(ctrl, buffer),
                computation = boundBuffer.a / boundBuffer.b;
            ctrl.bufferComputation(buffer, computation);
            ctrl.writeToReadOut(readout, computation);
        },
        commandError: function (ctrl, buffer, readout) {
            ctrl.writeToReadOut(readout, 'Err');
        },
        commandMultiply: function (ctrl, buffer, readout) {
            var boundBuffer = ctrl.bindBuffer(ctrl, buffer),
                computation = boundBuffer.a * boundBuffer.b;
            ctrl.bufferComputation(buffer, computation);
            ctrl.writeToReadOut(readout, computation);
        },
        commandNegate: function (ctrl, buffer, readout) {
            if (ctrl.isActiveBufferNegative(ctrl, buffer)) {
                return ctrl.writeSignToReadOut(ctrl, readout, buffer);
            } else {
                return ctrl.writeBufferToReadOut(ctrl, readout, buffer);
            }
        },
        commandPercent: function (ctrl, buffer, readout) {
            var boundBuffer = ctrl.bindBuffer(ctrl, buffer),
                computation = boundBuffer.a + boundBuffer.b;
            ctrl.bufferComputation(buffer, computation);
            ctrl.writeToReadOut(readout, computation);
        },
        commandSubtract: function (ctrl, buffer, readout) {
            var boundBuffer = ctrl.bindBuffer(ctrl, buffer),
                computation = boundBuffer.a - boundBuffer.b;
            ctrl.bufferComputation(buffer, computation);
            ctrl.writeToReadOut(readout, computation);
        },
        init: function (ctrl, value, readout, buffer) {
            // If Buffer is full, then roll the buffer
            if (ctrl.isBufferFull(buffer)) {
                ctrl.rollBuffer(ctrl, buffer);
            }
            // If Clear Buffer reset, Readout = 0.00
            if (ctrl.isClear(value)) {
                return ctrl.initOnClearInput(ctrl, value, readout, buffer);
            }
            // If buffer is empty, redirect
            if (ctrl.isBufferEmpty(buffer)) {
                return ctrl.initOnEmptyBuffer(ctrl, value, readout, buffer);
            }
            // If Operation redirect
            if (ctrl.isOperation(value)) {
                return ctrl.initOnOperationInput(ctrl, value, readout, buffer);
            }
            // If Decimal redirect
            if (ctrl.isDecimal(value)) {
                return ctrl.initOnDecimalInput(ctrl, value, readout, buffer);
            }
            // If Negate redirect
            if (ctrl.isNegate(value)) {
                return ctrl.initOnNegateInput(ctrl, value, readout, buffer);
            }
            // If Equal redirect
            if (ctrl.isEqual(value)) {
                return ctrl.initOnEqualInput(ctrl, value, readout, buffer);
            }
            // If Percent redirect
            if (ctrl.isPercent(value)) {
                return ctrl.initOnPercentInput(ctrl, value, readout, buffer);
            }
            // If Active buffer is Decimal redirect to fractional init
            if (ctrl.isActiveBufferDecimal(ctrl, buffer)) {
                return ctrl.initOnFractionalInput(ctrl, value, readout, buffer);
            }
            // Redirect numeral init
            return ctrl.initOnNumeralInput(ctrl, value, readout, buffer);
        },
        initOnPercentInput: function (ctrl, value, readout, buffer) {
            // Get the name of the active buffer
            // bind the active buffer
            // Divide by 100
            // unbind the result and push back into the buffer
            // write the modified value to the readout
            var activeBuffer = ctrl.mapActiveBuffer(buffer),
                bufferName = ctrl.mapActiveBufferName(buffer),
                boundBufferValue = ctrl.bindInputBuffer(activeBuffer),
                updatedValue = boundBufferValue / 100;
            activeBuffer = ctrl.unbindBufferOutput(updatedValue.toString());
            buffer[bufferName] = activeBuffer;
            ctrl.writeToReadOut(readout, updatedValue + '|');
        },
        initOnEqualInput: function (ctrl, value, readout, buffer) {
            // If operation is not set, do nothing
            if (ctrl.isOperationBufferEmpty(buffer)) {
                return;
            }
            // If active buffer is empty, then zero it
            if (ctrl.isActiveNumeralBufferEmpty(ctrl, buffer)) {
                ctrl.zeroActiveNumeralBuffer(ctrl, buffer);
            }
            // If active buffer is decimal
            if (ctrl.isActiveBufferDecimal(ctrl, buffer)) {
                // And fractional buffer is empty, then zero it
                if (ctrl.isActiveFractionalBufferEmpty(ctrl, buffer)) {
                    ctrl.zeroActiveFractionalBuffer(ctrl, buffer);
                }
            }
            // Perform computation and update readout
            ctrl.compute(ctrl, ctrl.mapOperationBuffer(buffer), buffer, readout);
        },
        initOnFractionalInput: function (ctrl, value, readout, buffer) {
            ctrl.bufferFractionalDigit(ctrl, buffer, value);
            return ctrl.writeBufferToReadOut(ctrl, readout, buffer);
        },
        initOnClearInput: function (ctrl, value, readout, buffer) {
            var me = ctrl;
            me.clearBuffer(buffer);
            return me.compute(me, value, buffer, readout);
        },
        initOnDecimalInput: function (ctrl, value, readout, buffer) {
            var me = ctrl;
            // And ActiveBuffer is Decimal, then user has simply hit the decimal button a second -- do nothing
            if (me.isActiveBufferDecimal(ctrl, buffer)) {
                return true;
            }
            // Otherwise, buffer the decimal and write it to the readout
            me.bufferDecimal(ctrl, buffer);
            return me.writeDecimalToReadOut(ctrl, readout, buffer);
        },
        initOnEmptyBuffer: function (ctrl, value, readout, buffer) {
            // If operation then Buffer.a = 0, Buffer.op = operation
            if (ctrl.isOperation(value)) {
                ctrl.zeroActiveNumeralBuffer(ctrl, buffer);
                ctrl.zeroActiveFractionalBuffer(ctrl, buffer);
                ctrl.bufferOperation(buffer, value);
                return ctrl.writeToReadOut(readout, '|')
            }
            // If decimal then zero the Active Numeral Buffer, set readout = 0.|
            if (ctrl.isDecimal(value)) {
                ctrl.zeroActiveNumeralBuffer(ctrl, buffer);
                ctrl.bufferDecimal(ctrl, buffer);
                return ctrl.writeToReadOut(readout, '0.|');
            }
            // If Negate then set the Active Sign Buffer to "-", set readout = -|
            if (ctrl.isNegate(value)) {
                ctrl.bufferNegate(ctrl, buffer);
                return ctrl.writeToReadOut(readout, '-|');
            }
            // If Equal do nothing
            if (ctrl.isEqual(value)) {
                return ctrl.writeToReadOut(readout, '0');
            }
            // If Percent
            if (ctrl.isPercent(value)) {
                ctrl.bufferDecimal(ctrl, buffer);
                ctrl.bufferFractionalDigit(ctrl, buffer, 0);
                return ctrl.writeToReadOut(readout, '0.0|');
            }
            // If Zero, do nothing
            if (ctrl.isZero(value)) {
                return;
            }
            // Buffer the value and update the readout
            ctrl.bufferNumeralDigit(ctrl, buffer, value);
            ctrl.writeBufferToReadOut(ctrl, readout, buffer);
        },
        initOnNegateInput: function (ctrl, value, readout, buffer) {
            // Flip the buffer sign
            ctrl.bufferNegate(ctrl, buffer);
            // Compute
            return ctrl.compute(ctrl, value, buffer, readout);
        },
        initOnNumeralInput: function (ctrl, value, readout, buffer) {
            ctrl.bufferNumeralDigit(ctrl, buffer, value);
            return ctrl.writeBufferToReadOut(ctrl, readout, buffer);

        },
        initOnOperationInput: function (ctrl, value, readout, buffer) {
            var me = ctrl;

            // if operation buffered then simply update the buffer ~ change the operation
            if (!ctrl.isOperationBufferEmpty(buffer)) {
                return ctrl.bufferOperation(buffer, value);
            }
            // If operation buffer is empty ...
            else {
                ctrl.bufferOperation(buffer, value);
                // Buffer the operation, update the readout
                return ctrl.writeToReadOut(readout, '|')
            }


            ctrl.bufferOperation(buffer, value);
            return ctrl.writeToReadOut(readout, '|');
        },
        isActiveBufferNegative: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveBuffer(buffer);
            if (activeBuffer.sign === "+") {
                return false;
            }
            return true;
        },
        isActiveBufferDecimal: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveBuffer(buffer);
            return activeBuffer.isDecimal;
        },
        isActiveNumeralBufferEmpty: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveNumeralBuffer(buffer);
            return activeBuffer.length > 0 ? false : true;
        },
        isActiveFractionalBufferEmpty: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveNumeralBuffer(buffer);
            return activeBuffer.length > 0 ? false : true;
        },
        isBufferEmpty: function (buffer) {
            if (buffer.a.numeral.length || buffer.a.fractional.length || buffer.op) {
                return false;
            }
            return true;
        },
        isBufferFull: function (buffer) {
            return buffer.c != null;
        },
        isClear: function (value) {
            return value === 'C' ? true : false;
        },
        isDecimal: function (value) {
            return value === '.' ? true : false;
        },
        isEqual: function (value) {
            return value === '=' ? true : false;
        },
        isNegate: function (value) {
            return value === "+/-";
        },
        isOperation: function (value) {
            switch (value) {
                case '+':
                case '-':
                case 'x':
                case '/':
                    return true;
            }
            return false;
        },
        isOperationBufferEmpty: function (buffer) {
            return buffer.op ? false : true;
        },
        isPercent: function (value) {
            return value === "%";
        },
        isZero: function (value) {
            return value.toString() === "0";
        },
        mapOutputBuffer: function (buffer) {
            return buffer.c;
        },
        mapActiveBuffer: function (buffer) {
            if (buffer.op) {
                return buffer.b;
            } else {
                return buffer.a;
            }
        },
        mapActiveBufferName: function (buffer) {
            if (buffer.op) {
                return 'b';
            } else {
                return 'a';
            }
        },
        mapActiveNumeralBuffer: function (buffer) {
            if (buffer.op) {
                return buffer.b.numeral;
            } else {
                return buffer.a.numeral;
            }
        },
        mapActiveFractionalBuffer: function (buffer) {
            if (buffer.op) {
                return buffer.b.fractional;
            } else {
                return buffer.a.fractional;
            }
        },
        mapOperationBuffer: function (buffer) {
            return buffer.op;
        },
        onButtonClick: function (e) {
            var ctrl = app.controller,
                value = e.data[0],
                readout = e.data[1],
                buffer = e.data[2];
            ctrl.init(ctrl, value, readout, buffer);
        },
        rollBuffer: function (ctrl, buffer) {
            var output = ctrl.mapOutputBuffer(buffer),
                outputStr = output.toString(),
                bufferInputA = ctrl.unbindBufferOutput(outputStr);
            ctrl.clearBuffer(buffer);
            buffer.a = bufferInputA;
        },
        unbindBufferOutput: function (value) {
            var i = 0,
                digit = '',
                bufferValue = {
                    numeral: [],
                    fractional: [],
                    isDecimal: false,
                    sign: '+'
                }
            for (; i < value.length; i++) {
                digit = value[i];
                switch (digit) {
                    case '-':
                        bufferValue.sign = '-';
                        break;
                    case '.':
                        bufferValue.isDecimal = true;
                        break;
                    default:
                        if (bufferValue.isDecimal) {
                            bufferValue.fractional.push(digit);
                        } else {
                            bufferValue.numeral.push(digit);
                        }
                        break;
                }
            }
            return bufferValue;
        },
        writeSignToReadOut: function (ctrl, readout, buffer) {
            return ctrl.writeBufferToReadOut(ctrl, readout, buffer, '-');
        },
        writeDecimalToReadOut: function (ctrl, readout, buffer) {
            var activeNumeralBuffer = ctrl.mapActiveNumeralBuffer(buffer),
                digit = '',
                i = 0,
                readOutValue = '';
            if (activeNumeralBuffer.length) {
                for (; i < activeNumeralBuffer.length; i++) {
                    digit = activeNumeralBuffer[i];
                    readOutValue += digit;
                }
            } else {
                readOutValue = '0';
            }
            readOutValue += '.|';
            readout.text(readOutValue);
        },
        writeBufferToReadOut: function (ctrl, readout, buffer) {
            var activeNumeralBuffer = ctrl.mapActiveNumeralBuffer(buffer),
                activeFractionalBuffer = ctrl.mapActiveFractionalBuffer(buffer),
                digit = '',
                i = 0,
                readOutValue = ctrl.isActiveBufferNegative(ctrl, buffer) ? '-' : '';
            if (activeNumeralBuffer.length) {
                for (; i < activeNumeralBuffer.length; i++) {
                    digit = activeNumeralBuffer[i];
                    readOutValue += digit;
                }
            } else {
                readOutValue = '0';
            }
            if (activeFractionalBuffer.length) {
                readOutValue += '.';
                for (i = 0; i < activeFractionalBuffer.length; i++) {
                    digit = activeFractionalBuffer[i];
                    readOutValue += digit;
                }
            }
            readOutValue += '|';
            readout.text(readOutValue);
        },
        writeToReadOut: function (readout, value) {
            readout.text(value);
        },
        zeroActiveNumeralBuffer: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveBuffer(buffer);
            activeBuffer = [0];
        },
        zeroActiveFractionalBuffer: function (ctrl, buffer) {
            var activeBuffer = ctrl.mapActiveFractionalBuffer(buffer);
            activeBuffer = [0];
        }
    };
    app.view = app.view || {
        Button: function (cls, id, text, parent, handler, args) {
            var me = this;
            new app.view.Base(me, id, 'btn', cls, parent, function () {
                me.self.text(text);
                if (handler) {
                    me.self.bind('click', args, handler);
                }
            });
        },
        Container: function (parent) {
            var me = this;
            new app.view.Base(me, null, 'container-fluid', null, parent);
        },
        Form: function (parent) {
            var me = this;
            new app.view.Base(me, null, 'form-group', null, parent);
        },
        ReadOut: function (id, parent) {
            var me = this;
            new app.view.Base(me, id, 'row navbar-right navbar-brand digital', null, parent, function () {
                me.self.text('0.00');
            });
        },
        Row: function (parent) {
            var me = this;
            new app.view.Base(me, null, 'row', null, parent);
        },
        ButtonGroup: function (parent) {
            var me = this;
            new app.view.Base(me, null, "btn-group-justified", null, parent);
        },
        Table: function (parent) {
            var me = this;
            new app.view.Base(me, null, 'col-lg-4 table-bordered', null, parent);
        },
        Base: function (that, id, baseCls, cls, parent, callback) {
            var me = that;
            me.baseCls = baseCls;
            if (cls) {
                me.cls = cls;
            }
            if (id) {
                me.title = id;
                me.id = id;
            }
            me.self = null;
            me.render = function () {
                var me = this,
                    renderedCls = me.cls ? (me.baseCls + ' ' + me.cls) : me.baseCls;
                if (me.id) {
                    me.self = $('<div>', {
                        id: me.id,
                        class: renderedCls
                    });
                } else {
                    me.self = $('<div>', {
                        class: renderedCls
                    });
                }
                if (parent) {
                    me.parent = parent;
                    me.self.appendTo(parent);
                }
                if (callback) {
                    callback.apply(me.self, [arguments]);
                }
            };
            me.render();
        },
        render: function (hook) {
            // ToDo ~ Refactor - To much logic in one function
            var i = 1,
                b = 0,
                rowCount = app.store.buttonRowCount,
                row = null,
                buttonGroup = null,
                buttonModel = null,
                buttons = [],
                rowIdPrefix = 'row',
                rowId = '',
                buttonClsPrefix = 'btn-',
                buttonCls = '',
                buttonId = '',
                buttonClickEventArgs = [],
                buttonClickEventBaseArgs = [];
            app.container = new app.view.Container(hook);
            app.container.form = new app.view.Form(app.container.self);
            app.container.form.table = new app.view.Table(app.container.form.self);
            app.container.form.table.readout = new app.view.ReadOut('readout', app.container.form.table.self);
            buttonClickEventBaseArgs.push(app.container.form.table.readout.self);
            buttonClickEventBaseArgs.push(app.store.buffer);
            for (; i <= rowCount; i++) {
                buttons = app.store.findButtonRow(i);
                rowId = rowIdPrefix + i;
                app.container.form.table[rowId] = new app.view.Row(app.container.form.table.self);
                app.container.form.table[rowId].buttonGroup = new app.view.ButtonGroup(
                    app.container.form.table[rowId].self);
                for (b = 0; b < buttons.length; b++) {
                    buttonModel = buttons[b];
                    buttonClickEventArgs = [buttonModel.text].concat(buttonClickEventBaseArgs);
                    buttonId = 'btn' + buttonModel.row + buttonModel.col;
                    buttonCls = buttonClsPrefix + buttonModel.type;
                    app.container.form.table[rowId].buttonGroup[buttonId] = new app.view.Button(buttonCls,
                        buttonId, buttonModel.text,
                        app.container.form.table[rowId].buttonGroup.self,
                        app.controller.onButtonClick, buttonClickEventArgs);
                }
            }
        },
        init: function () {
            var hook = $('#fiddleHook');
            this.render(hook);
        }
    };
    app.model = app.model || {
        input: {
            value: 0
        },
        result: {
            value: 0.0
        }
    };

    $(document).ready(function () {
        app.view.init();
    });
})(window.app = window.app || {}, jQuery);
