var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title       : 'MVC Test Suite',
    loaderPath  : { 'AM' : 'House' },

    preload : [
        "http://cdn.sencha.io/ext/gpl/4.2.0/resources/css/ext-all.css",
        "house/ext-all-debug.js"

    ]

});

Harness.start(
    {
        group               : 'Sanity',
        items               : [
            'house/tests/010_sanity.t.js'
        ]
    },
    {
        group               : 'Application',

        // need to set the `preload` to empty array - to avoid the double loading of dependencies
        preload             : [],

        items : [
            {
                hostPageUrl         : 'index.html',
                url                 : 'house/tests/014_app.t.js'
            }
        ]
    }
);

