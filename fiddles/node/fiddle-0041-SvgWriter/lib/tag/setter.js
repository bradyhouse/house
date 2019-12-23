'use strict';

/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) setter,
 * "<set>", tag.  This tag
 * is used as a child element to create a property transition effect
 * for the parent element.  For example, given a rectangle, "<rect>" tag, element,
 * the following setter, "<set>" tag, child elements could be used
 * to create a rollover type effect --
 *
 * <set attributeName="x" from="40" to="42" begin="mousedown" end="mouseup"></set>
 * <set attributeName="y" from="0" to="2" begin="mousedown" end="mouseup"></set>
 *
 */

class Setter {

    config() {
        return {
            id: 'setter1',
            hook: null,
            autoBind: false,
            attributeName: "y",
            from: "0",
            to: "2",
            begin: "mousedown",
            end: "mouseup",
            xmlns: Util.xmlNamespaces().xmlns
        };
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._attributeName = config && config.hasOwnProperty('attributeName') ? config.attributeName : this.config().attributeName;
        this._from = config && config.hasOwnProperty('from') ? config.from : this.config().from;
        this._to = config && config.hasOwnProperty('to') ? config.to : this.config().to;
        this._begin = config && config.hasOwnProperty('begin') ? config.begin : this.config().begin;
        this._end = config && config.hasOwnProperty('end') ? config.end : this.config().end;
        this.init();
    }

    get hook() {
        return this._hook;
    }

    get autoBind() {
        return this._autoBind;
    }

    get id() {
        return this._id;
    }


    get docElementNS() {
        return this._docElementNS;
    }

    get xmlns() {
        return this._xmlns;
    }

    get attributeName() {
        return this._attributeName;
    }
    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }

    get begin() {
        return this._begin;
    }

    get end() {
        return this._end;
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
        var docElement = document.createElementNS(this.xmlns, 'set');

        if (this.id) {
            docElement.setAttribute('id', this.id);
        }

        docElement.setAttribute('attributeName', this.attributeName);
        docElement.setAttribute('from', this.from);
        docElement.setAttribute('to', this.to);
        docElement.setAttribute('begin', this.begin);
        docElement.setAttribute('end', this.end);

        this._docElementNS = docElement;


        if (this.autoBind) {
            this.bind();
        }
    }

}

module.exports = Setter;
