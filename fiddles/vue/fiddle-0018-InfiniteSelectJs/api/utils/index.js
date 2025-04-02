'use strict'

const writer = require('./writer')
const uuidGenerator = require('./uuid-generator')
const responseThrottle = require('./response-throttle')
const logger = require('./log4js-init')

const DEFAULT_TIMEOUT = 1
function sleep(ms = null) {
    return new Promise(resolve => setTimeout(resolve, ms || DEFAULT_TIMEOUT));
}
module.exports = {
    log: logger.log,
    writeJson : writer.writeJson,
    generateUUID: uuidGenerator.generateUUID,
    throttle: responseThrottle.throttle,
    sleep: sleep
}