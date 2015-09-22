(function (app) {
	"use strict";
class Util {
    /**
     * Static Method that can used to generate a
     * random html color code.
     *
     * @returns {string}
     */
    static color() {
        var hex = "#",
            i = 0;
        for (; i < 6; i++) {
            hex += Math.floor(Math.random() * 16).toString(16);
        }
        return hex;
    }
    /**
     * Collection of namespace strings used in the
     * creation of svg elements.
     *
     * @returns {{xmlns: string, xmlnsXLink: string, xmlnsEv: string}}
     */
    static xmlNamespaces() {
        return {
            xmlns: 'http://www.w3.org/2000/svg',
            xmlnsXLink: 'http://www.w3.org/1999/xlink',
            xmlnsEv: 'http://www.w3.org/2001/xml-events'
        }
    }
    /**
     * Utility method that can be used to get a given attribute (field) from a given doc
     * element and split its value into a string array. If
     * the element does not have the requested attribute, then
     * the provided default value (valDef) is split and returned.
     *
     * @param field
     * @param id
     * @param valDef
     * @returns {Array}
     */
    static splitAttribute(field, id, valDef) {
        var docElement = document.getElementById(id);
        if (docElement && docElement.getAttribute(field)) {
            return docElement.getAttribute(field).split(/[,\(\)]/);
        }
        return valDef.split(/[,\(\)]/);
    }
    /**
     * Utility method that can be used to "pop" a given parameter from
     * a given url.  NOTE - To get a query string parameter value, pass
     * in "location.search".
     *
     * @param parameter
     * @param url
     * @returns {string}
     */
    static mapFromQueryString(url, parameter) {
        var name = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
            regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            value = regex.exec(url);
        return value === null ? "" : decodeURIComponent(value[1].replace(/\+/g, " "));
    }
}
/**
 * Collection of static event
 * handler methods.
 */
class AppController {
    /**
     * Static method used to handle (listen for)
     * the Surface (svg) load event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onSurfaceLoad(evt) {
        console.log('onSurfaceLoad');
        console.log(evt);
    }
    /**
     * Static method used to handle (listen for)
     * the Path Mouse down event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onPathMouseDown(evt, id) {
        console.log('onPathMouseDown');
        if(!app.controller.selectedShape) {
            app.controller.selectShape(evt, id);
        }
    }
    /**
     * Static method used to handle (listen for)
     * the Path Mouse over event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onPathMouseOver(evt, id) {
        console.log('onPathMouseOver');
        var opacity = '';
        if (id === 'over') {
            opacity = app.controller.selectedShape.getAttribute('opacity');
            app.controller.selectedShape.setAttribute('stroke', 'red');
            app.controller.selectedShape.setAttribute('stroke-width', 3);
            app.controller.selectedShape.setAttribute('opacity', 3*opacity/4);
        }
        /**
         if (!first) return
         if (o=='over'){
                opac=document.getElementById("P"+c).getAttribute("opacity")
                document.getElementById("P"+c).setAttribute("stroke","red")
                document.getElementById("P"+c).setAttribute("stroke-width",3)
                document.getElementById("P"+c).setAttribute("opacity",3*opac/4)
                //Chosen=svgDocument.getElementById("P"+c)
            }
         else{
                document.getElementById("P"+c).setAttribute("stroke","black")
                document.getElementById("P"+c).setAttribute("opacity",opac)
                document.getElementById("P"+c).setAttribute("stroke-width",1)
            }
         */
    }
    /**
     * Static method used to handle (listen for)
     * the Path Mouse out event.
     *
     * @param evt {object}
     * @param id {string}
     */
    static onPathMouseOut(evt, id) {
        console.log('onPathMouseOut');
        console.log(id);
    }
    /**
     * Static method used to handle (listen for)
     * the group mouse down event.
     *
     * @param evt {object}
     */
    static onShapeGroupMouseDown(evt) {
        console.log('onGroupMouseDown');
        console.log(evt);
    }
    static selectShape(evt, id) {
        var shapesGroup = document.getElementById('shapesGroup'),
            groupTransform = Util.splitAttribute('shapesGroup','transform', 'translate(0,0)'),
            oldX=evt.clientX - parseInt(groupTransform[1]),
            oldY=evt.clientY - parseInt(groupTransform[2]);
        app.controller.selectedShape = document.getElementById(id);
        app.controller.selectedShape.setAttribute('onmouseup', "app.controller.onSelectedShapeMouseUp()");
        app.controller.selectedShape.setAttribute('stroke-width', 2);
        app.controller.selectedShape.setAttribute('stroke', 'yellow');
        shapesGroup.setAttribute('onmousemove', 'app.controller.onSelectedShapeDrag(evt,'+ oldX +', ' + oldY + ')');
        /*if (!first) return;
        Chosen=document.getElementById(U);
        GT=getTransform(Chosen);
        oldX=evt.clientX - parseInt(GT[1]);
        oldY=evt.clientY - parseInt(GT[2]);
        place.setAttribute("onmousemove", "drag(evt)");
        Chosen.setAttribute("onmouseup", "selectIt()");
        thingclicked=true
        Chosen.setAttribute("stroke-width", 3);
        Chosen.setAttribute("stroke", "green");
        ShowPts();*/
    }
    static onSelectedShapeDrag(evt, x, y) {
        console.log('onSelectedShapeDrag');
        var shapesGroup = document.getElementById('shapesGroup'),
            deltaX = evt.clientX - x,
            deltaY = evt.clientY - y,
            shapeTransform = "translate("+(deltaX)+","+(deltaY)+")";
        app.controller.selectedShape.setAttribute("transform", shapeTransform);
        shapesGroup.setAttribute('onmouseup', 'app.controller.onSelectedShapeDrop()');
        app.controller.selectedShape.setAttribute("onmouseup", null);
        /*
         ShowPts()
         place.setAttribute("onmouseup", "stopdrag()");
         nX=evt.clientX-oldX;
         nY=evt.clientY-oldY;
         if (grid){
         nX=Math.floor(nX/gridsize)*gridsize+gridsize/2
         nY=Math.floor(nY/gridsize)*gridsize+gridsize/2
         }
         sT="translate("+(nX)+","+(nY)+")"
         Chosen.setAttribute("transform", sT);
         if (PGon) PG.setAttribute("transform", sT);
         Chosen.setAttribute("onmouseup", null);
         */
    }
    static onSelectedShapeDrop() {
        console.log('onSelectedShapeDrop');
        var shapesGroup = document.getElementById('shapesGroup');
        shapesGroup.setAttribute('onmousemove', null);
        shapesGroup.setAttribute('onmouseup', null);
        shapesGroup.setAttribute('transform', null);
        app.controller.selectedShape.setAttribute('mouseover', null);
        app.controller.selectedShape.setAttribute('mousemove', null);
        app.controller.selectedShape.setAttribute('stroke-width', '1');
        app.controller.selectedShape.setAttribute('stroke', 'black');
        app.controller.selectedShape = null;
       /*
         place.setAttribute("onmousemove", null);
         place.setAttribute("onmouseup", null);
         Chosen.setAttribute("stroke", "black");
         Chosen.setAttribute("stroke-width", "1");
         finished=false
         first=true
         unselect()
         //place.setAttribute("onkeyup", null);
         selectM.setAttribute("visibility","hidden")
         */
    }
    static onSelectedShapeMouseUp() {
        console.log('onSelectedShapeMouseUp');
        var shapesGroup = document.getElementById('shapesGroup');
        app.controller.selectedShape.setAttribute('stroke-width', 2);
        app.controller.selectedShape.setAttribute('stroke', 'red');
        shapesGroup.setAttribute('onkeyup', 'app.controller.onShapeGroupKeyUp(evt);');
        shapesGroup.setAttribute('onmousemove', null);
        shapesGroup.setAttribute('onmouseup', null);
        /**
         * unselect()
         Chosen.setAttribute("stroke-width", 2);
         Chosen.setAttribute("stroke", "red");
         place.setAttribute("onkeyup", "keyHandle(evt)");
         place.setAttribute("onmousemove", null);
         place.setAttribute("onmousedown", null);
         selectM.setAttribute("visibility","visible")
         ShowPts()
         */
    }
    static onShapeGroupKeyUp(evt) {
        console.log('onShapeGroupKeyUp');
    }
 }
/**
 * Base class for all virtualized shapes.
 */
class BasePath {
    /**
     * Static config method. Object returned defines the default properties of the class. This
     * also defines the properties that may be passed to the class constructor.
     *
     * @returns {{id: string, stroke: string, strokeWidth: string, opacity: string, xmlns: string}}
     */
    config() {
        return {
            id: 'path1',
            stroke: 'black',
            strokeWidth: 1,
            opacity: .5,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            onMouseDown: 'app.controller.onPathMouseDown(evt, this.id);',
            onMouseOver: 'app.controller.onPathMouseOver(evt, this.id);',
            onMouseOut: 'app.controller.onPathMouseOut(evt, this.id);'
        }
    }
    /**
     * Class constructor
     *
     * @param config
     */
    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
        this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
        this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._onMouseOver = config && config.hasOwnProperty('onMouseOver') ? config.onMouseOver : this.config().onMouseOver;
        this._onMouseOut = config && config.hasOwnProperty('onMouseOut') ? config.onMouseOut : this.config().onMouseOut;
        this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
        this.init();
    }
    get xmlns() {
        return this._xmlns;
    }
    /**
     * Document element object.  This property is populated
     * during constructor using the document.createElementNS()
     * method.
     */
    get docElementNS() {
        return this._docElementNS;
    }
    /**
     * Document element id getter.
     * @returns {string|*|string|string|string|string}
     */
    get id() {
        return this._id;
    }
    get stroke() {
        return this._stroke;
    }
    get strokeWidth() {
        return this._strokeWidth;
    }
    get opacity() {
        return this._opacity;
    }
    get xmlns() {
        return this._xmlns;
    }
    get hook() {
        return this._hook;
    }
    get autoBind() {
        return this._autoBind;
    }
    get onMouseOut() {
        return this._onMouseOut;
    }
    get onMouseOver() {
        return this._onMouseOver;
    }
    get onMouseDown() {
        return this._onMouseDown;
    }
    /**
     * Method used to append the docElement to configured hook element.
     */
    bind() {
        this.hook.appendChild(this.docElement);
    }
    init() {
        var docElement = document.createElementNS(this.xmlns, 'path');
        docElement.setAttribute('id', this.id);
        docElement.setAttribute('stroke', this.stroke);
        docElement.setAttribute('stroke-width', this.strokeWidth);
        docElement.setAttribute('opacity', this.opacity);
        docElement.setAttribute("onmousedown", this.onMouseDown);
        docElement.setAttribute("onmouseover", this.onMouseOver);
        docElement.setAttribute("onmouseout", this.onMouseOut);
        this._docElementNS = docElement;
        if (this.autoBind) {
            this.bind();
        }
    }
}
class Star extends BasePath {
    /**
     * Class constructor.
     *
     * @param config
     */
    constructor(config) {
        if (config && !config.hasOwnProperty('id')) {
            config.id = 'star1';
        }
        super(config);
        this._permutations = 0;
        this._vertices = 0;
        this._angle = 0.0;
        this._randomizeShape = config && config.hasOwnProperty('randomizeShape') ? config.randomizeShape : false;
        this._randomizeColor = config && config.hasOwnProperty('randomizeColor') ? config.randomizeColor : false;
        this._clientX = config && config.hasOwnProperty('clientX') ? config.clientX : 156;
        this._clientY = config && config.hasOwnProperty('clientY') ? config.clientY : 116;
        this._fill = config && config.hasOwnProperty('fill') ? config.fill : '#56e9d4';
        this._radius = config && config.hasOwnProperty('radius') ? config.radius : 100;
        this._data = "";
        this.postInit();
    }
    get randomizeShape() {
        return this._randomizeShape;
    }
    get randomizeColor() {
        return this._randomizeColor;
    }
    get clientX() {
        return this._clientX;
    }
    get clientY() {
        return this._clientY;
    }
    get permutations() {
        return this._permutations;
    }
    get radius() {
        return this._radius;
    }
    get vertices() {
        return this._vertices;
    }
    get angle() {
        return this._angle;
    }
    get data() {
        return this._data;
    }
    get fill() {
        return this._fill;
    }
    initPath() {
        var x = this.clientX,
            y = this.clientY,
            data = "M ",
            xCoordinates,
            yCoordinates,
            i = 0;
        if (this._permutations !== 1) {
            if (this.randomizeShape) {
                this._vertices = Math.floor(Math.random() * 12) + 5;
                this._permutations = Math.floor(Math.random() * (this.vertices - 4)) + 3;
            } else {
                this._vertices = Math.floor(2 * 12) + 5;
                this._permutations = Math.floor(2 * (this.vertices - 4)) + 3;
            }
            if (Math.floor(this.vertices / this.permutations) * this.permutations == this.vertices) {
                this._vertices++;
            }
        } else {
            if (this.randomizeShape) {
                this._vertices = Math.floor(Math.random() * 8) + 3;
            } else {
                this._vertices = 12;
            }
        }
        this._angle = 2 * Math.PI / this.vertices;
        xCoordinates = new Array(this.vertices);
        yCoordinates = new Array(this.vertices);
        for (; i < this.vertices; i++) {
            xCoordinates[i] = x + Math.ceil(this.radius * Math.cos(i * this.angle));
            yCoordinates[i] = y + Math.ceil(this.radius * Math.sin(i * this.angle));
        }
        for (i = 0; i < this.vertices; i++) {
            data += xCoordinates[(i * this.permutations) % this.vertices] + " " + yCoordinates[(i * this.permutations) % this.vertices] + " ";
        }
        this._data += data + "z";
    }
    /**
     * Method called by the constructor to complete the initialization of the
     * docElement after the base class constructor is called.
     */
    postInit() {
        this.initPath();
        this.docElementNS.setAttribute("d", this.data);
        if (this.randomizeColor) {
            this.docElementNS.setAttribute("fill", Util.color());
        } else {
            this.docElementNS.setAttribute("fill", this.fill);
        }
    }
}
/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) group,
 * "<g>", tag.  This tag
 * is used to "group" elements within
 * a given SVG block.
 */
