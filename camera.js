//dom

const recordButton = document.querySelector(".record-button");
const stopButton = document.querySelector(".stopButton");
const playButton = document.querySelector(".playButton");
const downloadButton = document.querySelector(".downloadButton");
const previewPlayer = document.querySelector("#preview");
const recordingPlayer = document.querySelector("#recording");

let recorder;
let recordedChunks;

// functions
function videoStart() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      previewPlayer.srcObject = stream;
      startRecord(previewPlayer.captureStream());
    });
}

function startRecord(stream) {
  recordedChunks = [];
  recorder = new MediaRecorder(stream);
  recorder.ondataAvaliable = (e) => recordedChunks.push(e.data);
  recorder.start();
}

function stopRecording() {
  previewPlayer.srcObject.getTracks().forEach((track) => track.stop());
  recorder.stop();
}

function playRecording() {
  const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  recordingPlayer.src = URL.createObjectURL(recordedBlob);
  recordingPlayer.play();
  downloadButton.href = recordingPlayer.src;
  downloadButton.download = `recording_${new Date()}.webm`;
}

// event
recordButton.addEventListener("click", videoStart);
stopButton.addEventListener("click", stopRecording);
playButton.addEventListener("click", playRecording);
