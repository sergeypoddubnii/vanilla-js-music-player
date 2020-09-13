import "./styles.css";

const musicContainer = document.querySelector("#music-container");
//btn
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");

const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

const songs = ["okean", "breathe"];

let songsIndex = 0;

loadSong(songs[songsIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./img/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  songsIndex--;
  if (songsIndex < 0) {
    songsIndex = songs.length - 1;
  }
  loadSong(songs[songsIndex]);
  playSong();
}

function nextSong() {
  songsIndex++;
  if (songsIndex > songs.length - 1) {
    songsIndex = 0;
  }
  loadSong(songs[songsIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPersent = (currentTime / duration) * 100;
  progress.style.width = `${progressPersent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const songDuration = audio.duration;
  audio.currentTime = (clickX / width) * songDuration;
}

//events listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);
