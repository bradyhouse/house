'use strict';

const fs = require('fs');
const path = require('path');
const Base = require('../base');

class JpegParser extends Base {

  static get config() {
    return {
      path: './images',
      baseObject: {
        data: []
      },
      targetNode: 'data'
    }
  }

  static init(config) {
    return new JpegParser(config);
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config);
    }
  }


  parse() {
    fs.readdir(this.path, (err, list) => {
      if (err) {
        this.emit('error', err);
      } else {
        let pending = list.length;
        if (!pending) {
          this.emit('data', this.baseObject);
        } else {
          list.forEach((file) => {
            file = path.resolve(this.path, file);
            fs.stat(file, (err, stat) => {
              if (stat && !stat.isDirectory()) {
                if (!this.parseFile(file)) {
                  pending = 0;
                }
              }
              if (!--pending) {
                this.emit('data', this.baseObject);
              }
            });
          });
        }
      }
    });
  }

  parseFile(file) {
    let rc = false;
    try {
      const raw = fs.readFileSync(file, { encoding: 'utf8' });
      const json = JSON.parse(raw);
      this.baseObject[this.targetNode].push(json);
      rc = true;
    } catch(err) {
      console.error(err);
    }
    return rc;
  }

}

module.exports = JpegParser;
