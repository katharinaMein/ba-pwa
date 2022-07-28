import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.less']
})
export class CameraComponent implements OnInit {

  src: any;
  constructor() { }

  ngOnInit(): void {

  }

  async onChange(event: any) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.src = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
