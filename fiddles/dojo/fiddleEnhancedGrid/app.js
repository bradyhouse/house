dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");

dojo.ready(function(){
    /*set up data store*/
    var data = {
        identifier: 'id',
        items: []
    };
    var data_list = [
        { col1: "normal", col2: false, col3: 'But are not followed by two hexadecimal', col4: 29.91, details: { x: 1}},
        { col1: "important", col2: false, col3: 'Because a % sign always indicates', col4: 9.33, details: { x: 1}},
        { col1: "important", col2: false, col3: 'Signs can be selectively', col4: 19.34, details: { x: 1}}
    ];
    var rows = 60;
    for(var i=0, l=data_list.length; i<rows; i++){
        data.items.push(dojo.mixin({ id: i+1 }, data_list[i%l]));
    }
    var store = new dojo.data.ItemFileWriteStore({data: data});

    /*set up layout*/
    var layout = [[
        {'name': 'Column 1', 'field': 'id'},
        {'name': 'Column 2', 'field': 'col2'},
        {'name': 'Column 3', 'field': 'col3', 'width': '230px'},
        {'name': 'Column 4', 'field': 'col4', 'width': '230px'}
    ]];

    /*create a new grid:*/
    var grid = new dojox.grid.EnhancedGrid({
            id: 'grid',
            store: store,
            structure: layout,
            rowSelector: '20px'},
        document.createElement('div'));

    /*append the new grid to the div*/
    dojo.byId("gridDiv").appendChild(grid.domNode);

    /*Call startup() to render the grid*/
    grid.startup();
});
