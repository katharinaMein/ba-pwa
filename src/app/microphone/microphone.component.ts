import {ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.less']
})
export class MicrophoneComponent {
  chunks: any[] = [];
  recording = false;
  microphoneIsAvailable = navigator.mediaDevices;
  recordedAudio: any;
  mediaRecorder?: MediaRecorder;

  constructor(private cdRef: ChangeDetectorRef, public sanitizer: DomSanitizer) {
  }

  async onClickRecordButton() {
    if(!this.mediaRecorder) {
      this.mediaRecorder = await this.createMediaRecorder();
    }
    if (!this.mediaRecorder) {
      alert("Media Recorder konnte nicht erstellt werden!");
      return;
    }
    this.toggleRecording(this.recording);
  }

  private async createMediaRecorder(): Promise<undefined | MediaRecorder> {
    const stream = await navigator.mediaDevices.getUserMedia({"audio": true});
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      this.chunks.push(event.data);
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, {"type": "audio/ogg; codecs=opus"});
      this.recordedAudio = window.URL.createObjectURL(blob);
      this.chunks = [];
      this.cdRef.detectChanges();
    };

    return mediaRecorder;
  }

  private toggleRecording(recording: boolean) {
    recording ? this.mediaRecorder?.stop() : this.mediaRecorder?.start();
    console.log(this.mediaRecorder?.state);
    if(this.mediaRecorder?.state !=="recording") {
      this.mediaRecorder = undefined;
    }
    this.recording = !recording
  }
}
