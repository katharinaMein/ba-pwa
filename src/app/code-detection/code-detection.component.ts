import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {FileReaderService} from "../file-reader.service";

@Component({
  selector: 'app-code-detection',
  templateUrl: './code-detection.component.html',
  styleUrls: ['./code-detection.component.less']
})
export class CodeDetectionComponent implements OnInit {
  barcodeDecSupported!: boolean;
  src$: Observable<any> = of('');
  image = document.querySelector('img');

  constructor(private frService: FileReaderService) { }

  ngOnInit(): void {
    if(!('BarcodeDetector' in window)){
      console.log('Barcode Detector wird in diesem Browser nicht unterstützt.');
      this.barcodeDecSupported = false;
    }else{
      console.log('Barcode Detector wird in diesem Browser unterstützt.');
      this.barcodeDecSupported = true;
    }
  }

  onChangeImage(event: Event){
    this.src$ = this.frService.onChange(event);
  }

  onScanBarcode(){
    if(this.barcodeDecSupported){

      // @ts-ignore
      const barcodeDetector: any = new BarcodeDetector({formats: ['qr_code']});
      barcodeDetector.detect(this.image!)
        .then((barcodes: any[]) => {
          barcodes.forEach((barcode) => console.log(barcode.rawData));
        })
        .catch((err: any) => {
          console.log(err);
        })
    }
  }
}
