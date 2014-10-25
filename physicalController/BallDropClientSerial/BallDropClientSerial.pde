/*
  Ball Drop Client
 Language:  Processing
 
 Starts a network client that connects to a server on port 8080,
 sends any keystrokes pressed. 
 
 For use with the Ball Drop Server game.
 
 Created sometime in 2007
 modified 10 Sept 2012
 by Tom Igoe
 
 */

import processing.serial.*;
import processing.net.*;

Serial myPort;
boolean firstContact = false;
int[] serialInArray = new int[3];
int serialCount = 0;


Client myClient;                   // instance of the net Client
String data = null;                       // string to hold incoming data
String ipAddress = "128.122.151.180";    // address of the server goes here
boolean tellArduionIfConnected = false;

float x, y;
int[] sensorsTimer = new int[4];

void setup() {
  // establish the background and foreground:
  size(400, 300);      
  background(50);
  fill(200);
  // Connect to server on port 8080
  myClient = new Client(this, ipAddress, 8080);
  background(#000045);
  fill(#eeeeff);
  for (int i=0; i<6; i++) {
    println(Serial.list()[i]);
  }
  String portName = Serial.list()[4];
  myPort = new Serial(this, portName, 9600);
  myPort.bufferUntil('\n');

  x=width/2;
  y=height/2;
  for (int i = 0; i< 4; i++) {
    sensorsTimer[i] = 0;
  }
}

void draw() {
  //println(data);
  // If there's incoming data from the client:
  if (myClient.available() > 0) { 
    // get the data:
    data = myClient.readString();
  }

  background(#000045);
  fill(#eeeeff);
  text(data, 10, 10);
  fill(255);
  ellipse(x, y, 20, 20);
}

void keyReleased() {
  // smend out anything that's typed:
  myClient.write(key);
  if (keyCode == 38) {
    myClient.write('u');
  }
  if (keyCode == 40) {
    myClient.write('d');
  }
  if (keyCode == 37) {
    myClient.write('l');
  }
  if (keyCode == 39) {
    myClient.write('r');
  }
}

void serialEvent(Serial myPort) {

  if (firstContact == false) {
    int inByte = myPort.read();
    if (inByte == 'A') {
      myPort.clear();
      firstContact = true;
      myPort.write('A');
      println("Initianized.");
    }
  }
  else {
    String myString = myPort.readStringUntil('\n');
    myString = trim(myString);
    //println(myString);
    int sensors[] = int(split(myString, ','));

    for (int sensorNum = 0; sensorNum < sensors.length; sensorNum++) {
      //print("Sensor " + sensorNum + ": " + sensors[sensorNum] + "\t");
    }

    if (sensors.length > 3) {
      //println("ss");

      //---------------up----------------
      if (sensors[0] == 1) {

        sensorsTimer[1] = 0;
        sensorsTimer[2] = 0;
        sensorsTimer[3] = 0;

        if (sensorsTimer[0] == 0) {
          println("up");
          x = width/2;
          y = 20;
          myClient.write('u');
        }
        sensorsTimer[0] ++;
      }

      if (sensorsTimer[0] > 4) {
        sensorsTimer[0] = 0;
      }


      //------------------down---------------------

      if (sensors[1] == 1) {

        sensorsTimer[0] = 0;
        sensorsTimer[2] = 0;
        sensorsTimer[3] = 0;

        if (sensorsTimer[1] == 0) {
          println("down");
          x = width/2;
          y = height - 20;
          myClient.write('d');
        }
      }

      if (sensorsTimer[1] > 6) {
        sensorsTimer[1] = 0;
      }


      //----------------left--------------------

      if (sensors[2] == 1) {

        sensorsTimer[0] = 0;
        sensorsTimer[1] = 0;
        sensorsTimer[3] = 0;

        if (sensorsTimer[2] ==0) {
          println("left");
          x = width - 20;
          y = height/2;
          myClient.write('l');
        }

        sensorsTimer[2] ++;
      }

      if (sensorsTimer[2] > 10) {
        sensorsTimer[2] = 0;
      }


      //-----------------right------------------

      if (sensors[3] == 1) {

        sensorsTimer[0] = 0;
        sensorsTimer[1] = 0;
        sensorsTimer[2] = 0;

        if (sensorsTimer[3]==0) {
          println("right");
          x = 20;
          y = height/2;
          myClient.write('r');
        }
        sensorsTimer[3]++;
      }

      if (sensorsTimer[3] > 10) {
        sensorsTimer[3] = 0;
      }
    }

    if (data != null && !tellArduionIfConnected) {
      println("light up led!");
      myPort.write('B');
      tellArduionIfConnected = true;
    }
    else if (sensors[0] == 1 || sensors[1] == 1 || sensors[2] == 1 || sensors[3] == 1) {
      myPort.write('C');
    }
    else {
      myPort.write('A');
    }
  }
}

