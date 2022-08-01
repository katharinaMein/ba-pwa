/// <reference types="web-bluetooth" />
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.less']
})
export class BluetoothComponent implements OnInit {
  options = {
    acceptAllDevices: true,
    optionalServices: ['battery_service']
  }

  bluetoothAvailable!: boolean;
  battery?: number | null;

  constructor() {
  }

  ngOnInit(): void {
    if (navigator.bluetooth) {
      this.bluetoothAvailable = true;
    } else {
      this.bluetoothAvailable = false;
    }
  }

  onRequestDevice() {
    if (this.bluetoothAvailable) {
      navigator.bluetooth.requestDevice(this.options).then(device => device.gatt?.connect())
        .then(async (server: BluetoothRemoteGATTServer | undefined) => {
            return server?.getPrimaryService('battery_service');
          }
        )
        .then(service => {
            return service?.getCharacteristic('battery_level');
          }
        )
        .then(characteristics => {
            return characteristics?.readValue();
          }
        )
        .then((value) => {
            console.log('The battery level of the connected device is: ' + value?.getInt8(0) + '%');
          }
        )
        .catch(error => {
          console.log(error);
        })
    } else {
      console.log('Can´t do this, because Bluetooth is not available :(')
    }
  }

  async onRequestDevice2() {
    if (this.bluetoothAvailable) {
      const device = await navigator.bluetooth.requestDevice(this.options);
      const server = await device.gatt?.connect();
      const service = await server!.getPrimaryService('battery_service');
      const characteristics = await service.getCharacteristic('battery_level');
      const buffer = await characteristics?.readValue();
      const batteryLevel = buffer.getInt8(0);

      return batteryLevel;
    } else {
      return null;
    }
  }

  getBattery() {
    this.onRequestDevice2().then(val => this.battery = val);
  }
}
