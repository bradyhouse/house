(function (app, $, undefined) {
    "use strict";

    app.view = app.view || {
        renderImage: function (obj) {
          let fileList = obj.files;
          for (var i = 0; i < fileList.length; i++) {
            let file = fileList[i],
              img = document.createElement("img");

            document.getElementById('fiddleHook').appendChild(img);
            let reader = new FileReader();
            reader.onload = (function (aImg) {
              return function (e) {
                aImg.src = e.target.result;
              };
            })(img);
            reader.readAsDataURL(file);
          }
        }
    };
    $(document).ready(function () {
      $('#imageUpload').change(function(file) {
            app.view.renderImage(file);
      });
    });
})(window.app = window.app || {}, jQuery)