class Group {
    /**
     * Static config method. Object returned defines the default properties of the class. This
     * also defines the properties that may be passed to the class constructor.
     *
     * @returns {{id: string, stroke: string, strokeWidth: string, opacity: string, xmlns: string}}
     */
    config() {
        return {
            id: 'group1',
            stroke: 'black',
            strokeWidth: 1,
            opacity: .5,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            onMouseDown: 'app.controller.onShapeGroupMouseDown(evt);',
            onKeyUp: 'app.controller.onShapeGroupKeyUp(evt);'
        }
    }
    /**
     * Class constructor.
     *
     * @param config
     */
    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._onKeyUp = config && config.hasOwnProperty('onKeyUp') ? config.onKeyUp : this.config().onKeyUp;
        this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
        this.init();
    }
    /**
     * Document element object.  This property is populated
     * during init using the document.createElementNS()
     * method.
     *
     * @returns {object}
     */
    get docElementNS() {
        return this._docElementNS;
    }
    /**
     * String value assigned to the id attribute of the
     * docElementNS object.
     *
     * @returns {string}
     */
    get id() {
        return this._id;
    }
    /**
     * XML Namespace URI.  Property required by the
     * init method in order to create and populate
     * the documentNS attribute.
     *
     * @returns {string}
     */
    get xmlns() {
        return this._xmlns;
    }
    /**
     * Reference to the document element that the
     * docElementNS attribute will be added too.
     *
     * @returns {object}
     */
    get hook() {
        return this._hook;
    }
    /**
     * Flag that can be passed to class constructor
     * to automatically add the docElementNS attribute
     * to the configured hook attribute.
     *
     * @returns {boolean}
     */
    get autoBind() {
        return this._autoBind;
    }
    /**
     *
     * @returns {string}
     */
    get onKeyUp() {
        return this._onKeyUp;
    }
    get onMouseDown() {
        return this._onMouseDown;
    }
    /**
     * Method used to append the docElement to configured hook element.
     */
    bind() {
        this.hook.appendChild(this.docElementNS);
    }
    /**
     * Method called by the constructor to create and assign docElement based
     * on the properties exposed by the class.
     *
     * Note - if the autoBind flag is true, then it ends by invoking bind method.
     */
    init() {
        var docElement = document.createElementNS(this.xmlns, 'g');
        docElement.setAttribute('id', this.id);
        docElement.setAttribute('onkeyup', this.onKeyUp);
        docElement.setAttribute('onmousedown', this.onMouseDown);
        this._docElementNS = docElement;
        if (this.autoBind) {
            this.bind();
        }
    }
}
/**
 * Class used to virtualize model a Scalar Vector
 * Graphics (SVG) html tag.
 */
