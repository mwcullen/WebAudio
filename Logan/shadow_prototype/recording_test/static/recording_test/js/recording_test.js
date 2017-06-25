console.log("canary")

// Modern way of retrieving permissions to access audio device
media_device_constraints = {
    audio: true, // Only want audio
    video: false,
}
chunks = []

// -----------------------------------------------------------------------------
// Configure media device
// -----------------------------------------------------------------------------
var media_recorder = null

function on_media_device_request_success(media_device_stream) {
    console.log("Oh man, I can't believe they allowed this!")
    media_recorder = new MediaRecorder(media_device_stream)
    media_recorder.onstop = on_media_recorder_stop
    media_recorder.ondataavailable = on_media_recorder_data_available
}

function on_media_device_request_error(error) {
    error_output = "Brooooo there was an error. Error: " + error
    console.log(error_output)
}

navigator.mediaDevices.getUserMedia(media_device_constraints)
    .then(on_media_device_request_success)
    .catch(on_media_device_request_error)

// -----------------------------------------------------------------------------
// Media Recorder Logic
// -----------------------------------------------------------------------------
function on_media_recorder_stop(event) {
    // Chunks should be filled by ondataavailable call
    var blob = new Blob(chunks, {
        'type': 'audio/ogg codecs=opus',
    })

    // Clears stream output for next recording
    chunks = []

    // Creates reference resource to retrieve audio playback
    var new_audio_url = window.URL.createObjectURL(blob)
    user_recorded_audio_element.src = new_audio_url

    console.log("recorder stopped")
}

function on_media_recorder_data_available(event) {
    // Triggered by media_recorder.requestData event, event.data contains blob
    chunks.push(event.data)
}

// -----------------------------------------------------------------------------
// Page Component Logic
// -----------------------------------------------------------------------------
var native_recording_audio_element = document.querySelector(".native-area .clip .recording")
    // var user_play_button = document.querySelector(".user-area .buttons .play.button")
    // var user_record_button = document.querySelector(".user-area .buttons .record.button")
    // var user_stop_button = document.querySelector(".user-area .buttons .stop.button")

var user_recorded_audio_element = document.querySelector(".user-area .clip .recording")
var user_play_button = document.querySelector(".user-area .buttons .play.button")
var user_record_button = document.querySelector(".user-area .buttons .record.button")
var user_stop_button = document.querySelector(".user-area .buttons .stop.button")

// --------------------
// Play Button
// --------------------
function on_user_play_button_click() {
    user_recorded_audio_element.play()
    console.log(media_recorder.state)
    console.log("audio clip start play")
}
user_play_button.onclick = on_user_play_button_click

// --------------------
// Record Button
// --------------------
function on_user_record_button_click() {
    media_recorder.start()
    console.log(media_recorder.state)
    console.log("recorder started")

    user_stop_button.disabled = false

    user_record_button.disabled = true
    user_record_button.style.background = "red"
}
user_record_button.onclick = on_user_record_button_click

// --------------------
// Stop Button
// --------------------
function on_user_stop_button_click() {
    // Has to be called before the stop command, raises the ondataavailable event
    media_recorder.requestData()
    media_recorder.stop()

    user_stop_button.disabled = true

    user_record_button.disabled = false
    user_record_button.style.background = ""
    user_record_button.style.color = ""

    console.log(media_recorder.state)
    console.log("stop button clicked")
}
user_stop_button.onclick = on_user_stop_button_click

// -----------------------------------------------------------------------------
// Recording Logic
// -----------------------------------------------------------------------------
// TODO
