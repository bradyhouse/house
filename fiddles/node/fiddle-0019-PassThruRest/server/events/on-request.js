const
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  request = require('request'),
  contentTypes = require('../../config/content-types'),
  log = require('../../utils/log'),
  route = require('./on-route');


exports.trigger = function (req, res) {
  log.info('app > onServerRequest');
  switch (req.method) {
    case 'PUT':
    case 'POST': {
      var body = "";
      req.on("data", function (data) {
        body += data;
      });
      log.info('app > onServerRequest > body:');
      log.console(body);
      req.on("end", function () {
        return route.trigger(req, res, body);
      });
      break;
    }
    default: {
      switch (req.url) {
        case '/': {
          req.url += '/index.html';
          return this.trigger(req, res);
          break;
        }
        default: {
          var ext = path.extname(req.url).slice(1);
          if (contentTypes[ext]) {
            fs.readFile('./static/' + req.url, function (err, data) {
              if (err) {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write(req.url);
                res.write(err + '\n');
                res.end();
              } else {
                res.setHeader('Content-Type', contentTypes[ext]);
                if (ext === 'html') {
                  res.setHeader('Cache-Control', 'no-cache, no-store');
                  res.setHeader('Access-Control-Allow-Origin', '*');
                }
                res.end(data);
              }
            });
          } else {
            route.trigger(req, res, "");
          }
          break;
        }
      }
      break;
    }
  }
};