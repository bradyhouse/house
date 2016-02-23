var metadata = {
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/angular/fiddle-0018-CustomTransclusion'
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
};

angular.module('fiddle', [])
    .controller("fiddleController", function() {
        console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
        console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
        console.group();
    })
    .directive('fiddle', function(document) {
        return {
            scope: {},
            transclude: true,
            template: `
              <div>
                <header transclude-id="head">
                  <svg id="logo1">
                    <path
                        id="logo"
                        stroke="black"
                        stroke-width="1"
                        d="M 256 116 203 28 100 34 57 127 119 209 221 193 254 95 183 20 84 48 62 148 140 215 236 177 247 75 162 17 71 65 71 168 162 216 247 158 236 56 140 18 62 85 84 185 183 213 254 138 221 40 119 24 57 106 100 199 203 205 z"
                        fill="lime">
                    </path>
                  </svg>
                </header>
                <menu transclude-id="menu"></menu>
                <main transclude-id="body"></main>
                <footer>
                  © COPYRIGHT
                </footer>
              </div>`,
            link: function (scope, iElem, iAttrs, ctrl, transcludeFn) {
                document.transclude(iElem, transcludeFn);
            }
        };
    })
    .factory("document", function() {
        return {
            transclude: function(iElem, transcludeFn) {
                transcludeFn( function(clone) {
                    angular.forEach( clone, function (cloneEl) {
                        if (cloneEl.nodeType === 3)  {
                            return;
                        }
                        var destinationId = cloneEl.attributes["transclude-to"].value;
                        var destination = iElem.find("[transclude-id='" + destinationId + "']");
                        if (destination.length) {
                            destination.append(cloneEl);
                        } else {
                            cloneEl.remove();
                            throw new Error(
                                `Target not found. Please specify the correct transclude-to attribute.`
                            );
                        }
                    });
                });
            }
        }
    })
