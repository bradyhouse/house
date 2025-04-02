'use strict'

const log4js = require('log4js')
const timestamp = new Date().toISOString().split('T')[0]
const now = new Date()
const filename = `../logs/mock-api-${timestamp}.log`
const config = require('../log4js.config')

log4js.configure(config)
const logger = log4js.getLogger('default')
logger.info('MM    MM               kk          AAA   PPPPPP  IIIII')
logger.info('MMM  MMM  oooo    cccc kk  kk     AAAAA  PP   PP  III  ')
logger.info('MM MM MM oo  oo cc     kkkkk     AA   AA PPPPPP   III  ')
logger.info('MM    MM oo  oo cc     kk kk     AAAAAAA PP       III  ')
logger.info('MM    MM  oooo   ccccc kk  kk    AA   AA PP      IIIII')
logger.info('---------------------------------------------------------------------')
logger.info( 'started @ ' + now )


exports.log = logger

