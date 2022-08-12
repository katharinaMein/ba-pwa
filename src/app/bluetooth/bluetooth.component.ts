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

  async onRequestDevice() {
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

  onGetBattery() {
    this.onRequestDevice().then(val => this.battery = val);
  }
}
