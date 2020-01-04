'use strict';

const fs = require('fs');
const Base = require('../base');
const JpegParser = require('../parser/jpeg-parser');


class JsonFactory extends Base {

  static get config() {
    return {
      workDir: 'workDir',
      jsonFileName: 'jsonFileName'
    };
  }

  static init(config) {
    return new JsonFactory(config);
  }

  constructor(config) {
    super();
    this._configErrors = [];
    this.json = null;
    this.apply(this, config || this.config, this.config);
  }

  get configErrors() {
    return this._configErrors;
  }

  cleanup(callbackFn) {
    if (fs.existsSync('./' + this.jsonFileName)) {
      console.log('cleanup\t\t','deleting ' + this.jsonFileName);
      fs.unlink('./' + this.jsonFileName,(err) => {
        if(err) {
          this.emit('error', err);
        } else {
          callbackFn();
        }
      });
    } else {
      callbackFn();
    }
  }

  verifyJsonFileName() {
    const rc = this.jsonFileName !== '';
    if (!rc) {
      this._configErrors.push('Please provide a valid json filename.');
    }
    return rc;
  }

  verifyWorkDir() {
    const rc = this.workDir !== '';
    if (!rc) {
      this._configErrors.push('Please provide a valid working directory.\n');
    }
    return rc;
  }

  buildFile() {
    this.cleanup(() => {
      console.log('build\t\t','initializing ' + this.jsonFileName);
      let parserConfig = JpegParser.config;
      parserConfig.path = this.workDir;
      const fileParser = JpegParser.init(parserConfig);
      const writeStream = fs.createWriteStream(this.jsonFileName);
      fileParser.on('data', (data) => {
        this.json = data.data;
        writeStream.write(JSON.stringify(data));
        writeStream.end();
      });
      fileParser.on('error', (err) => {
        this.emit('error', err);
      });
      fileParser.on('data', () => {
        this.emit('complete', {
          status: 'complete'
        });
      });
      fileParser.parse();
    });
  }

  verifyConfig() {
    return this.verifyJsonFileName() &&
      this.verifyWorkDir();
  }

  build() {
    if (this.verifyConfig()) {
      this.buildFile();
    } else {
      this.emit('error', new Error(this.configErrors.toString()));
    }
  }

}

module.exports = JsonFactory;
