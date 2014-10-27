var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require('body-parser');
var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\r\n")
});
// var serialPort = new SerialPort("/dev/tty.usbserial-A602LDI6", {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\n")
// });
var router = express.Router();

app.listen(4000);

// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/position/:name/:value', function (req, res) {
  console.log('from web client ' + req.params.name + ' ' + req.params.value);
  setToSerial(req.params.name, req.params.value);
});

app.get('/record/:x/:xvalue/:y/:yvalue', function (req, res) {
  console.log('from web client ' + req.params.x + ' ' + req.params.xvalue + req.params.y + ' ' + req.params.yvalue);
  //save it
});

app.post('/post', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

});

function setToSerial(name, value) {
  serialPort.write(name + value);
}

serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function (data) {
    console.log('from arduino: ' + typeof data + ' ' + data);
    //if (!firstContact) {
    if (data === 'A') {
      console.log("yeah");
      serialPort.write('A');
      //firstContact = true;
      //console.log(firstContact);
      // } else {
    }
    //}
  });
});