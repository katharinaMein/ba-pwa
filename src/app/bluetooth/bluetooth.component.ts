/// <reference types="web-bluetooth" />
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.less']
})
export class BluetoothComponent implements OnInit {
  options = {
    acceptAllDevices: true
  }

  bluetoothAvailable!: boolean;

  constructor() { }

  ngOnInit(): void {
    if(navigator.bluetooth){
      this.bluetoothAvailable = true;
    } else {
      this.bluetoothAvailable = false;
    }
  }

  onRequestDevice() {
    if (this.bluetoothAvailable){
      navigator.bluetooth.requestDevice(this.options).then(
        device => {
          console.log(device.name);
          return device.gatt?.connect();
        }
      )
        .then((server: BluetoothRemoteGATTServer | undefined) => {
          return server!.getPrimaryService('battery_service');
        }
      )
        .then(service =>{
          return service.getCharacteristic('battery_level');
        }
      )
        .then(characteristics =>{
          return characteristics.readValue();
        }
      )
        .then(value =>{
          console.log('The battery level of the connected device is' + value);
          }
        )
        .catch( error => {
        console.log(error);
      })
    } else{
      console.log('Can´t do this, because Bluetooth is not available :(')
    }
  }
}
