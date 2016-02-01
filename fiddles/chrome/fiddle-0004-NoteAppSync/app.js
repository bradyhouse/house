(function (app, $, undefined) {
    "use strict";

    var dirty = false,
        directoryEntry,
        fileEntry,
        fileWriter,
        timeoutID;

    app.onRequestFileSystem = function(fs) {
        fs.root.getDirectory("Note",
            {
                create: true,
                exclusive: false
            },
            function (de) {
                directoryEntry = de;
                app.file().read();
            },
            app.onError
        );
    };

    app.onTextAreaChange = function(e) {
        if (e.type !== 'keydown' ||
            e.keyCode === 8 || e.keyCode === 46) // backspace or delete
            dirty = true;
    };

    app.setupAutoSave = function() {
        var taElement = document.querySelector("#textarea");
        taElement.addEventListener("keypress", app.onTextAreaChange);
        taElement.addEventListener("paste", app.onTextAreaChange);
        taElement.addEventListener("cut", app.onTextAreaChange);
        taElement.addEventListener("change", app.onTextAreaChange);
        taElement.addEventListener("keydown", app.onTextAreaChange);
    };

    app.onError = function(e) {
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
    };

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

    app.file = function() {
        return {
            get: function(create, callback) {
                if (fileWriter)
                    callback();
                else if (directoryEntry) {
                    directoryEntry.getFile('note.txt',
                        {
                            create: create,
                            exclusive: false
                        },
                        function (fe) {
                            fileEntry = fe;
                            fileEntry.createWriter(
                                function (fw) {
                                    fileWriter = fw;
                                    callback();
                                },
                                app.onError
                            );
                        },
                        function (e) {
                            if (e.name === 'NotFoundError')
                                callback();
                            else
                                app.onError(e);
                        }
                    );
                }
            },
            load: function(file) {
                var reader = new FileReader();
                reader.onload = function() {
                    document.querySelector("#textarea").value = reader.result;
                };
                reader.readAsText(file);
            },
            read: function() {
                app.file().showStatus();
                app.file().get(false,
                    function() {
                        if (fileEntry)
                            fileEntry.file(app.file().load, app.onError);
                    }
                );
            },
            save: function() {
                app.file().get(true,
                    function() {
                        fileWriter.onwrite = function(e) {
                            fileWriter.onwrite = function(e) {
                                dirty = false;
                                app.msg().show("Saved", true);
                            };
                            var blob = new Blob([document.querySelector("#textarea").value],
                                {type: 'text/plain'});
                            fileWriter.write(blob);
                        };
                        fileWriter.onerror = app.onError;
                        fileWriter.truncate(0);
                    }
                );
            },
            showStatus: function(status) {
                var statusElement = document.querySelector("#status");
                if (status)
                    statusElement.innerHTML = status;
                else
                    app.file().get(false,
                        function() {
                            if (fileEntry)
                                chrome.syncFileSystem.getFileStatus(fileEntry,
                                    function (status) {
                                        statusElement.innerHTML = status;
                                    }
                                );
                            else
                                statusElement.innerHTML = "no local copy";
                        }
                    );
            }
        };
    };

    window.onload = function () {
        chrome.syncFileSystem.requestFileSystem(
            function (fs) {
                if (chrome.runtime.lastError) {
                    app.msg().show(chrome.runtime.lastError.message);
                } else {
                    app.onRequestFileSystem(fs);
                }
            }
        );
        app.setupAutoSave();
    };

    chrome.idle.setDetectionInterval(15);

    chrome.idle.onStateChanged.addListener(
        function (state) {
            if (state === "idle" && dirty)
                app.file().save();
        }
    );

    chrome.syncFileSystem.onFileStatusChanged.addListener(
        function (detail) {
            if (detail.fileEntry.name === "note.txt") {
                showMessage(detail.fileEntry.name + " &bull; " +
                    detail.direction + " &bull; " + detail.action +
                    " &bull; " + detail.status, true);
                if (detail.direction === 'remote_to_local' &&
                    detail.status === 'synced')
                    app.file().read();
                app.file().showStatus(detail.status);
            }
        }
    );

})(window.app = window.app || {})

