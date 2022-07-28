import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";

@Component({
  selector: 'app-offline-usage',
  templateUrl: './offline-usage.component.html',
  styleUrls: ['./offline-usage.component.less']
})
export class OfflineUsageComponent implements OnInit {

  usersArray$!: Observable<{ firstName: string, lastName: string }[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const response$ = this.http.get<{ users: Array<any> }>('https://dummyjson.com/users');

    this.usersArray$ = response$.pipe(
      map<{ users: Array<any> }, { firstName: string, lastName: string }[]>(value =>
        value.users.map(user => ({ firstName: user.firstName, lastName: user.lastName }))
      )
    );
  }
}
