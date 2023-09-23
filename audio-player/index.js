const playPause = document.getElementById('audio');
const img = document.querySelector('img.player__image');
const totalTime = document.querySelector('.time__total');
const currentTime = document.querySelector('.time__current');
const prev = document.querySelector('.control__backward');
const next = document.querySelector('.control__forward');
const song = new Audio();
let isPlaying = false;
let track = 0;
const playList = [{
    singer: "Muse",
    name: "Supermassive Black Hole",
    duration: "3:29",
    src: "./assets/audio/Muse.mp3",
  }, {
    singer: "Paramore",
    name: "Decode",
    duration: "4:22",
    src: "./assets/audio/Paramore.mp3",
  }
];
let playing = playList[track];

console.log(next)

playPause.addEventListener('click', () => {
  if(!isPlaying) {
    playAudio();
  } else if(isPlaying) {
    pauseAudio();
  }
})

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

function nextSong () {
  pauseAudio();
  track += 1;
  if( track > playList.length - 1) {
    track = 0;
  }
  playing = playList[track];
  playAudio();
}

function prevSong () {
  pauseAudio();
  track -= 1;
  if( track < 0) {
    track = playList.length - 1;
  }
  playing = playList[track];
  playAudio();
}

function playAudio() {
  song.src = playing.src;
  song.currentTime = 0;
  song.play();
  isPlaying = true;
  img.style.width = "150%";
  img.style.height = "150%";
}

function pauseAudio() {
  song.pause();
  isPlaying = false;
  img.style.width = "100%";
  img.style.height = "100%";
}