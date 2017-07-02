console.log("canary")

// Modern way of retrieving permissions to access audio device
media_device_constraints = {
    audio: true, // Only want audio
    video: false,
}
chunks = []
transcript_interim = ""
transcript_final = ""

// -----------------------------------------------------------------------------
// Configure media device
// -----------------------------------------------------------------------------
var media_recorder = null
var speech_recognition = null


function speech_recognition_on_start(event) {
    transcript_final = ""
}

function speech_recognition_on_result(event) {
    console.log("Speech recognition has result.")
    transcript_interim = ""

    for (var index = event.resultIndex; index < event.results.length; index++) {
        if (event.results[index].isFinal) {
            transcript_final += event.results[index][0].transcript
        } else {
            transcript_interim += event.results[index][0].transcript
        }
    }
    user_speech_recognition_output_element.innerHTML = transcript_interim
}

function speech_recognition_on_end(event) {
    // console.log("Speech recognition has finished.")
    user_speech_recognition_output_element.innerHTML = transcript_final
}

function media_device_request_on_success(media_device_stream) {
    media_recorder = new MediaRecorder(media_device_stream)
    media_recorder.onstop = media_recorder_on_stop
    media_recorder.ondataavailable = media_recorder_on_data_available

    speech_recognition = new webkitSpeechRecognition()
    speech_recognition.onstart = speech_recognition_on_start
    speech_recognition.onresult = speech_recognition_on_result
    speech_recognition.onend = speech_recognition_on_end
    speech_recognition.continuous = true
    speech_recognition.interimResults = true
    speech_recognition.lang = "ja"

    // speech_recognition.lang = "en-US"
}

function media_device_request_on_error(error) {
    error_output = "Brooooo there was an error. Error: " + error
    console.log(error_output)
}

if (!("webkitSpeechRecognition" in window)) {
    alert("Why are you not using a compatible browser?")
} else {
    navigator.mediaDevices.getUserMedia(media_device_constraints)
        .then(media_device_request_on_success)
        .catch(media_device_request_on_error)
}

// -----------------------------------------------------------------------------
// Media Recorder Logic
// -----------------------------------------------------------------------------
function media_recorder_on_stop(event) {
    // Chunks should be filled by ondataavailable call
    var blob = new Blob(chunks, {
        "type": "audio/ogg codecs=opus",
    })

    // Clears stream output for next recording
    chunks = []

    // Creates reference resource to retrieve audio playback
    var new_audio_url = window.URL.createObjectURL(blob)
    user_recorded_audio_element.src = new_audio_url
    user_recorded_audio_display_wave_surfer.load(user_recorded_audio_element.src)

    // console.log(user_recorded_audio_element.src)
    // console.log("recorder stopped")
}

function media_recorder_on_data_available(event) {
    // Triggered by media_recorder.requestData event, event.data contains blob
    chunks.push(event.data)
}

// -----------------------------------------------------------------------------
// Page Component Logic
// -----------------------------------------------------------------------------
var native_recording_audio_element = document.querySelector(".native-area .clip .recording")
var native_recording_play_button = document.querySelector(".native-area .buttons .play.button")
var native_recording_record_button = document.querySelector(".native-area .buttons .record.button")
var native_recording_stop_button = document.querySelector(".native-area .buttons .stop.button")
var native_audio_display_wave_surfer = WaveSurfer.create({
    container: ".native-area .display",
    progressColor: "purple",
    waveColor: "red",
})
native_audio_display_wave_surfer.load("/static/recording_test/audio/kekko.wav")
native_recording_play_button.onclick = function() {
    native_audio_display_wave_surfer.playPause()
}

var user_recorded_audio_element = document.querySelector(".user-area .clip .recording")
var user_speech_recognition_output_element = document.querySelector(".user-area .clip .speech-recognition .display .body")
var user_play_button = document.querySelector(".user-area .buttons .play.button")
var user_record_button = document.querySelector(".user-area .buttons .record.button")
var user_stop_button = document.querySelector(".user-area .buttons .stop.button")
var user_recorded_audio_display_wave_surfer = WaveSurfer.create({
    container: ".user-area .display",
    progressColor: "purple",
    waveColor: "red",
})

// --------------------
// Play Button
// --------------------
function user_play_button_on_click() {
    // user_recorded_audio_element.play()
    user_recorded_audio_display_wave_surfer.playPause()
        // console.log(media_recorder.state)
        // console.log("audio clip start play")
}
user_play_button.onclick = user_play_button_on_click

// --------------------
// Record Button
// --------------------
function user_record_button_on_click() {
    media_recorder.start()
    speech_recognition.start()

    user_stop_button.disabled = false

    user_record_button.disabled = true
    user_record_button.style.background = "red"

    // console.log(media_recorder.state)
    // console.log("recorder started")
}
user_record_button.onclick = user_record_button_on_click

// --------------------
// Stop Button
// --------------------
function user_stop_button_on_click() {
    // Has to be called before the stop command, raises the ondataavailable event
    media_recorder.requestData()
    media_recorder.stop()
    speech_recognition.stop()

    user_stop_button.disabled = true

    user_record_button.disabled = false
    user_record_button.style.background = ""
    user_record_button.style.color = ""

    // console.log(media_recorder.state)
    // console.log("stop button clicked")
}
user_stop_button.onclick = user_stop_button_on_click

// -----------------------------------------------------------------------------
// Recording Logic
// -----------------------------------------------------------------------------
// TODO