class Surface {
    /**
     * Static config method. Object returned defines the default properties of the class. This
     * also defines the properties that may be passed to the class constructor.
     *
     * @returns {{width: string, height: string, xmlns: string, xmlnsEv: string, xmlnsXlink: string, zoomAndPan: string, preserveAspectRatio: string, hook: HTMLElement, autoBind: boolean}}
     */
    config() {
        return {
            id: 'surface1',
            cssWidth: '500px',
            cssHeight: '500px',
            xmlns: Util.xmlNamespaces().xmlns,
            xmlnsEv: Util.xmlNamespaces().xmlnsEv,
            xmlnsXlink: Util.xmlNamespaces().xmlnsXLink,
            zoomAndPan: "disabled",
            coorWidth: '500px',
            coorHeight: '500px',
            hook: window.document.body,
            autoBind: false,
            autoPopulate: false,
            onLoad: 'app.controller.onSurfaceLoad(evt);'
        }
    }
    /**
     * Class constructor.
     *
     * @param config
     */
    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._cssWidth = config && config.hasOwnProperty('cssWidth') ? config.width : this.config().cssWidth;
        this._cssHeight = config && config.hasOwnProperty('cssHeight') ? config.height : this.config().cssHeight;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._xmlnsXlink = config && config.hasOwnProperty('xmlnsXlink') ? config.xmlnsXlink : this.config().xmlnsXlink;
        this._xmlnsEv = config && config.hasOwnProperty('xmlnsEv') ? config.xmlnsEv : this.config().xmlnsEv;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._zoomAndPan = config && config.hasOwnProperty('zoomAndPan') ? config.zoomAndPan : this.config().zoomAndPan;
        this._coorWidth = config && config.hasOwnProperty('coorWidth') ? config.coorWidth : this.config().coorWidth;
        this._coorHeight = config && config.hasOwnProperty('coorHeight') ? config.coorHeight : this.config().coorHeight;
        this._onLoad = config && config.hasOwnProperty('onLoad') ? config.onLoad : this.config().onLoad;
        this._autoPopulate = config && config.hasOwnProperty('autoPopulate') ? config.autoPopulate : this.config().autoPopulate;
        this._shapes = [];
        this.init();
    }
    /**
     * Horizontal length in the svg coordinate system.
     *
     * See `MDN > Web technology for developers > SVG > SVG Attribute reference > `
     * [width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width).
     *
     * @returns {string}
     */
    get coorWidth() {
        return this._coorWidth;
    }
    /**
     * Vertical length in the user coordinate system.
     *
     * See `MDN > Web technology for developers > SVG > SVG Attribute reference > `
     * [height](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height).
     *
     * @returns {string|*}
     */
    get coorHeight() {
        return this._coorHeight;
    }
    /**
     * Width specified in pixels ("px") of the svg doc element. The value
     * is assigned to the tag via the style tag.
     *
     * @returns {string}
     */
    get cssWidth() {
        return this._cssWidth;
    }
    /**
     * Height specified in pixels ("px") of the svg doc element. The value
     * is assigned to the tag via the style tag.
     *
     * @returns {string}
     */
    get cssHeight() {
        return this._cssHeight;
    }
    /**
     * The namespace uri attribute of the svg doc element.
     *
     * See [http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/glossary.html#dt-namespaceURI].
     *
     * @returns {string}
     */
    get xmlns() {
        return this._xmlns;
    }
    get xmlnsXlink() {
        return this._xmlnsXlink;
    }
    get xmlnsEv() {
        return this._xmlnsEv;
    }
    get docElement() {
        return this._docElement;
    }
    get hook() {
        return this._hook;
    }
    get autoBind() {
        return this._autoBind;
    }
    get autoPopulate() {
        return this._autoPopulate;
    }
    get zoomAndPan() {
        return this._zoomAndPan;
    }
    get onLoad() {
        return this._onLoad;
    }
    get group() {
        return this._group;
    }
    get shapes() {
        return this._shapes;
    }
    /**
     * Method used to append the docElement to configured hook element.
     */
    bind() {
        this.hook.appendChild(this.docElement);
    }
    /**
     * Method invoked during initialization (init)
     * when the autoBind flag is true.  It creates
     * new Group instance and assigns it to the
     * group property.  The docElementNS of the
     * resulting class is then appended to the
     * docElement.
     */
    initGroup() {
        var group = new Group({
            id: 'shapesGroup',
            hook: this.docElement,
            autoBind: this.autoBind
        });
        this._group = group;
    }
    /**
     * Method invoked during initialization (init)
     * when the autoPopulate flag is true. It will
     * add a star to the main "g" (group) tag.
     *
     * Note - This method is really meant for testing.
     */
    initShapes() {
        var star = new Star({id: 'star-1'});
        this.group.docElementNS.appendChild(star.docElementNS);
        this.shapes.push(star);
    }
    /**
     * Method called by the constructor to create and assign docElement based
     * on the properties exposed by the class.
     *
     * Note - if the autoBind flag is true, then it ends by invoking bind method.
     */
    init() {
        var me = this,
            svg = document.createElementNS(this.xmlns, 'svg');
        svg.setAttribute('id', 'surface1');
        svg.setAttribute('width', this.coorWidth);
        svg.setAttribute('height', this.coorHeight);
        svg.setAttribute('xmlns:xlink', this.xmlnsXlink);
        svg.setAttribute('xmlns:ev', this.xmlnsEv);
        svg.setAttribute('zoomAndPan', this.zoomAndPan);
        svg.setAttribute('style', 'width: ' + this.cssWidth + '; height: ' + this.cssHeight + ';');
        svg.setAttribute('onload', this.onLoad);
        me._docElement = svg;
        if (me.autoBind) {
            me.initGroup();
            if (me.autoPopulate) {
                me.initShapes();
            }
            me.bind();
        }
    }
}
/**
 * AppController static method page hook.
 *
 * @type {{selectedShape: null, onSurfaceLoad: Function, onPathMouseDown: Function, onPathMouseOut: Function, onPathMouseOver: Function, onGroupMouseDown: Function, onSelectedShapeMouseUp: Function, onSelectedShapeMouseDown: Function, onSelectedShapeDrop: Function, selectShape: Function, onDOMContentLoaded: Function}|*}
 */
