
/**
 * Wrapper for the following svg block:
 *
 *  <g xmlns="http://www.w3.org/2000/svg" id="menubar">
 *      <rect x="0" y="0" width="100%" height="22" fill="#ddd" stroke="black" stroke-width="1"/>
 *      <text x="350" y="15">Click below to draw</text>
 *      <g id="toolGroup" transform="translate(85,0)">
 *      ...
 *      </g>
 * </g>
 *
 */

app.view.menubar.Menubar = class extends Group {

    /**
     * Static config method. Object returned defines the default properties of the class. This
     * also defines the properties that may be passed to the class constructor.
     *
     * @returns {{hook: HTMLElement, autoBind: boolean}}
     */
    config() {
        return {
            hook: window.document.body,
            autoBind: false
        }
    }


    /**
     * Class constructor. Used to invoke the base class
     * with configuration settings.
     */
    constructor(config) {

        super({
           id: 'menubar',
           stroke: 'black',
           strokeWidth: 1,
           xmlns: Util.xmlNamespaces().xmlns,
           hook: config && config.hasOwnProperty('hook') ? config.hook : null,
           autoBind: config && config.hasOwnProperty('autoBind') ? config.autoBind : false,
           onMouseDown: null,
           onKeyUp: null,
           controller: new app.view.menubar.MenubarController(),

           children: [
               new Rectangle({
                    x: 0,
                    y: 0,
                    width: '100%',
                    height: 22,
                    fill: '#F5F5F5',
                    stroke: 'black',
                    strokeWidth: '1'
                 }),
               new Text({
                   x: 350,
                   y: 15,
                   onMouseDown: null,
                   onMouseOver: null,
                   onClick: null,
                   onMouseOut: null,
                   text: 'Click below to draw'
               }),
               new ToolGroup()
           ],
           transform: null
       });
    }

}
