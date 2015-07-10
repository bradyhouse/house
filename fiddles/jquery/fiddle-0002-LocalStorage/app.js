(function (app, $, undefined) {

    $(document).ready(function () {
        var fiddleDiv = $("#fiddleHook"),
            editorDiv = $("#editor"),
            messageTextArea = $("#messageTextArea"),
            saveButton = $("#saveButton"),
            storageEnabled = app.isStorageSupported(),
            objectMessage = {
                message: storageEnabled && localStorage.getItem("message-textarea-val") ? localStorage.getItem("message-textarea-val") : "Enter your message"
            },
            messageTextAreaHeight = storageEnabled && localStorage.getItem("message-textarea-height") ? localStorage.getItem("message-textarea-height") : "93px",
            messageTextAreaWidth = storageEnabled && localStorage.getItem("message-textarea-width") ? localStorage.getItem("message-textarea-width") : "124px";

        fiddleDiv.addClass('enter-stage-right');

        if (storageEnabled) {
            messageTextArea.val(objectMessage.message);
            messageTextArea.css('height', messageTextAreaHeight);
            messageTextArea.css('width', messageTextAreaWidth);
            saveButton.click(function () {
                message = messageTextArea.val();
                window.incrementDataStore = localStorage.setItem("message-textarea-val", message);
                messageTextAreaHeight = messageTextArea.height();
                messageTextAreaWidth = messageTextArea.width();
                window.incrementDataStore = localStorage.setItem("message-textarea-height", messageTextAreaHeight);
                window.incrementDataStore = localStorage.setItem("message-textarea-width", messageTextAreaWidth);
            });
        } else {
            editorDiv.html("Local Storage is not supported in this browser :(");
        }
    });

    app.isStorageSupported = function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    }


})(window.app = window.app || {}, jQuery)
