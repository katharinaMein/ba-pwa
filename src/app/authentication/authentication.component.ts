import {Component} from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less']
})
export class AuthenticationComponent {
  authenticationFailed = false;

  private credentialCreationOptions: any = {
    "rp": {"name": "Check Mobile PWA", "id": "katharinamein.github.io/ba-pwa"},
    "user": {
      "id": {
        "type": "Buffer",
        "data": [143, 138, 46, 188, 175, 129, 40, 148, 191, 170, 242, 210, 218, 124, 50, 208, 230, 49, 217, 203, 109, 86, 238, 58, 174, 10, 235, 218, 159, 125, 41, 246]
      }
    },
    "challenge": {
      "type": "Buffer",
      "data": [232, 170, 185, 223, 88, 30, 124, 81, 54, 243, 176, 49, 175, 94, 6, 99, 85, 211, 100, 106, 40, 86, 26, 179, 159, 201, 220, 95, 224, 57, 85, 183, 88, 149, 60, 239, 144, 82, 88, 157, 20, 164, 219, 168, 216, 105, 135, 149, 179, 79, 25, 30, 94, 11, 44, 87, 18, 143, 193, 137, 122, 245, 114, 163, 146, 95, 107, 108, 229, 220, 211, 2, 170, 166, 223, 39, 143, 59, 138, 68, 8, 152, 52, 195, 198, 56, 92, 158, 79, 44, 241, 135, 162, 181, 160, 177, 96, 246, 19, 167, 201, 11, 103, 81, 64, 78, 45, 60, 156, 253, 182, 56, 106, 250, 94, 179, 143, 224, 21, 234, 202, 78, 199, 245, 104, 252, 105, 208]
    },
    "pubKeyCredParams": [{"type": "public-key", "alg": -7}, {"type": "public-key", "alg": -257}],
    "timeout": 50000,
    "attestation": "none",
    "authenticatorSelectionCriteria": {
      "attachment": "platform",
      "requireResidentKey": false,
      "userVerification": "required"
    },
    "authenticatorSelection": {"authenticatorAttachment": "platform",
      "userVerification": "required"}
  };
  authenticatedSuccessful = false;

  async onAuthenticate() {
    this.credentialCreationOptions.challenge = new Uint8Array(this.credentialCreationOptions.challenge.data);
    this.credentialCreationOptions.user.id = new Uint8Array(this.credentialCreationOptions.user.id.data);
    this.credentialCreationOptions.user.name = 'Registrierter Nutzer des Systems';
    this.credentialCreationOptions.user.displayName = 'Check Mobile PWA';

    try{
      await navigator.credentials.create({publicKey: this.credentialCreationOptions})
      this.authenticatedSuccessful = true;
    }catch (e: any){
      console.log(e);
      this.authenticatedSuccessful = false;
      this.authenticationFailed = true;
    }
  }
}
