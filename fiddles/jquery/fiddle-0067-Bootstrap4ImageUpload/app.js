(function (app, $, undefined) {
  "use strict";
  app.view = app.view || {
    renderImage: function (files, imgCtrl) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i],
          reader = new FileReader();
        reader.onload = (function (aImg) {
          return function (e) {
            aImg.src = e.target.result;
          };
        })(imgCtrl);
        reader.readAsDataURL(file);
      }
    },
    renderTxt: function (files, txtCtrl) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i],
          reader = new FileReader();
        reader.onload = (function (txt) {
          return function (e) {
            txt.value = e.target.result;
          };
        })(txtCtrl);
        reader.readAsDataURL(file);
      }
    }
  };
  $(document).ready(function () {
    $('#imageUpload').change(function () {
      let files = $('#imageUpload').prop('files'),
        imgCtrl = document.getElementById('uploadedImg'),
        txtCtrl = document.getElementById('imgString');
      if (imgCtrl && files && files.length) {
        app.view.renderImage(files, imgCtrl);
        if (txtCtrl) {
          app.view.renderTxt(files, txtCtrl);
        }
      }
    });
  });
})(window.app = window.app || {}, jQuery);
