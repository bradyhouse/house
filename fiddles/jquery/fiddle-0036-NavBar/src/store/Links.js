
app.store.Links = class {

    constructor(config) {
        this._data = config && config.hasOwnProperty('links') ? config.links : [];
    }

    get data() {
        return this._data;
    }
}

