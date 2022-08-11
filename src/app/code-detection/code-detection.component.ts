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
  barcodeContent: any[] = [];

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
    const image = document.getElementById('barcodeImage');

    if(this.barcodeDecSupported){
      window.alert('in onScanBarcode Methode, in if barcodeDecSupported = true');

      // @ts-expect-error
      const barcodeDetector: any = new BarcodeDetector({formats: ['qr_code']});
      window.alert(barcodeDetector);
      barcodeDetector.detect(image!)
        .then((barcodes: any[]) => {
          let pre = document.createElement("pre");
          pre.innerHTML = JSON.stringify(barcodes, null, 2);
          image!.after(pre);
          barcodes.forEach((barcode) => this.barcodeContent.push(barcode.rawValue));
        })
        .catch((err: any) => {
          alert('Errormessage:' + err);
        })
    }
  }
}
