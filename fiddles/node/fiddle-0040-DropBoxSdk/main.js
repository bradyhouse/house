"use strict";

const CONFIG_FILE = './config.json';
const fs = require('fs');
const DropBoxClient = require('./lib/dropbox-client');
const FileBuilder = require('./lib/file-builder');

let DROP_BOX_ACCESS_TOKEN = '';
let DROP_BOX_PATH = '';
let WORK_DIR = '';
let JSON_FILE_NAME = '';
let IMAGE_SIZE = '';

function parseConfig(callbackFn) {
  try {
    const raw = fs.readFileSync(CONFIG_FILE, {
      encoding: 'utf8'
    });
    const config = JSON.parse(raw);
    if (config.dropBoxAccessKey !== '') {
      DROP_BOX_ACCESS_TOKEN = config.dropBoxAccessKey;
    } else {
      throw new Error('Missing DropBox access token. Please update the config.json file.');
    }
    if (config.dropBoxPath !== '') {
      DROP_BOX_PATH = config.dropBoxPath;
    } else {
      throw new Error('Missing DropBox path. Please update the config.json file.');
    }
    if (config.workDir !== '') {
      WORK_DIR = config.workDir;
    } else {
      throw new Error('Missing Working Directory path. Please update the config.json file.');
    }

    if (config.jsonFileName !== '') {
      JSON_FILE_NAME = config.jsonFileName;
    } else {
      throw new Error('Missing JSON file name configuration. Please update the config.json file.');
    }

    if (config.imageSize !== '') {
      IMAGE_SIZE = config.imageSize;
    } else {
      throw new Error('Missing image size configuration. Please update the config.json file.');
    }
    callbackFn();
  } catch (err) {
    console.error(err);
  }
}

function downloadImages(callbackFn) {
  let dropBoxClientConfig = DropBoxClient.config;

  dropBoxClientConfig.dropBoxAccessToken = DROP_BOX_ACCESS_TOKEN;
  dropBoxClientConfig.dropBoxPath = DROP_BOX_PATH;
  dropBoxClientConfig.workDir = WORK_DIR;
  dropBoxClientConfig.imageSize = IMAGE_SIZE;

  let dropBoxClient = DropBoxClient.init(dropBoxClientConfig);

  dropBoxClient.on('error', (err) => {
    console.error(err);
  });
  dropBoxClient.on('complete', () => {
    callbackFn();
  });
  dropBoxClient.download();
}

function cleanUpWorkDir(callbackFn) {
  let dropBoxClientConfig = DropBoxClient.config;
  dropBoxClientConfig.workDir = WORK_DIR;
  let dropBoxClient = DropBoxClient.init(dropBoxClientConfig);
  dropBoxClient.cleanup(callbackFn);
}

function buildJsonFile(callbackFn) {
  let fileBuilderConfig = FileBuilder.config;

  fileBuilderConfig.jsonFileName = JSON_FILE_NAME;
  fileBuilderConfig.workDir = WORK_DIR;

  let fileBuilder = FileBuilder.init(fileBuilderConfig);

  fileBuilder.on('error', (err) => {
    console.error(err);
  });

  fileBuilder.on('complete', () => {
    callbackFn();
  });

  fileBuilder.build();
}

parseConfig(() => {
  downloadImages(() => {
    buildJsonFile(() => {
      cleanUpWorkDir(() => {
        console.log('');
      });
    });
  })
});

