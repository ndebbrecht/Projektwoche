#include <Pozyx.h>
#include <Pozyx_definitions.h>
#include <Wire.h>
#include <SPI.h>

////////////////////////////////////////////////
////////////////// PARAMETERS //////////////////
////////////////////////////////////////////////

uint16_t remote_id = NULL;                            // set this to the ID of the remote device

const uint8_t num_anchors = 4;                                    // the number of anchors
uint16_t anchors[num_anchors] = {0x6069, 0x603f, 0x604b, 0x6032};     // the network id of the anchors: change these to the network ids of your anchors.
int32_t anchors_x[num_anchors] = {0, 6267, 851, 6267};                  // anchor x-coorindates in mm
int32_t anchors_y[num_anchors] = {0, 0, 4500, 4500};                  // anchor y-coordinates in mm
int32_t heights[num_anchors] = {2007, 2071, 1220, 1039 };              // anchor z-coordinates in mm

//uint16_t anchors[num_anchors] = {0x604b, 0x6069, 0x603f, 0x6032};     // the network id of the anchors: change these to the network ids of your anchors.
//int32_t anchors_x[num_anchors] = {0, 15000, 15000, 0};                  // anchor x-coorindates in mm
//int32_t anchors_y[num_anchors] = {0, 3280, 10950, 10950};                  // anchor y-coordinates in mm
//int32_t heights[num_anchors] = {660, 2210, 3910, 2190};   

uint8_t algorithm = POZYX_POS_ALG_UWB_ONLY;             // positioning algorithm to use. try POZYX_POS_ALG_TRACKING for fast moving objects.
uint8_t dimension = POZYX_3D;                           // positioning dimension
int32_t height = 1000;                                  // height of device, required in 2.5D positioning


////////////////////////////////////////////////

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  if (Pozyx.begin() == POZYX_FAILURE) {
    delay(100);
    abort();
  }

  // clear all previous devices in the device list
  Pozyx.clearDevices(remote_id);
  // sets the anchor manually
  setAnchorsManual();
  // sets the positioning algorithm
  Pozyx.setPositionAlgorithm(algorithm, dimension, remote_id);

  printCalibrationResult();
  delay(500);
}

void loop() {
  coordinates_t position;
  int status = Pozyx.doPositioning(&position, dimension, height, algorithm);

    if (status == POZYX_SUCCESS) {
      //delay(150);
      printCoordinates(position);
    }
}

// prints the coordinates for either humans or for processing
void printCoordinates(coordinates_t coor) {
  uint16_t network_id = remote_id;
  if (network_id == NULL) {
    network_id = 0;
  }
  char buf[20];

  sprintf(buf, "%ld,%ld,%ld\n", coor.x, coor.y, coor.z);
  Serial1.print(buf);
}

// print out the anchor coordinates (also required for the processing sketch)
void printCalibrationResult() {
  uint8_t list_size;
  int status;

  status = Pozyx.getDeviceListSize(&list_size, remote_id);

  uint16_t device_ids[list_size];
  status &= Pozyx.getDeviceIds(device_ids, list_size, remote_id);
}

// function to manually set the anchor coordinates
void setAnchorsManual() {
  for (int i = 0; i < num_anchors; i++) {
    device_coordinates_t anchor;
    anchor.network_id = anchors[i];
    anchor.flag = 0x1;
    anchor.pos.x = anchors_x[i];
    anchor.pos.y = anchors_y[i];
    anchor.pos.z = heights[i];
    Pozyx.addDevice(anchor, remote_id);
  }
  if (num_anchors > 4) {
    Pozyx.setSelectionOfAnchors(POZYX_ANCHOR_SEL_AUTO, num_anchors, remote_id);
  }
}


