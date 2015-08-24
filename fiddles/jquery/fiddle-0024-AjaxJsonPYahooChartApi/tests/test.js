TestCase("app.model", {
    setUp: function () {
        this.meta = new app.model.Meta({
            "uri" :"/instrument/1.0/^DJI/chartdata;type=quote;range=5d/json/",
            "ticker" : "^dji",
            "Company-Name" : "Dow Jones Industrial Average",
            "Exchange-Name" : "DJI",
            "unit" : "MIN",
            "timezone" : "EDT",
            "currency" : "USD",
            "gmtoffset" : -14400,
            "previous_close" : 17751.3906
        });
        this.timestamp = new app.model.TimeStamp({"min": 1438003800, "max": 1438372800});
        this.timestampdaterange = new app.model.TimeStampDateRange({
            "date": 20150727,
            "min": 1438003800,
            "max": 1438027200
        });
    },
    tearDown: function () {
     this.meta = null;
     this.timestamp = null;
     this.timestampdaterange = null;
     },
    "test meta model": function() {
        assertEquals(this.meta.uri, "/instrument/1.0/^DJI/chartdata;type=quote;range=5d/json/");
        assertEquals(this.meta.ticker, "^dji");
        assertEquals(this.meta.companyName, "Dow Jones Industrial Average");
        assertEquals(this.meta.exchangeName, "DJI");
        assertEquals(this.meta.unit, "MIN");
        assertEquals(this.meta.timezone, "EDT");
        assertEquals(this.meta.currency, "USD");
        assertEquals(this.meta.gmtoffset, -14400);
        assertEquals(this.meta.previousClose, 17751.3906);
    },
    "test timestamp model": function() {
        assertNumber(this.timestamp.min);
        assertNumber(this.timestamp.max);
        assertEquals(this.timestamp.min, 1438003800);
        assertEquals(this.timestamp.max, 1438372800);
    },
    "test timestampdaterange model": function() {
        assertNumber(this.timestampdaterange.date);
        assertNumber(this.timestampdaterange.min);
        assertNumber(this.timestampdaterange.max);
        assertEquals(this.timestampdaterange.date, 20150727);
        assertEquals(this.timestampdaterange.min, 1438003800);
        assertEquals(this.timestampdaterange.max, 1438027200);
    }
});
