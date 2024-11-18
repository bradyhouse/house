Ext.define('Fiddle.Msg', {
  requires: [
    'Ext.window.MessageBox'
  ],
  statics: {
    error: function (title, msg, fn) {
      var Msg = Ext.Msg;
      Msg.resizable = true;
      Msg.show({
        title: title,
        message: msg,
        modal: true,
        buttons: Msg.OK,
        icon: Msg.ERROR,
        width: 300,
        fn: fn
      });
    },
    question: function (title, msg, count, yFn, nFn) {
      var Msg = Ext.Msg,
        dialogTitle = count > 0 ? title + ' (' + count + ')' : title,
        rc = count + 1;
      Msg.resizable = true;
      Msg.show({
        title: dialogTitle,
        message: msg,
        modal: false,
        buttons: Msg.YESNO,
        icon: Msg.QUESTION,
        closable: false,
        width: 300,
        fn: function (btn) {
          switch (btn) {
            case 'yes':
              if (Ext.isFunction(yFn)) {
                yFn(rc);
              }
              break;
            default:
              if (Ext.isFunction(nFn)) {
                nFn(rc);
              }
              break;
          }
        }
      });
    }
  }
});