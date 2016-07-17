class Base {
  apply(object, config, defaults) {
    if (defaults) {
      this.apply(object, defaults);
    }
    if (object && config && typeof config === 'object') {
      let property;
      for (property in config) {
        object[property] = config[property];
      }
    }
    return object;
  }
}
