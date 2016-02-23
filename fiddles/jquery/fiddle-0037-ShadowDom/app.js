(function(app) {
    "use strict";



    app.controller = app.controller || {
            onDOMContentLoaded: function () {
                var fiddle = document.querySelector('fiddle');
                fiddle.createShadowRoot();
                fiddle.shadowRoot.innerHTML=`
            <div id="site">
                <header>
                    <svg id="logo"></svg>
                    <content select="[head]" />
                </header>
                <nav>
                    <content select="[menu]" />
                </nav>
                <main>
                    <content select="[body]" />
                </main>
                <footer>
                    &copy; 2016 bradyhouse.io
                </footer>
            </div>
            <style>
                /* use your imagination */
            </style>`;

            }
        };

    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);




})(window.app = window.app || {})
