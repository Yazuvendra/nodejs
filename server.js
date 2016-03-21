var express = require("express"),
  path = require("path"),    
  bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 
app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/items', function (req, res) {
 res.send('API is running- get items');
});

app.get('/items/:id', function (req, res) {
 res.send('API is running- get items');
});

app.post('/items', function (req, res) {
  res.send('API is running- post items');
});


app.put('/items/:id', function (req, res) {
res.send('API is running- put items');
});

app.delete('/items/:id', function (req, res) {
res.send('API is running- delete items');
});


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
