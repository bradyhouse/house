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

    /**
     * Utility method that can be used to hide a given object.
     * @param obj
     */
    static hide(obj) {
        obj.setAttribute('visibility','hidden');
    }

}

