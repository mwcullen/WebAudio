var record = document.getElementById('record');
var stop = document.getElementById('stop');
var audio = document.getElementById('audio');
var result = document.getElementById('result');

stop.disabled = true;

var handleSuccess = function(stream) {
    console.log('getUserMedia supported.');

    var recordedChunks = [];
    var transcript_final = '';
    var mediaRecorder = new MediaRecorder(stream);
    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    record.onclick = function() {
        transcript_final = '';
        mediaRecorder.start();
        recognition.start();

        console.log(mediaRecorder.state);
        console.log("recorder started");

        stop.disabled = false;
        record.disabled = true;
    }

    stop.onclick = function() {
        mediaRecorder.stop();
        recognition.stop();

        console.log(mediaRecorder.state);
        console.log("recorder stopped");

        stop.disabled = true;
        record.disabled = false;
    }

    recognition.onresult = function(e) {
      var transcript_interim = '';

      for(var i = e.resultIndex; i < e.results.length; ++i){
        if(event.results[i].isFinal){
          transcript_final += event.results[i][0].transcript;
        }
        else {
          transcript_interim+= event.results[i][0].transcript;
        }
      }
      result.innerHTML = transcript_interim;
    }

    recognition.onend = function(e){
      result.innerHTML = transcript_final;
    }

    mediaRecorder.onstop = function(e) {
        console.log("data available after MediaRecorder.stop() called.");

        var blob = new Blob(recordedChunks, {'type':'audio/ogg; codecs=opus'})
        recordedChunks = [];
        var audioURL = window.URL.createObjectURL(blob);

        audio.src = audioURL;


        console.log("recorder stopped");
    }

    mediaRecorder.ondataavailable = function(e) {
        recordedChunks.push(e.data);
    }

};

if(!('webkitSpeechRecognition' in window)){
  alert("Why aren't you using a compatible browser?");
}
else{
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
}).then(handleSuccess);
}
