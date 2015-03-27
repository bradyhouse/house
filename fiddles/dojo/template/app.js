(function (app, $, undefined) {


    $(document).ready(function () {
        console.log('document.ready');

        require([
            'dojo/dom',
            'dojo/dom-construct'
        ], function (dom, domConstruct) {
            var greetingNode = dom.byId('greeting');
            domConstruct.place('<i> Dojo!</i>', greetingNode);
        });


    });


})(window.app = window.app || {}, jQuery)



