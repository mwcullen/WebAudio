var record = document.getElementById('record');
var stop = document.getElementById('stop');
var audio = document.getElementById('audio');

stop.disabled = true;

var handleSuccess = function(stream) {
    console.log('getUserMedia supported.');

    var recordedChunks = [];
    var mediaRecorder = new MediaRecorder(stream);

    record.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");

        stop.disabled = false;
        record.disabled = true;
    }

    stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");

        stop.disabled = true;
        record.disabled = false;
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

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
}).then(handleSuccess);
