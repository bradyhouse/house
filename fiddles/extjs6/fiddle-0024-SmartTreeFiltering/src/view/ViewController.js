Ext.define('Fiddle.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.flights',

    onCheckChange: function(node, checked) {
        if (node.isPackage) {
           this.packageCheckChange(node, checked);

        } else if (node.isFlight) {
            this.flightCheckChange(node, checked);
        }
    },
    packageCheckChange: function(node, checked) {
        if (checked) {
            node.parentNode.set('checked', true);
        } else {
            if (!node.parentNode.isVisibleChildChecked()) {
                node.parentNode.set('checked', false);
                this.getView().fireEvent('checkchange', node.parentNode, checked);
            }
        }
    },
    flightCheckChange: function(node, checked) {
        node.set('checked', checked);
        if (checked) {
            node.childNodes.map(function(child) {
                if (child.data.visible) {
                    child.data.checked = true;
                }
            });
            node.expand();
        } else {
            node.childNodes.map(function(child) {
                child.data.checked = false;
            });
            node.collapse();
        }
    }

});
