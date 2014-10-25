var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require('body-parser');
var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/tty.usbmodem1431", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\r\n")
});
// var serialPort = new SerialPort("/dev/tty.usbserial-A602LDI6", {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\n")
// });

app.listen(4000);

// Set up the view directory
app.set("views", __dirname);

// Set EJS as templating language WITH html as an extension)
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

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

app.post('/post', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(typeof req.body.value)
  if (req.body.value === 'true') {
    serialPort.write('L');
    console.log('L');
  }
  if (req.body.value === 'false') {
    serialPort.write('H');
    console.log('H');
  }
});

var firstContact = false;
serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function (data) {
    console.log('data received: ' + typeof data + ' ' + data);
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