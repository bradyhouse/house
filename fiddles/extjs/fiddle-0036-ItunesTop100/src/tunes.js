Ext.define('Fiddle.Tunes', {
  extend: 'Ext.data.Store',
  requires: [
    'Fiddle.JsonPostProxy',
    'Fiddle.Tune'
  ],
  config: {
    autoDestroy: true,
    proxy: {
      type: 'jsonpost',
      url: 'fake',
      reader: {
        type: 'json',
        rootProperty: 'feed.entry'
      }
    },
    listeners: {
      beforeload: 'onStoreBeforeLoad'
    },
    remoteSort: false,
    autoLoad: true
  },
  onStoreBeforeLoad: function (store, operation) {
    var url = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
      'http://' + window.location.hostname,
      params = {
        url: meta.urls.itunesRSSFeed,
        allowOrigin: url,
        convertToJson: false,
        allowCredentials: true,
        allowMethods: 'POST',
        allowHeaders: 'Content-Type'
      };

    encodedParams = window.encodeURIComponent(params),
      targetUrl = 'https://12-bradyhouse.rhcloud.com/passthru';
    store.proxy.setUrl(targetUrl);
    operation.setParams(params);
  },

  onProxyLoad: function (operation) {
    var me = this,
      resultSet = operation.getResultSet(),
      records = operation.getRecords(),
      successful = operation.wasSuccessful();

    if (me.destroyed) {
      return;
    }

    if (resultSet) {
      me.totalCount = resultSet.getTotal();
    }

    if (successful) {
      records = me.inflateRecords(records);
      me.loadRecords(records, operation.getAddRecords() ? {
        addRecords: true
      } : undefined);
    } else {
      me.loading = false;
    }

    if (me.hasListeners.load) {
      me.fireEvent('load', me, records, successful, operation);
    }
    me.callObservers('AfterLoad', [records, successful, operation]);
  },

  inflateRecords: function (records) {
    var inflatedRecords = [],
      i = 0;

    records.map(function (record) {
      var longTitle = record.data.title.label,
        shortTitle = longTitle.length > 30 ? longTitle.substring(1, 30) + '...' : longTitle;


      inflatedRecords.push(new Fiddle.Tune({
        tag: shortTitle,
        title: record.data.title.label,
        artist: record.data["im:artist"].label,
        category: record.data.category.attributes.label,
        price: record.data["im:price"].label,
        image: record.data["im:image"][2].label,
        preview: record.data.link[1].attributes.href,
        id: record.data.id.attributes["im:id"],
        currency: record.data["im:price"].attributes.currency,
        link: record.data.link[0].attributes.href
      }));
      i++;
    });

    return inflatedRecords;

  }


}, function () {
  /*Ext.create('Fiddle.Tunes', {
    storeId: 'tunes'
  });*/
});


