ExtJS 6 (index)
======

Executing the command `fiddle "combine" "extjs6" 0000` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-COMBINE.SH
    ├────CREATEAPPFILE
    ├────INITAPPFILE
    ├────ADDAPPFILEBODY
    ├────COMPLETEAPPFILE
    └──THE APP.JS FILE FOR "FIDDLE-0000-TEMPLATE" HAS BEEN UPDATED.


ExtJS 6 fiddles are unique in that before they can be run in the browser, the source files, stored in the src directory 
must be combined (concatenated together) into a single app.js file in the root fiddle directory. The combine command
automates this process. 

So for example, given the following fiddle template files:

    .
    ├── README.md
    ├── data.json
    ├── index.html
    ├── src
    │   ├── init.js
    │   ├── meta.js
    │   ├── sequence.conf
    │   ├── store.js
    │   └── view.js
    └── styles.css


Where the `src/sequence.conf` file contains:

    store.js
    view.js
  
The combine process will create an `app.js` file that contains:

    var meta = {
        fiddleHeader: 'fiddle-0000-Template',
        fiddleSubHeader: 'Template Fiddle created @ 12-19-18' +
            '<br />'
    };
    
    var fiddleStore = null;
    
    
    Ext.define('Fiddle.Records', {
        extend: 'Ext.data.Store',
        config: {
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    idProperty: '_id',
                    totalProperty: 'total'
                }
            },
            remoteSort: false,
            sortInfo: {
                field: 'name',
                direction: 'DESC'
            },
            pageSize: 50,
            fields: ['_id', 'index', 'isActive', 'checkingBalance', 'savingBalance', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude'],
            autoLoad: true
        }
    }, function() {
        Ext.create('Fiddle.Records', {
            storeId: 'records'
        });
        Ext.create('Ext.data.ChainedStore', {
            source: 'records',
            storeId: 'viewrecords'
        });
    });
    
    
    Ext.define('Fiddle.View', {
        extend: 'Ext.panel.Panel',
        html: 'Ext version ~ ' + Ext.getVersion().version
    });
    
    // Boiler plate
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: meta.fiddleHeader,
            subheader: meta.fiddleSubHeader
        }
    });
    Ext.define('App.Box', {
        extend: "Ext.container.Container",
        border: true,
        padding: 25,
        viewModel: {
            type: 'box'
        },
        items: [{
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [{
                xtype: 'panel',
                padding: 10,
                border: false,
                bind: {
                    html: '{subheader}'
                }
            }],
            region: 'north'
        }]
    });
    Ext.onReady(function() {
        var fiddle = Ext.create('Fiddle.View'),
            win = Ext.create('Ext.Window', {
                title: meta.fiddleHeader,
                closable: false,
                maximizable: true,
                height: 500,
                width: 700,
                layout: 'fit',
                items: fiddle
            }),
            positionX = 25,
            positionY = 192;
        win.showAt([positionX, positionY]);
        Ext.QuickTips.init();
        window.setTimeout(function() {
            win.maximize(true);
        }, 2500);
        Ext.create('App.Box', {
            renderTo: Ext.getBody()
        });
    });

 
Based on this result, the `app.js` file is assembled as follows:

  1.  Add the contents of the `src/meta.js` file.  This defines the contents of the `meta` variable (see above)
  2.  Read the `src/sequence.conf` and add each files contents in the order specified
  3.  Add the contents of the `src/init.js` file. This defines the `Boiler Plate` block (see above)
  4.  The resulting `app.js` file is reformatted using `js-beautify`
  
  
