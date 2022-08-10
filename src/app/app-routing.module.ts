import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfflineUsageComponent} from "./offline-usage/offline-usage.component";
import {BluetoothComponent} from "./bluetooth/bluetooth.component";
import {CameraComponent} from "./camera/camera.component";
import {MicrophoneComponent} from "./microphone/microphone.component";
import {LocalFilesComponent} from "./local-files/local-files.component";
import {LocationComponent} from "./location/location.component";
import {PushNotificationsComponent} from "./push-notifications/push-notifications.component";
import {ShareComponent} from "./share/share.component";
import {VibrationComponent} from "./vibration/vibration.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {WakeLockComponent} from "./wake-lock/wake-lock.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'offline-usage', component: OfflineUsageComponent},
  {path: 'bluetooth', component: BluetoothComponent},
  {path: 'camera', component: CameraComponent},
  {path: 'microphone', component: MicrophoneComponent},
  {path: 'local-files', component: LocalFilesComponent},
  {path: 'location', component: LocationComponent},
  {path: 'push-notification', component: PushNotificationsComponent},
  {path: 'share', component: ShareComponent},
  {path: 'vibration', component: VibrationComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'wake-lock', component: WakeLockComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
