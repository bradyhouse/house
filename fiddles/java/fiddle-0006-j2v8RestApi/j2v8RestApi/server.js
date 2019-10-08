var http = require('http');
var server = http.createServer(function (request, response) {
 response.writeHead(200, {'Content-Type': 'text/plain'});
 response.write('hi mom!');
 response.end();
});

server.listen(8000);
console.log('Server running at https://127.0.0.1:8000/');