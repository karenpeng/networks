var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:4000');
ws.on('open', function () {
  ws.send('helloback');
});
ws.on('message', function (message) {
  console.log('received: %s', message);
});

// var serialport = require("serialport");
// var SerialPort = require("serialport").SerialPort;
// var portName = process.argv[2];

// console.log("opening serial port: " + portName);
// var serialPort = new SerialPort(portName, {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\r\n")
// });

// //do handshake here
// serialPort.on('open', function () {
//   console.log('open');
//   serialPort.on('data', function (data) {
//     console.log('from arduino: ' + typeof data + ' ' + data);
//     if (data === 'A') {
//       console.log("yeah");
//       serialPort.write('A');
//     }
//   });
// });