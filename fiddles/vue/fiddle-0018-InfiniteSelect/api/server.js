'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const cors = require('cors')
const utils = require('./utils/index')
const logger = utils.log

const app = require('connect')()
const swaggerTools = require('swagger-tools')
const jsyaml = require('js-yaml')
const bodyParser = require('body-parser')

const serverPort = 2023

// swaggerRouter configuration
const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
}

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8')
const swaggerDoc = jsyaml.load(spec)

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Oversized request support
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    // Middleware to log requests
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`)
        next()
    })

    // Enable CORS for all origins
    app.use(cors())

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata())

    // Validate Swagger requests
    app.use(middleware.swaggerValidator())

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options))

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi())



    // Start the server
    http.createServer(app).listen(serverPort, function () {
        logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort)
        logger.info('Swagger-ui is available on http://localhost:%d/docs', serverPort)
    })

})
