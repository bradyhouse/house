"use strict";

const CONFIG_FILE = './config.json';
const fs = require('fs');
const liveServer = require('live-server');
const DropBoxClient = require('./lib/client/dropbox-client');
const FileBuilder = require('./lib/factory/json-factory');
const SvgBuilder = require('./lib/factory/svg-factory');

let SVG_FILE_NAME = '';
let DROP_BOX_ACCESS_TOKEN = '';
let DROP_BOX_PATH = '';
let WORK_DIR = '';
let JSON_FILE_NAME = '';
let IMAGE_SIZE = '';
let HOST_NAME = '';
let svgFactory = null;
let jsonFactory = null;

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

    if (config.host !== '') {
      HOST_NAME = config.host;
    } else {
      throw new Error('Missing host name configuration. Please update the config.json file.');
    }

    if (config.svgFileName && config.svgFileName !== '') {
      SVG_FILE_NAME = config.svgFileName;
    } else {
      throw new Error('Missing svg file name configuration. Please update the config.json file');
    }

    callbackFn();
  } catch (err) {
    console.error(err);
  }
}

function buildSvgFile(callbackFn) {
  try {
    svgFactory = SvgBuilder.factory({
      width: 1024,
      height: 768,
      imageWidth: 536,
      imageHeight: 714,
      images: jsonFactory.json,
      svgFileName: SVG_FILE_NAME
    });

    svgFactory.on('complete', () => {
      callbackFn();
    });

    svgFactory.build();

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

  jsonFactory= FileBuilder.init(fileBuilderConfig);

  jsonFactory.on('error', (err) => {
    console.error(err);
  });

  jsonFactory.on('complete', () => {
    callbackFn();
  });

  jsonFactory.build();
}

function startServer() {
  const params = {
    port: 5555,
    host: HOST_NAME,
    root: './',
    file: SVG_FILE_NAME,
    wait: 1000,
    logLevel: 2
  };
  liveServer.start(params);
}

parseConfig(() => {
  downloadImages(() => {
    buildJsonFile(() => {
      cleanUpWorkDir(() => {
        buildSvgFile(() =>{
          startServer();
        });
      });
    });
  })
});

