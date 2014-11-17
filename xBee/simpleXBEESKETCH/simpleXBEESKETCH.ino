
String inputString = "";
boolean pumpWater = false;
int counter = 0;
int pump = 12;
int led = 4;
int tilt = 7;

void setup() {
  // configure serial communications:
  Serial.begin(9600);      
  pinMode(pump, OUTPUT);
  pinMode(led, OUTPUT);
  pinMode(tilt, INPUT);
//  digitalWrite(pump, HIGH);
  //digitalWrite(led, HIGH);
  // set XBee's destination address
  setDestination();
}


void loop() {
  //Serial.println("x");
  //Serial.println(digitalRead(tilt));
  signalRead();
//
//  digitalWrite(pump, HIGH);
//  delay(200);
//  digitalWrite

  
}

void setDestination() {
  // put the radio in command mode:
  Serial.print("+++");
  // wait for the radio to respond with "OK\r"
  char thisByte = 0;
  while (thisByte != '\r') {
    if (Serial.available() > 0) {
      thisByte = Serial.read(); 
    }
  }
  Serial.print("ATIDFEED\r");
  Serial.print("ATDL2\r");
  Serial.print("ATMY1\r"); 
  Serial.print("ATCN\r");
}

void signalRead(){
  char thisByte = 0;

  while (thisByte != '\r') {
    if (Serial.available() > 0) {
      thisByte = Serial.read(); 
      if (thisByte == 'x' || thisByte == 'X'){
        //pumpWater = true;
        digitalWrite(pump, HIGH);
        Serial.println("A");
        //Serial.println("X");
        //Serial.println("x");
      }
    }

//    if(shootBean){
//      counter ++;
//      Serial.println(counter);
//    }  
//
//    if(counter > 300){
//      digitalWrite(laser, LOW);
//      shootBean = false;
//      Serial.println("B");
//      counter = 0;
//    }
  }
}





