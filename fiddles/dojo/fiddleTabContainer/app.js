require(["dijit/layout/TabContainer",
        "dijit/layout/ContentPane",
        "dojo/domReady!"],
    function (TabContainer, ContentPane) {
        var tc = new TabContainer({
            style: "height: 100%; width: 100%;"
        }, "tc1-prog");

        var cp1 = new ContentPane({
            title: "Food",
            content: "We offer amazing food"
        });
        tc.addChild(cp1);

        var cp2 = new ContentPane({
            title: "Drinks",
            content: "We are known for our drinks."
        });
        tc.addChild(cp2);

        tc.startup();
    });