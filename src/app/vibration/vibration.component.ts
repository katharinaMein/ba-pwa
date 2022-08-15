import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vibration',
  templateUrl: './vibration.component.html',
  styleUrls: ['./vibration.component.less']
})
export class VibrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onVibrate(){
      window.navigator.vibrate(200);
  }
}
