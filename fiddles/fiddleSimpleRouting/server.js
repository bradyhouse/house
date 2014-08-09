/*
 Copyright 2014 Brady Houseknecht

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    fsr = require("fs").createWriteStream('requests.txt'),
    port = process.argv[2] || 8888;
http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri),
        contentTypesByExtension = {
            '.html': "text/html",
            '.css':  "text/css",
            '.js':   "text/javascript"
        };
    request.pipe(fsr, { end: false });
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }
        fs.readFile(filename, "binary", function (err, file) {
            var headers = {},
                contentType = contentTypesByExtension[path.extname(filename)];
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
            if (contentType) {
                headers["Content-Type"] = contentType;
            }
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");