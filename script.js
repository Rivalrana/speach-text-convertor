const resultDiv = document.getElementById("result");
const recordButton = document.getElementById("record-button");

let recognition = new webkitSpeechRecognition();
recognition.continuous = true;

let isRecording = false;

recordButton.addEventListener("click", () => {
  if (!isRecording) {
    recognition.start();
    isRecording = true;
    recordButton.classList.add("recording");
  } else {
    recognition.stop();
    isRecording = false;
    recordButton.classList.remove("recording");
  }
});

recognition.onresult = (event) => {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  if (transcript.toLowerCase().includes("stop recording")) {
    recognition.stop();
    isRecording = false;
    recordButton.classList.remove("recording");
    resultDiv.textContent = resultDiv.textContent.replace("stop recording", "");
    return;
  } else if (transcript.toLowerCase().includes("reset input")) {
    resultDiv.textContent = "";
    return;
  } else if (transcript.toLowerCase().includes("search on google")) {
    let query = resultDiv.textContent.replace("search on google", "");
    let searchUrl =
      "https://www.google.com/search?q=" + encodeURIComponent(query);
    window.open(searchUrl, "_blank");
    return;
  }
  resultDiv.textContent += " " + transcript;
};
