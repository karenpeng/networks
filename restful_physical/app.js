var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require('body-parser');
var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;
// var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\r\n")
// });
// var serialPort = new SerialPort("/dev/tty.usbserial-A602LDI6", {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\n")
// });
var records = {};
var id = 0;

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

app.post('/position/:name/:value', function (req, res) {
  console.log('from web client ' + req.params.name + ' ' + req.params.value);
  //setToSerial(req.params.name, req.params.value);
});

app.post('/record/:name/:x/:y', function (req, res) {
  //save it
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
  //setToSerial(records[key].x + records[key].y);
});

app.post('/post', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

});

// function setToSerial(name, value) {
//   serialPort.write(name + value);
// }

// serialPort.on('open', function () {
//   console.log('open');
//   serialPort.on('data', function (data) {
//     console.log('from arduino: ' + typeof data + ' ' + data);
//     //if (!firstContact) {
//     if (data === 'A') {
//       console.log("yeah");
//       serialPort.write('A');
//       //firstContact = true;
//       //console.log(firstContact);
//       // } else {
//     }
//     //}
//   });
// });