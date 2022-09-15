import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit {
  private registration?: ServiceWorkerRegistration;

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.registration = await navigator.serviceWorker.getRegistration();

  }

  async onSendNotification(value: string) {
    if(Notification.permission === 'granted') {
      this.showMyNotification(value);
    }
    else {
      if(Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();

        if(permission === 'granted') {
          this.showMyNotification(value);
        }
      }
    }
  };

  showMyNotification(body: string){
    const title = 'Deine Check Mobile Push-Notification';
    const payload = {
      body: body
    };

    if(this.registration && 'showNotification' in this.registration) {
      this.registration.showNotification(title, payload)
        .then(value => console.log(value));
    }
    else {
      new Notification(title, payload);
    }
  };
}
