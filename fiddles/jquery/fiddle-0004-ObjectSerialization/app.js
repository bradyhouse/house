(function (app, $, undefined) {

    $(document).ready(function () {
        var fiddleDiv = $("#fiddleHook"),
            editorDiv = $("#editor"),
            messageTextArea = $("#messageTextArea"),
            saveButton = $("#saveButton"),
            storageEnabled = isStorageSupported(),
            objectMesssageDefault = {
                message: "Enter your message"
            },
            objectMessage = storageEnabled && localStorage.getItem("message-textarea-val") ? JSON.parse(localStorage.getItem("message-textarea-val")) : objectMesssageDefault;

        // Boiler Plate
        addSomeBling(fiddleDiv);

        if (objectMessage) {
            messageTextArea.val(objectMessage.message);
            saveButton.click(function () {
                objectMessage.message = messageTextArea.val();
                window.incrementDataStore = localStorage.setItem("message-textarea-val", JSON.stringify(objectMessage));
            });
        } else {
            editorDiv.html("Local Storage is not supported in this browser :(");
        }

        function isStorageSupported() {
            try {
                return 'localStorage' in window && window.localStorage !== null;
            } catch (e) {
                return false;
            }
        }

        function addSomeBling(ctrl) {
            ctrl.addClass('enter-stage-south');
        }

    });


})(window.app = window.app || {}, jQuery)
