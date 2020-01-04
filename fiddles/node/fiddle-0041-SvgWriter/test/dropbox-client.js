'use strict';

const describe = require('mocha').describe;
const expect = require('chai').expect;
const DropBoxClient = require('../lib/client/dropbox-client');

const defaultConfig = {
  dropBoxAccessToken: 'dropboxAccessToken',
  dropBoxPath: 'dropBoxPath',
  workDir: 'workDir',
  imageSize: 'imageSize'
};

describe('DropBox Client', function () {
  describe('static config property', function () {
    it('should return default options', function () {
      expect(DropBoxClient.config).to.deep.equal(defaultConfig);
    });
  });
  describe('static init method', function() {
    it('should return a valid class instance', function() {
      const dropBoxClient = DropBoxClient.init(defaultConfig);
      expect(dropBoxClient.dropBoxAccessToken).to.equal(defaultConfig.dropBoxAccessToken);
      expect(dropBoxClient.dropBoxPath).to.equal(defaultConfig.dropBoxPath);
      expect(dropBoxClient.workDir).to.equal(defaultConfig.workDir);
      expect(dropBoxClient.imageSize).to.equal(defaultConfig.imageSize);
    });
  });
  describe('verifyConfig method', function() {
    it('should return true', function() {
      const dropBoxClient = DropBoxClient.init(defaultConfig);
      expect(dropBoxClient.verifyConfig()).to.equal(true);
    });
  });
});
