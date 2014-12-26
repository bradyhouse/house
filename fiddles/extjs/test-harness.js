var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title       : 'MVC Test Suite',
    loaderPath  : { 'Risk' : 'app', "Ext":"ext/src", "Ext.chart":"ext/packages/ext-charts/src/chart", "Ext.draw":"ext/packages/ext-charts/src/draw"},
    viewDom     : true,
    preload : [
        //"~/cme/ext/ext-5.0.1/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all-debug.css",
        //"~/cme/ext/ext-5.0.1/build/ext-all-debug.js"
        "ext/packages/ext-theme-gray/build/resources/ext-theme-gray-all-debug.css",
        "ext-all-debug.js"
    ]

});

Harness.start(
    {
        group               : 'Sanity',
        items               : [
            'tests/010_sanity.t.js'
        ]
    },
    {
        group               : 'Model',
        items               : [
            'tests/011_memberfirm_model.t.js',
            'tests/015_measure_model.t.js'
        ]
    },
    {
        group               : 'Views',
        alsoPreload             : ['testLibrary.js'],
        //forceDOMVisible     : true,
        items               : [
            'tests/012_memberfirms_view.t.js',
            'tests/014_clearingorgs_view.t.js',
            'tests/016_measure_view.t.js',
            'tests/017_clearingorgs_with_controller.t.js',
            'tests/018_memberfirms_with_controller.t.js',
        ]
    },
    {
        group               : 'Application',

        // need to set the `preload` to empty array - to avoid the double loading of dependencies
        preload             : [],

        items : [
            {
                preload                     : ['testLibrary.js'],
                viewportHeight              : 976,
                viewportWidth               : 1920,
                forceDOMVisible             : true,
                hostPageUrl                 : 'index.html',
                url                         : 'tests/013_app.t.js'
            },      {
                group: 'viewport',
                items: [
                    {
                        group: 'west',
                        items: [
                            {
                                group: 'memberfirms',
                                items: [
                                    {
                                        preload: ['testLibrary.js'],
                                        viewportHeight: 976,
                                        viewportWidth: 1920,
                                        forceDOMVisible: true,
                                        hostPageUrl: 'index.html',
                                        url: 'tests/Application/viewport/west/memberfirms/001_Select_CME_020.t.js'
                                    }
                                ]
                            }
                        ]
                    }, {
                        group: 'center',
                        items: [{
                            group: 'measuremenu',
                            items: [{
                                preload: ['testLibrary.js'],
                                viewportHeight: 976,
                                viewportWidth: 1920,
                                forceDOMVisible: true,
                                hostPageUrl: 'index.html',
                                url: 'tests/Application/viewport/center/measuremenu/001_Open_All_Measures.t.js'
                            }, {
                                preload: ['testLibrary.js'],
                                viewportHeight: 976,
                                viewportWidth: 1920,
                                forceDOMVisible: true,
                                hostPageUrl: 'index.html',
                                url: 'tests/Application/viewport/center/measuremenu/002_Close_All_Measures.t.js'
                            }
                            ]
                        }
                        ]
                    }
                ]
            }
        ]
    }
);

