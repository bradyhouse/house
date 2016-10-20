Ext.define('Fiddle.JsonPostProxy', {
  extend: 'Ext.data.proxy.Ajax',
  requires: [
    'Fiddle.Ajax'
  ],
  alias: 'proxy.jsonpost',
  isJsonPostProxy: true,
  config: {
    actionMethods: {
      read: 'POST'
    },
    defaultHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    useDefaultXhrHeader: false,
    withCredentials: false,
    cors: true,
    noCache: false,
    paramsAsJson: true,
    sortParam: false,
    timeout: 120000
  }
});