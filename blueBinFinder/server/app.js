var express = require("express");
var app = express();
var ejs = require("ejs");
var server = require('http').createServer(app);
var WebSocketServer = require('ws').Server;
var socketServer = new WebSocketServer({
  server: server
});
var config = require("./config.json");

//you have to define an empty object first b/c otherwise you can't add key in it
var records = {};
var id = 0;

server.listen(4000);

// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/set', function (req, res) {
  res.render('set.html');
});

app.get('/find', function (req, res) {
  res.render('find.html');
});

app.get('/position/:name/:value', function (req, res) {
  console.log('from web client ' + req.params.name + ' ' + req.params.value);
  //send yun this
});

app.get('/record/:name/:x/:y', function (req, res) {
  //save it
  //TODO: hook up a database later
  var key = req.params.name;
  console.log(key);
  records.key = {
    'id': id,
    'x': req.params.x,
    'y': req.params.y
  };
  console.log(records.key);
  id++;
  console.log("save data " + records);
});

app.get('/record/:name', function (req, res) {
  var key = req.params.name;
  console.log("asking data from " + records.key);
  //send yun this
});

// listen for new socket.io connections:
socketServer.on('connection', function (socket) {
  // send something to the web client with the data:
  socket.send("Hello!");

  // if the client sends you data, act on it:
  socket.on('message', function (data) {
    console.log('received from client: ' + data);
  });
});

//TODO:make a task que