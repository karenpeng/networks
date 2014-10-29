var serialport = require("serialport");
var SerialPort = require("serialport").SerialPort;
var portName = process.argv[2];
var urllib = require("urllib");

console.log("opening serial port: " + portName);
var serialPort = new SerialPort(portName, {
  baudrate: 9600,
  parser: serialport.parsers.readline("\r\n")
});

//do handshake here
serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function (data) {
    console.log('from arduino: ' + typeof data + ' ' + data);
    if (data === 'A') {
      console.log("yeah");
      serialPort.write('A');
    }
  });
});

//keep asking the server if something is happening
urllib.request('/hello', {
  method: 'GET',
  dataType: 'json'
}, function (err, data, res) {
  if (err) {
    return console.error(err.stack);
  }
});