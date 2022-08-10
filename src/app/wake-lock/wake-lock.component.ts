import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wake-lock',
  templateUrl: './wake-lock.component.html',
  styleUrls: ['./wake-lock.component.less']
})
export class WakeLockComponent implements OnInit {
  button: {text: string} = {text: 'Aktiviere Screen Wake Lock'};
  wakeLockActivated: boolean = false;
  wakeLock: any = null;
  activatedText: string = 'Screen Wake Lock ist nun aktiviert. Der Bildschirm sperrt sich nicht mehr.'
  deactivatedText: string = 'Screen Wake Lock ist gerade nicht aktiviert. Der Bildschirm sollte sich nach einer gewissen Zeit sperren.'
  infoText: string = this.deactivatedText;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onReleaseWakeLock();
  }

  async onToggleWakeLock(){
    if(this.wakeLockActivated){
      this.onReleaseWakeLock();
    }else{
      await this.onRequestWakeLock();
    }
  }

  onReleaseWakeLock(){
    this.wakeLock.addEventListener('release', () => {
      console.log('Release-Event added to wakeLock')
    });
    this.wakeLock.release();
    this.wakeLock = null;
    this.wakeLockActivated = false;
    this.button.text = 'Aktiviere Screen Wake Lock';
    this.infoText = this.deactivatedText;
  }

  async onRequestWakeLock(){
    this.wakeLock = await (navigator as any).wakeLock.request('screen');
    this.button.text = 'Deaktiviere Screen Wake Lock';
    this.wakeLockActivated = true;
    this.infoText = this.activatedText;
  }
}
