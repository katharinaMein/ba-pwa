import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.less']
})
export class LocationComponent implements OnInit {
  options: {timeout: number, maximumAge: number, enableHighAccuracy: boolean} = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  longitude?: number;
  latitude?: number;
  accuracy?: number;

  buttonClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if('geolocation' in navigator) {
      console.log('Geolocation available');
    } else {
      console.log('Geolocation not available');
    }
  }

  onGetCoordinates(){
    navigator.geolocation.getCurrentPosition((position:GeolocationPosition): void => {
      this.success(position)
    },
      positionError => this.error(positionError),
      this.options);
    this.buttonClicked = true;
  }

  success(pos: GeolocationPosition) {
    const crd = pos.coords;
    this.longitude = crd.longitude;
    this.latitude = crd.latitude;
    this.accuracy = crd.accuracy;
  }

  error(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}
