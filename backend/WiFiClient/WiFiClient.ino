/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

byte mac[] = {  0x2C, 0x3A, 0xE8, 0x2F, 0x61, 0x6C };
IPAddress server(172, 24, 1, 1);

WiFiClient wifiClient;
PubSubClient client(server, 1883, wifiClient);

const char* ssid     = "3DPosition";
const char* password = "ProWo1337";

void setup() {
  Serial.begin(9600);
  delay(10);
  

  // We start by connecting to a WiFi network


  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  client.connect("arduinoClient");

  
}

void loop() {
  
  printTestMessage();
  
}

void printTestMessage() {
  String input = Serial.readStringUntil('\n');
  Serial.println(input);
  char buf[input.length()+1];
  input.toCharArray(buf,input.length()+1);
  Serial.println(buf);
  client.publish("outTopic", buf);
 
}



