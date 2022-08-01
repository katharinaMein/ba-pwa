import { Component, OnInit } from '@angular/core';
import {FileReaderService} from "../file-reader.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.less']
})
export class CameraComponent implements OnInit {

  src$: Observable<any> = of('');
  constructor(private frService: FileReaderService) { }

  ngOnInit(): void {

  }

  onChange(event: Event){
    this.src$ = this.frService.onChange(event);
  }
}
