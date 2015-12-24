class Util {
    static color() {
        var hex = "#",
            i = 0;
        for (; i < 6; i++) {
            hex += Math.floor(Math.random() * 16).toString(16);
        }
        return hex;
    }

    static xmlNamespaces() {
        return {
            xmlns: 'http://www.w3.org/2000/svg',
            xmlnsXLink: 'http://www.w3.org/1999/xlink',
            xmlnsEv: 'http://www.w3.org/2001/xml-events'
        };
    }

    static splitAttribute(field, id, valDef) {
        var docElement = document.getElementById(id);
        if (docElement && docElement.getAttribute(field)) {
            return docElement.getAttribute(field).split(/[,\(\)]/);
        }
        return valDef.split(/[,\(\)]/);
    }

    static mapFromQueryString(url, parameter) {
        var name = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
            regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            value = regex.exec(url);
        return value === null ? "" : decodeURIComponent(value[1].replace(/\+/g, " "));
    }

}

