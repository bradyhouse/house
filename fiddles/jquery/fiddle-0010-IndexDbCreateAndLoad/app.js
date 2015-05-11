(function (app, $, undefined) {
    "use strict";

    app.util = app.util || {
        logError: function (msg) {
            var div = document.createElement("div");
            div.class = "text-danger";
            $(div).text(msg);
            $("#fiddleHook").append(div);
        },
        log: function (msg) {
            var div = document.createElement("div");
            $(div).text(msg);
            $("#fiddleHook").append(div);
        }
    };
    app.store = app.store || {
        rawData: {
            "total": "5",
            "data": [
                {
                    "_id": "554a55f68f4a863bece420ac",
                    "checkingBalance": "287,200.729618780",
                    "savingsBalance": "554,261.164204218"
                },
                {
                    "_id": "554a55f6d4de0a97f239af33",
                    "checkingBalance": "738,445.201842115",
                    "savingsBalance": "922,646.166034975"
                },
                {
                    "_id": "554a55f63ceea9d55941f25e",
                    "checkingBalance": "56,774.889724329",
                    "savingsBalance": "807,446.987740696"
                },
                {
                    "_id": "554a55f6e6421251f8753629",
                    "checkingBalance": "154,880.653694272",
                    "savingsBalance": "782,345.341867768"
                },
                {
                    "_id": "554a55f65d827684aa04cf83",
                    "checkingBalance": "617,043.463815935",
                    "savingsBalance": "-81,862.060748972"
                }
            ]
        },
        createObjectStore: function (database, storeName, primaryKey) {
            app.util.log('createObjectStore');
            var objStore = database.createObjectStore(storeName, {
                keyPath: primaryKey
            });
            objStore.createIndex(primaryKey, primaryKey, {
                unique: true
            });
        },
        dbRequest: null,
        initDbData: false,
        db: null,
        dropObjectStore: function (database, storeName) {
            app.util.log('dropObjectStore');
            if (database.objectStoreNames.contains(storeName)) {
                database.deleteObjectStore(storeName);
            }
        },
        init: function () {
            var me = this;
            me.dbRequest = window.indexedDB.open("One", 4);
            me.dbRequest.onupgradeneeded = me.onDbRequestUpgradeNeeded;
            me.dbRequest.onerror = me.onDbRequestError;
            me.dbRequest.onsuccess = me.onDbRequestSuccess;
        },
        initDatabase: function (event, callback) {
            app.util.log('app.store.initDatabase');
            var tempDb = event.target.result;
            app.store.dropObjectStore(tempDb, 'pseudoAccounts');
            app.store.createObjectStore(tempDb, 'pseudoAccounts', '_id');
        },
        load: function (json) {
            app.util.log('load');
            var i = 0,
                records = json.data,
                database = app.store.db,
                pseudoAccountStore = null;
            if (!database || !records)
                return;
            pseudoAccountStore =  database.transaction("pseudoAccounts", "readwrite").objectStore("pseudoAccounts");
            for (; i < records.length; i++) {
               pseudoAccountStore.add(records[i]);
            }
            app.util.log(i + ' records loaded');
        },
        onDbRequestUpgradeNeeded: function (event) {
            app.util.log('app.store.onDbUpgradeNeeded');
            app.store.initDatabase(event);
            app.store.initDbData = true;
        },
        onDbRequestError: function (event) {
            app.util.logError(request.errorCode);
        },
        onDbRequestSuccess: function (event) {
            app.util.log('app.store.onDbSuccess');
            app.store.db = this.result;
            if (app.store.initDbData) {
                app.store.initDbData = false;
                app.store.load(app.store.rawData);
            }
        }
    };
    app.init = function () {
        app.store.init();
    };
    // Entry Point
    $(document).ready(function () {
        app.init();
    });
    $(document).ajaxComplete(function (event, xhr, settings) {
        app.util.log('document.ajaxComplete');
        var json = JSON.parse(xhr.responseText);
        if (settings.url === "data.json") {
            app.store.load(window.json);
        }
    });
})(window.app = window.app || {}, jQuery);
