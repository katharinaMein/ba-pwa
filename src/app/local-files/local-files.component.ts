import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {FileReaderService} from "../file-reader.service";

@Component({
  selector: 'app-local-files',
  templateUrl: './local-files.component.html',
  styleUrls: ['./local-files.component.less']
})
export class LocalFilesComponent implements OnInit {
  src$: Observable<any> = of('');

  constructor(private frService: FileReaderService) { }

  ngOnInit(): void {
  }

  onChange(event: Event){
    this.src$ = this.frService.onChange(event);
  }
}
