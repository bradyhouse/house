'use strict';

const describe = require('mocha').describe;
const expect = require('chai').expect;
const FileBuilder = require('../lib/factory/json-factory');

const defaultConfig = {
  workDir: 'workDir',
  jsonFileName: 'jsonFileName'
};

describe('Json Factory', function () {
  describe('static config property', function () {
    it('should return default options', function () {
      expect(FileBuilder.config).to.deep.equal(defaultConfig);
    });
  });
  describe('static init method', function() {
    it('should return a valid class instance', function() {
      const fileBuilder = FileBuilder.init(defaultConfig);
      expect(fileBuilder.jsonFileName).to.equal(defaultConfig.jsonFileName);
      expect(fileBuilder.workDir).to.equal(defaultConfig.workDir);
    });
  });
  describe('verifyConfig method', function() {
    it('should return true', function() {
      const fileBuilder = FileBuilder.init(defaultConfig);
      expect(fileBuilder.verifyConfig()).to.equal(true);
    });
  });
});
