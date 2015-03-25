require([
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/date/stamp'
], function (dom, domConstruct, stamp) {
    var contentNode = dom.byId('content'),
        dateObject = stamp.fromISOString('2013-12-02'),
        utcDateString = dateObject.toUTCString(),
        utcDateHtml = '<i>' + utcDateString + '</i>';
    console.log('utcDateString');
    console.log(utcDateString);
    domConstruct.place(utcDateHtml, contentNode);
});