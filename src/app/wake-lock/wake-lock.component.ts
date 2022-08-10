import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wake-lock',
  templateUrl: './wake-lock.component.html',
  styleUrls: ['./wake-lock.component.less']
})
export class WakeLockComponent implements OnInit {
  button: {text: string} = {text: 'Activate Screen Wake Lock'};
  wakeLockActivated: boolean = false;
  wakeLock = null;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleWakeLock(){
    if(this.wakeLockActivated){
      this.wakeLockActivated = false;
      this.button.text = 'Activate Screen Wake Lock';
    }else{
      this.wakeLock = (navigator as any).wakeLock.request('screen');
      this.button.text = 'Deactivate Screen Wake Lock';
      this.wakeLockActivated = true;
    }
  }
}
