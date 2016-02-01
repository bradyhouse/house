(function (app, $, undefined) {
    "use strict";
    app.dialog = function(html, actions) {
        var dlg;
        return {
            alert: function (msg) {
                app.dialog.self("<p>" + msg + "</p><button id='dlg-close'>OK</button>",
                    [
                        {
                            id: 'dlg-close'
                        }
                    ]
                );
            },
            confirm: function (msg, btnYes, btnNo, actionYes, actionNo) {
                app.dialog.self(
                    "<p>" + msg + "</p><button id='dlg-no'>" + btnNo + "</button>" +
                    "<button id='dlg-yes'>" + btnYes + "</button>",
                    [
                        {
                            id: "dlg-no",
                            action: actionNo
                        },
                        {
                            id: "dlg-yes",
                            action: actionYes
                        }
                    ]
                );
            },
            setup: function() {
                if (!document.querySelector("#dlg-dialog")) {
                    dlg = document.createElement("dialog");
                    dlg.id = 'dlg-dialog';
                    document.body.appendChild(dlg);
                    var css = document.createElement("style");
                    css.type = "text/css";
                    css.innerHTML =
                        "#dlg-dialog {" +
                        "	border: 1px solid rgba(0, 0, 0, 0.3);" +
                        "	border-radius: 6px;" +
                        "	box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);" +
                        "}";
                    document.body.appendChild(css);
                }
            },
            self: function(html, actions) {
                app.dialog.setup();
                dlg.innerHTML = html;
                dlg.showModal();
                var funcs = [];
                for (var i = 0; i < actions.length; i++) {
                    funcs[i] = (function(index) {
                        return function() { // index bound here instead to function dialog
                            dlg.close();
                            if (actions[index].action)
                                actions[index].action();
                        }
                    })(i);
                    document.getElementById(actions[i].id).addEventListener("click", funcs[i]);
                }
            }
        }
    };
    app.listeners = function() {
        return {
            onNewButtonClick: function() {
                app.file().new();
            },
            onOpenButtonClick: function() {

            },
            onSaveButtonClick: function() {
                if (app.fileEntry) {
                    save();
                } else {
                    chrome.fileSystem.chooseEntry(
                        {
                            type: 'saveFile'
                        },
                        function (fe) {
                            if (fe) {
                                fileEntry = fe;
                                save();
                                document.title = 'Simple Editor - ' + fe.name;
                            }
                        }
                    );
                }

            },
            onSaveAsButtonClick: function() {

            },
            onTextAreaChange: function() {
                if (e.type !== 'keydown' || e.keyCode === 8 || e.keyCode === 46) {
                    app.dirty = true;
                }
            },
            onError: function(e) {
                console.dir(e);
                var msg;
                if (e.target && e.target.error)
                    e = e.target.error;
                if (e.message)
                    msg = e.message;
                else if (e.name)
                    msg = e.name;
                else if (e.code)
                    msg = "Code " + e.code;
                else
                    msg = e.toString();
                app.msg().show('Error: ' + msg);
            }
        };
    };
    app.isDirty = function(callback) {
        if (dirty) {
            app.dialog().confirm('Discard changes?', 'Discard', 'Keep', callback);
        } else {
            callback();
        }
    };
    app.file = function() {
        return {
            new: function() {
                app.isDirty(function() {
                    app.fileEntry = null;
                    app.textarea.value = "";
                    app.textarea.focus();
                    app.dirty = false;
                    document.title = 'Simple Editor - [new]';
                });
            },
            save: function() {
                app.fileEntry.createWriter(
                    function (fileWriter) {
                        fileWriter.onerror = errorHandler;
                        fileWriter.onwrite = function (e) {
                            fileWriter.onwrite = function (e) {
                                showMessage('Saved OK', true);
                                dirty = false;
                                taElement.focus();
                            };
                            var blob = new Blob([taElement.value],
                                {type: 'text/plain'});
                            fileWriter.write(blob);
                        };
                        fileWriter.truncate(0);
                    },
                    errorHandler
                );
            }
        }
    }
    app.msg = function() {
        return {
            show: function(msg, good) {
                console.log(msg);
                var messageElement = document.querySelector("#message");
                messageElement.style.color = good ? "green" : "red";
                messageElement.innerHTML = msg;
                if (timeoutID)
                    clearTimeout(timeoutID);
                timeoutID = setTimeout(
                    function () {
                        messageElement.innerHTML = "&nbsp;";
                    },
                    5000
                );
            }
        };
    };
    window.onload=function() {
        var textarea = document.querySelector("#textarea"),
            listeners = app.listeners();

        app.dirty = false;
        app.fileEntry = null;

        document.querySelector("#newButton").addEventListener("click", listeners.onNewButtonClick);
        document.querySelector("#openButton").addEventListener("click", listeners.onOpenButtonClick);
        document.querySelector("#saveButton").addEventListener("click", listeners.onSaveButtonClick);
        document.querySelector("#saveAsButton").addEventListener("click", listeners.onSaveAsButtonClick);

        textarea.addEventListener("keypress", listeners.onTextAreaChange);
        textarea.addEventListener("paste", listeners.onTextAreaChange);
        textarea.addEventListener("cut", listeners.onTextAreaChange);
        textarea.addEventListener("change", listeners.onTextAreaChange);
        textarea.addEventListener("keydown", listeners.onTextAreaChange);

        app.textarea = textarea;
    };
})(window.app = window.app || {})

