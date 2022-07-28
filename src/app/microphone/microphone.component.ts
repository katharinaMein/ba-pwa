import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.less']
})
export class MicrophoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const audioCtx = new AudioContext();
    let recording = false;

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {

        const mediaRecorder = new MediaRecorder(stream);

        let chunks: any[] = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        }

        // When you stop the recorder, create a empty audio clip.
        mediaRecorder.onstop = (event) => {
          const audio = new Audio();
          audio.setAttribute("controls", "");
          document.getElementById("sound-clip")!.append(audio);

          // Combine the audio chunks into a blob, then point the empty audio clip to that blob.
          const blob = new Blob(chunks, {"type": "audio/ogg; codecs=opus"});
          audio.src = window.URL.createObjectURL(blob);

          // Clear the `chunks` buffer so that you can record again.
          chunks = [];
        };

        // Set up event handler for the "Record" button.
        document.getElementById("record")!.onclick = (function (){
          if (recording) {
            mediaRecorder.stop();
            recording = false;
            document.getElementById("record")!.innerHTML = "Record";
          } else {
            mediaRecorder.start();
            recording = true;
            document.getElementById("record")!.innerHTML = "Stop";
          }
        });

      }).catch((err) => {
        // Throw alert when the browser is unable to access the microphone.
        alert("Oh no! Your browser cannot access your computer's microphone.");
      });
    } else {
      // Throw alert when the browser cannot access any media devices.
      alert();
      alert("Oh no! Your browser cannot access your computer's microphone. Please update your browser.");
    }
  }
}
