var metaData = {
    url: 'http://chartapi.finance.yahoo.com/instrument/1.0/%5EDJI/chartdata;type=quote;range=5d/json/'
};

(function (app, $, undefined) {
    "use strict";
    app.util = app.util || {
        request: function () {
            $.ajax({
                url: metaData.url,
                dataType: 'jsonp',
                success: function (response) {
                    var json = response,
                        timeStampRanges = json['TimeStamp-Ranges'],
                        timeStampRangesCount = timeStampRanges.length,
                        timeStampRangesIndex = 0,
                        stdout = '<h3>TimeStamp Ranges</h3>',
                        timeStampRange = null;
                    for (; timeStampRangesIndex < timeStampRangesCount; timeStampRangesIndex++) {
                        timeStampRange = new app.model.TimeStampDateRange(timeStampRanges[timeStampRangesIndex]);
                        stdout += timeStampRange.toString() + '<br />';
                        app.store.TimeStampDateRanges.push(timeStampRange);

                    }
                    app.util.log(stdout);
                }
            });

        },
        log: function (msg) {
            $(".log").html(msg);
        }
    };
    app.model = app.model || {
        Meta: class {
            constructor(config) {
                this.uri = config.uri;
                this.ticker = config.ticker;
                this.companyName = config['Company-Name'];
                this.exchangeName = config['Exchange-Name'];
                this.unit = config.unit;
                this.timezone = config.timezone;
                this.currency = config.currency;
                this.gmtoffset = config.gmtoffset;
                this.previousClose=config['previous_close'];
            };
            get uri() {
                return this._uri;
            };
            set uri(value) {
                this._uri = value;
            };
            get ticker() {
                return this._ticker;
            };
            set ticker(value) {
                this._ticker = value;
            };
            get companyName() {
                return this._companyName;
            };
            set companyName(value) {
                this._companyName = value;
            };
            get exchangeName() {
                return this._exchangeName;
            };
            set exchangeName(value) {
                this._exchangeName = value;
            };
            get unit() {
                return this._unit;
            };
            set unit(value) {
                this._unit = value;
            };
            get timezone() {
                return this._timezone;
            };
            set timezone(value) {
                this._timezone = value;
            };
            get currency() {
                return this._currency;
            };
            set currency(value) {
                this._currency = value;
            };
            get gmtoffset() {
                return this._gmtoffset;
            };
            set gmtoffset(value) {
                this._gmtoffset = value;
            };
            get previousClose() {
                return this._previousClose;
            };
            set previousClose(value) {
                this._previousClose = value;
            };
        },
        TimeStamp: class {
            constructor(config) {
                this.min = config.min;
                this.max = config.max;
            };
            get min() {
                return this._min;
            };
            set min(value) {
                this._min = value;
            };
            get max() {
                return this._max;
            };
            set max(value) {
                this._max = value;
            };
        },
        TimeStampDateRange: class {
            constructor(config) {
                this.date = config.date;
                this.min = config.min;
                this.max = config.max;
            };
            get date() {
                return this._date;
            };
            set date(value) {
                this._date = value;
            };
            get min() {
                return this._min;
            };
            set min(value) {
                this._min = value;
            };
            get max() {
                return this._max;
            };
            set max(value) {
                this._max = value;
            };
            toString() {
                return this.date + ',' +
                    this.min + ',' +
                    this.max;
            }
        },
        Series: class {
            constructor(config) {
                this.timestamp = config.Timestamp;
                this.close = config.close;
                this.high = config.high;
                this.low = config.low;
                this.open = config.open;
                this.volume = config.volume;
            };
            get timestamp() {
                return this._timestamp;
            };
            set timestamp(value) {
                this._timestamp = value;
            };
            get close() {
                return this._close;
            };
            set close(value) {
                this._close = value;
            };
            get high() {
                return this._high;
            };
            set high(value) {
                this._high = value;
            };
            get low() {
                return this._low;
            };
            set low(value) {
                this._low = value;
            };
            get open() {
                return this._open;
            };
            set open(value) {
                this._open = value;
            };
            get volume() {
                return this._volume;
            };
            set volume(value) {
                this._volume = value;
            };
        }
    };
    app.store = app.store || {
        TimeStampDateRanges: [],
        TimeStamps: [],
        Labels: [],
        Ranges: [],
        Series: [],
        labels: []
    };
    app.view = app.view || {
        init: function () {
            app.util.request();
        }
    };
})(window.app = window.app || {}, jQuery)


