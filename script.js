// Selecting elements from the DOM
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

// Track and player state variables
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Music list array with track details
const music_list = [
  {
    img: "Images/bg.jpg",
    name: "Hothon de chhu lo tum",
    artist: "Jagjit Singh",
    music: "songs/Hothon Se Chhu Lo Tum.mp3"
  },{
    img: "Images/dil me ho tum.jpg",
    name: "SAB TERA.mp3",
    artist: "Armaan Malik and Shraddha Kapoor",
    music: "songs/SAB TERA.mp3"
  },{
    img: "Images/bg.jpg",
    name: "Dil main ho tum.mp3",
    artist: "Arman Malik, Bappi Lahiri and Rochak kohli",
    music: "songs/Dil main ho tum.mp3"
  },{
    img: "Images/bg.jpg",
    name: "Humnava.mp3",
    artist: "Jubin Nautiyal",
    music: "songs/Humnava.mp3"
  },{
    img: "Images/bg.jpg",
    name: "Tera yaar hoon main.mp3",
    artist: "Arijit Singh",
    music: "songs/Tera yaar hoon main.mp3"
  }
];


// Load the first track
loadTrack(track_index);

// Function to load a track
function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";

  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  now_playing.textContent = "Playing music  " + (track_index + 1) + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

// Function to reset track details
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Function to toggle random play
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

// Function to enable random play
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

// Function to disable random play
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

// Function to repeat the current track
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

// Function to toggle play/pause
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

// Function to play the current track
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// Function to pause the current track
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// Function to play the next track
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Math.floor(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

// Function to play the previous track
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

// Function to seek to a position in the track
function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

// Function to set the volume
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// Function to update the seek slider and track time
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);

    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}