# :movie_camera: 웹 캠 활용

<img src="https://yt3.ggpht.com/ytc/AKedOLTdyKcjkkPdb3OfdJ_Esptm4Ry_gWSpqflRqWHa=s48-c-k-c0x00ffffff-no-rj">
해당 저장소는 Youtube code Scalper 님의 강좌 중 <a href="https://www.youtube.com/watch?v=g6RpmxvHAZY">녹화프로그램! HTML, JS로 직접 만들어봅시다.</a> 를 기반으로 제작되었음을 미리 밝힙니다.

요즘 여러 회사에서 비대면 서비스를 많이 진행하며 웹을 다루는데에 있어 WebRTC등 여러 기술들을 미리 체험해보는 것이 필요하다고 느껴 해당 저장소를 만들게되었다.

<img src=".\gitImages\캡처.PNG>">

위와 같은 기능을 구현해보겠음

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
