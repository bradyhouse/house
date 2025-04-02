const timestamp = new Date().toISOString().split('T')[0]

module.exports = {
    appenders: {
        file: {
            type: 'file',
            filename: 'logs/ds-mock-api-' + timestamp + '.log',
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
            }
        },
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
            }
        }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'info' }
    }
};