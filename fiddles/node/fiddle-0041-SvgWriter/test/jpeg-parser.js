'use strict';

const describe = require('mocha').describe;
const expect = require('chai').expect;
const FileParser = require('../lib/parser/jpeg-parser');

const defaultConfig = {
  path: './images',
  baseObject: {
    data: []
  },
  targetNode: 'data'
};

describe('Jpeg Parser', function () {
  describe('static config property', function () {
    it('should return default options', function () {
      expect(FileParser.config).to.deep.equal(defaultConfig);
    });
  });
  describe('static init method', function() {
    it('should return a valid class instance', function() {
      const fileParser = FileParser.init(defaultConfig);
      expect(fileParser.path).to.equal(defaultConfig.path);
      expect(fileParser.baseObject).to.deep.equal(defaultConfig.baseObject);
      expect(fileParser.targetNode).to.equal(defaultConfig.targetNode);
    });
  });
});
