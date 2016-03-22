var express = require("express"),
  path = require("path"),
  nedb = require('nedb'),
  databaseUrl = "db/items.db";
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

var db = {
  items: new nedb({ filename: databaseUrl, autoload: true })
};

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

  /*app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));*/


app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/items', function (req, res) {
  db.items.find({}, function(err, result) {
    res.send(result);
  });
});

app.get('/items/:id', function (req, res) {
  var id = req.params.id;	
  db.items.find({_id: id}, function(err, result) {
    res.send(result);
  });
});

app.post('/items', function (req, res) {
  var item = req.body;
  console.log(req);
  var newItem = {name:'test',email:'test',phone:'test',id:24};
  db.items.insert(item, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.send(result);
    }
  });
});


app.put('/items/:id', function (req, res) {
	var item = req.body;
  console.log(item);
  var id = req.params.id;
  console.log(id);
  db.items.update({ _id: id}, item, {}, function (err, result) {
	  if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      console.log('' + result + ' document(s) deleted');
      res.send(req.body);
    }  
});
});

app.delete('/items/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.items.remove({_id: id}, {}, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      console.log('' + result + ' document(s) deleted');
      res.send(req.body);
    }
  });
});


var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
