'use strict'

const DEFAULT_TIMEOUT = 1

exports.throttle = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms || DEFAULT_TIMEOUT))
}