import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less']
})
export class ShareComponent implements OnInit {
  shareData: ShareData = {
    text: ''
  };

  errorCaught: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  async onShareText(shareInput: string){
    this.shareData.text = shareInput;
    try{
      await navigator.share(this.shareData);
    }
    catch(error){
      this.errorCaught = true;
      console.log(error);
    }
  }
}
