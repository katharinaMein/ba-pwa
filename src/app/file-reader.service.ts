import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  onChange(event: any): Observable<any> {
    const result$ = new Subject();
    const reader = new FileReader();

    reader.onload = (event: any) => {
      result$.next(event.target.result);
      result$.complete();
    };

    reader.onerror = (event: any) => {
      result$.error("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
    return result$.asObservable();
  }
}
