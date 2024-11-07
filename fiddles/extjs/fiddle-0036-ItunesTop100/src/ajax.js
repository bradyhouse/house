Ext.define('Fiddle.Ajax', {
  requires: [
    'Ext.Ajax',
    'Fiddle.Msg'
  ],
  statics: {
    verifyResponse: function (response) {
      var respText;
      if (Ext.isObject(response)) {
        respText = response.responseText;
        switch (response.status) {
          case 401:
          case 403:
          case 404:
          case 408:
          case 500:
            return "HTTP " + response.status + ' Error';
            break;
          default:
            return 'Unknown HTTP Error';
            break;
        }
      } else {
        return 'Unknown server error.';
      }
    }
  }
}, function (Ajax) {
  Ext.Ajax.setConfig({
    defaultHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    defaultPostHeader: 'application/json',
    useDefaultXhrHeader: false,
    withCredentials: true,
    cors: true,
    timeout: 120000
  });
  Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
    if (!conn.retryCount) {
      conn.retryCount = 0;
    }
    Fiddle.Msg.question(Fiddle.Ajax.verifyResponse(response), 'Do you want to retry?', conn.retryCount, function (count) {
      conn.retryCount = count;
      conn.request(options);
    });
  });
});