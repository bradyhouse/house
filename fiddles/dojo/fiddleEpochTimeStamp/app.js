require([
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/date/stamp'
], function (dom, domConstruct, stamp) {
    var utcSlot = dom.byId('utcSlot'),
        epochSlot = dom.byId('epochSlot'),
        dateObject = stamp.fromISOString('2013-12-02'),
        epochString = dateObject.getTime(),
        utcString = dateObject.toUTCString(),
        epochHtml = '<i>' + epochString + '</i>',
        utcHtml = '<i>' + utcString + '</i>';
    console.log('utcDateString');
    console.log(utcString);
    console.log('epochString');
    console.log(epochString);
    domConstruct.place(utcHtml, utcSlot);
    domConstruct.place(epochHtml, epochSlot);
});