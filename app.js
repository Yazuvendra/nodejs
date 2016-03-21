var express = require('express');
var app = express();
var http = require('http');
var requestListener = function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello You\n');
}
var server = http.createServer(requestListener);
server.listen(8080);

app.get('/', function (req, res) {
  res.send('Hello World!');
});
