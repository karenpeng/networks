var express = require("express");
var app = express();
var ejs = require("ejs");

var records = {};
var id = 0;

app.listen(4000);

// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/position/:name/:value', function (req, res) {
  console.log('from web client ' + req.params.name + ' ' + req.params.value);
  //send yun this
});

app.post('/record/:name/:x/:y', function (req, res) {
  //save it
  //TODO: hook up a database later
  var key = req.params.name;
  records[key] = {
    'id': id,
    'x': req.params.x,
    'y': req.params.y
  };
  console.log(records[key]);
  id++;
});

app.get('/record/:name', function (req, res) {
  var key = req.params.name;
  console.log(records[key]);
  //send yun this
});

app.get('/hello', function (req, res) {
  //what should i do here?
  //how should i respond to yun?
});