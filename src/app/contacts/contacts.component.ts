import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {
  contacts!: [{name: string, tel: string}];
  contactsAvailable: boolean = true;
  contactProperties = ['name', 'tel'];
  options = {multiple: true};

  constructor() { }

  ngOnInit(): void {
    if(!('contacts' in navigator && 'ContactsManager' in window)){
      this.contactsAvailable = false;
    }
  }

  async onGetContacts(){
    this.contacts = await (navigator as any).contacts.select(this.contactProperties, this.options);
  }

}
