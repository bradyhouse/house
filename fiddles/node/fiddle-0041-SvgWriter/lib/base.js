
const EventEmitter = require('events').EventEmitter;


class Base extends EventEmitter {

    constructor() {
      super();
      this._innerHTML = null;
    }

    get innerHTML() {
      return this._innerHTML;
    }

    set innerHTML(html) {
      this._innerHTML = html;
    }

    apply(object, config, defaults) {
      if (defaults) {
        this.apply(object, defaults);
      }
      if (object && config && typeof config === 'object') {
        let property;
        for (property in config) {
          if (config[property]) {
            object[property] = config[property];
          }
        }
      }
      return object;
    }

  };

  module.exports = Base;
