import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OfflineUsageComponent } from './offline-usage/offline-usage.component';
import { CameraComponent } from './camera/camera.component';
import { MicrophoneComponent } from './microphone/microphone.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { LocalFilesComponent } from './local-files/local-files.component';
import { ShareComponent } from './share/share.component';
import { VibrationComponent } from './vibration/vibration.component';
import { LocationComponent } from './location/location.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { ContactsComponent } from './contacts/contacts.component';
import { WakeLockComponent } from './wake-lock/wake-lock.component';

@NgModule({
  declarations: [
    AppComponent,
    OfflineUsageComponent,
    CameraComponent,
    MicrophoneComponent,
    PushNotificationsComponent,
    BluetoothComponent,
    LocalFilesComponent,
    ShareComponent,
    VibrationComponent,
    LocationComponent,
    PageNotFoundComponent,
    HomeComponent,
    ContactsComponent,
    WakeLockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
