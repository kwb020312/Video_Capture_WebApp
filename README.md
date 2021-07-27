# :movie_camera: 웹 캠 활용

```javascript
let recorder;
let recordedChunks;

// functions
function videoStart() {
  // 웹 캠과 오디오를 활성화함
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      previewPlayer.srcObject = stream;
      startRecord(previewPlayer.captureStream());
    });
}

function startRecord(stream) {
  recordedChunks = [];

  // 미디어 리코더 생성자를 할당하며 방송하는동안 청크에 데이터를 저장함
  recorder = new MediaRecorder(stream);
  recorder.ondataAvaliable = (e) => recordedChunks.push(e.data);
  recorder.start();
}

function stopRecording() {
  // 플레이어의 src에서 video 와 audio를 빼낸 후 정지
  previewPlayer.srcObject.getTracks().forEach((track) => track.stop());
  recorder.stop();
}

function playRecording() {
  // Blob형식으로 청크를 전달한 후 타입은 .webm확장자로 선언
  const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  // URL객체를 사용하여 Blob데이터를 url데이터로 변환
  recordingPlayer.src = URL.createObjectURL(recordedBlob);
  recordingPlayer.play();
  // 다운로드는 recording_날짜.webm 으로 다운됨
  downloadButton.href = recordingPlayer.src;
  downloadButton.download = `recording_${new Date()}.webm`;
}
```

위의 형식으로 비디오를 실행, 정지, 저장 할 수 있게 만듦
