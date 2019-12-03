'use strict';

const fs = require('fs');
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Base = require('./base');

class DropBoxClient extends Base {

  static get config() {
    return {
      dropBoxAccessToken: 'dropboxAccessToken',
      dropBoxPath: 'dropBoxPath',
      workDir: 'workDir',
      imageSize: 'imageSize'
    };
  }

  static init(config) {
    return new DropBoxClient(config);
  }

  constructor(config) {
    super();
    this._configErrors = [];
    if (config) {
      this.apply(this, config, this.config);
    }
    this._pending = 0;
  }

  get configErrors() {
    return this._configErrors;
  }

  get pending() {
    return this._pending;
  }

  cleanup(callbackFn) {
    if (fs.existsSync(this.workDir)) {
      console.log('cleanup\t\t', 'deleting ' + this.workDir + ' directory');
      rimraf(this.workDir + '/*', callbackFn);
    } else {
      callbackFn();
    }
  };

  setup(callbackFn) {
    this.cleanup(() => {
      console.log('setup\t\t', 'creating empty ' + this.workDir + ' directory')
      mkdirp(this.workDir, (err) => {
        if (err) {
          this.emit('error', err);
        } else {
          callbackFn();
        }
      });
    });
  };

  explode(files) {
    console.log('explode\t\t', 'writing individual json files');
    const lastFile = files.length - 1;
    for (var i = 0; i < files.length; i++) {
      new Dropbox({
          fetch: fetch,
          accessToken: this.dropBoxAccessToken
        }).filesGetThumbnail({
          "path": this.dropBoxPath + files[i].name,
          "size": this.imageSize
        })
        .then((response) => {
          const filename = response.name.split('.')[0];
          const writeStream = fs.createWriteStream(this.workDir + '/' + filename + '.json');
          const buff = Buffer.from(response.fileBinary);
          const base64data = buff.toString('base64');
          let json = "{" +
            '"name": "' + response.name + '",' +
            '"image": "' + base64data + '"' +
            "}";
          writeStream.write(json);
          writeStream.end();
          if (!--this._pending) {
            this.emit('complete', {
              status: 'complete'
            });
          }
        })
        .catch((error) => {
          this.emit('error', error);
          return false;
        });
    }
  }

  downloadImages() {
    console.log('download\t', 'connecting to dropbox');
    new Dropbox({
        fetch: fetch,
        accessToken: this.dropBoxAccessToken
      })
      .filesListFolder({
        path: this.dropBoxPath,
      })
      .then((response) => {
        this._pending = response.entries.length;
        if (this.pending) {
          this.explode(response.entries);
        } else {
          this.emit('complete', {
            status: 'complete'
          });
        }
      })
      .catch((error) => {
        this.emit('error', error);
        return false;
      });
  }

  verifyDropBoxAccessToken() {
    const rc = this.dropBoxAccessToken !== '';
    if (!rc) {
      this._configErrors.push('Please provide a valid DropBox Access Token.\n');
    }
    return rc;
  }

  verifyDropBoxPath() {
    const rc = this.dropBoxPath !== '';
    if (!rc) {
      this._configErrors.push('Please provide a valid DropBox Path.\n');
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

  verifyImageSize() {
    const rc = this.imageSize !== '';
    if (!rc) {
      this._configErrors.push('Please provide a valid Image size.\n');
    }
    return rc;
  }

  verifyConfig() {
    return this.verifyDropBoxAccessToken() &&
      this.verifyDropBoxPath() &&
      this.verifyWorkDir() &&
      this.verifyImageSize();
  }

  download() {
    if (this.verifyConfig()) {
      this.setup(() => this.downloadImages());
    } else {
      this.emit('error', new Error(this.configErrors.toString()));
    }
  }
}

module.exports = DropBoxClient;