app.controller = app.controller || {
    selectedShape: null,
    onSurfaceLoad: function (evt) {
        return AppController.onSurfaceLoad(evt);
    },
    onPathMouseDown: function (path, evt) {
        return AppController.onPathMouseDown(path, evt);
    },
    onPathMouseOut: function (path, evt) {
        return AppController.onPathMouseOut(path, evt);
    },
    onPathMouseOver: function (path, evt) {
        return AppController.onPathMouseOver(path, evt);
    },
    onShapeGroupMouseDown: function (evt) {
        return AppController.onShapeGroupMouseDown(evt);
    },
    onShapeGroupKeyUp: function(evt) {
        return AppController.onShapeGroupKeyUp(evt);
    },
    onSelectedShapeMouseUp: function() {
        return AppController.onSelectedShapeMouseUp();
    },
    onSelectedShapeMouseDown: function(evt) {
        return AppController.onSelectedShapeMouseDown(evt);
    },
    onSelectedShapeDrop: function() {
        return AppController.onSelectedShapeDrop();
    },
    onSelectedShapeDrag: function(evt, x, y) {
        return AppController.onSelectedShapeDrag(evt, x, y);
    },
    selectShape: function(evt, id) {
        return AppController.selectShape(evt, id);
    },
    onDOMContentLoaded: function () {
        var fiddleHook = document.getElementById('fiddleHook');
        app.surface = app.surface || new Surface({
            hook: fiddleHook,
            autoBind: true,
            autoPopulate: true
        });
    }
};
/**
 * "Debug" Jasmine testing hooks.
 *
 * @type {*|{group: Function, surface: Function, basePath: Function, star: Function, xmlNamespaces: Function, splitAttribute: Function, mapFromQueryString: Function, color: Function}}
 */
app.test = window.location.pathname.match('test') ? app.test || {
    group: function (config) {
        return new Group(config);
    },
    surface: function (config) {
        return new Surface(config);
    },
    basePath: function (config) {
        return new BasePath(config);
    },
    star: function (config) {
        return new Star(config);
    },
    xmlNamespaces: function () {
        return Util.xmlNamespaces();
    },
    splitAttribute: function (field, id, defVal) {
        return Util.splitAttribute(field, id, defVal);
    },
    mapFromQueryString: function(url, parameter) {
        return Util.mapFromQueryString(url, parameter);
    },
    color: function () {
        return Util.color();
    }
} : null;
if (!window.location.pathname.match('test')) {
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}
})(window.app = window.app || {})
