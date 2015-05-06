dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojox.grid.enhanced.plugins.Menu");
dojo.require("dijit.Menu");
dojo.require("dijit.CheckedMenuItem");
dojo.require("dojox.grid.enhanced.plugins.IndirectSelection");
dojo.require("dojo._base.xhr");


dojo.ready(function () {
    var itemList = [{
        "_id": "5519c4bac5275493742a1b03",
        "index": 745,
        "guid": "4ccc6fb5-a0ed-4e88-a7ff-9e110158f4b6",
        "isActive": true,
        "checkingBalance": "-$700,268.75",
        "savingsBalance": "$160,386.09",
        "picture": "http://placehold.it/32x32",
        "age": 27,
        "eyeColor": "blue",
        "name": "Hammond Dorsey",
        "gender": "male",
        "company": "ANARCO",
        "email": "hammonddorsey@anarco.com",
        "phone": "+1 (889) 466-2811",
        "address": "277 Beverly Road, Kenvil, Marshall Islands, 690",
        "about": "Eu et aliqua pariatur minim dolore ipsum. Sint tempor officia nisi nisi sint. Consectetur cupidatat in cillum proident sint. Laborum et dolor quis exercitation reprehenderit voluptate non voluptate reprehenderit voluptate. Cupidatat laborum in enim elit ad labore ad deserunt esse exercitation. Nulla minim amet id fugiat occaecat tempor adipisicing cupidatat.\r\n",
        "registered": "2014-07-05",
        "latitude": 54.668894,
        "longitude": -172.660423
    }
    ];

    var store = new dojo.data.ItemFileWriteStore({
        data: {
            items: itemList
        }
    });
    var getField = function (value, fieldName) {
        if (value != null || value != undefined) {
            var field = value[fieldName];
            if (field !== undefined) {
                return field;
            }
        }
        return null;
    };

    var menusObject = {
        headerMenu: new dijit.Menu()
    };

    var schema = [
        {name: 'Id', field: '_id', width: '3%'},
        {name: 'Index', field: 'index', width: '3%'},
        {name: 'Active', field: 'isActive', width: '5%'},
        {name: 'Checking', field: 'checkingBalance', width: '4%'},
        {name: 'Saving', field: 'savingBalance', width: '4%'},
        {name: 'Picture', field: 'picture', width: '5%'},
        {name: 'Age', field: 'age', width: '5%'},
        {name: 'Gender', field: 'gender', width: '5%'},
        {name: 'Name', field: 'name', width: '5%'},
        {name: 'Company', field: 'company', width: '5%'},
        {name: 'Address', field: 'address', width: '5%'},
        {name: 'Latitude', field: 'latitude', width: '5%'},
        {name: 'Longitude', field: 'longitude', width: '5%'}
    ];

    var grid = new dojox.grid.EnhancedGrid({
        store: store,
        structure: schema,
        noDataMessage: '<span>No Results Matched Search Criteria</span>',
        escapeHTMLInData: true,
        clientSort: true,
        sortInfo: "4",
        onFetchError: function (err) {
            console.log(err);
        },
        selectionMode: 'multiple',
        plugins: {
            indirectSelection: {headerSelector: true},
            menus: menusObject
        },
        canSort: function (col) {
            if (Math.abs(col) === 1 || Math.abs(col) === 17 || Math.abs(col) === 13) {
                return false;
            } else {
                return true;
            }
        }
    }, document.createElement('div'));

    /*append the new grid to the div*/
    dojo.byId("gridDiv").appendChild(grid.domNode);

    /*Call startup() to render the grid*/
    grid.startup();


});
