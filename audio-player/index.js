const playPause = document.getElementById('audio');
const img = document.querySelector('img.player__image');
const totalTime = document.querySelector('.time__total');
const currentTime = document.querySelector('.time__current');
const prev = document.querySelector('.control__backward');
const next = document.querySelector('.control__forward');
const singer = document.querySelector('.singer');
const trackName = document.querySelector('.song');
const progress = document.querySelector('.progress__line');
const trackLine = document.querySelector('.progress');
const wrapper = document.querySelector('.wrapper');
const circle = document.querySelector('.progress__circle');
const loop = document.querySelector('.control__loop');
const sound = document.querySelector('.control__sound');
const soundPanel = document.querySelector('.sound__panel');
const soundLine = document.querySelector('.sound__line');
const volume = document.querySelector('.sound');
const song = new Audio();
let isPlaying = false;
let isLooping = false;
song.volume = 0.75;
let track = 0;
const playList = [{
    singer: "Øneheart",
    name: "this feeling",
    duration: "1:34",
    src: "./assets/audio/Øneheart.mp3",
    img: './assets/img/1.jpg',
  }, {
    singer: "analog mannequin",
    name: "milk cassette x.mp3",
    duration: "3:20",
    src: "./assets/audio/analog.mp3",
    img: './assets/img/a1.jpg',
  }, {
    singer: "Leadwave",
    name: "Memories",
    duration: "1:26",
    src: "./assets/audio/Leadwave.mp3",
    img: './assets/img/a2.jpg',
  }
];

let current = 0;
let playing = playList[track];
let coordVolume = 0;
let coordTrack = 0;
singer.innerText = playing.singer;
trackName.innerText = playing.name;
totalTime.innerText = playing.duration;

playPause.addEventListener('click', () => {
  if(!isPlaying) {
    playAudio();
  } else if(isPlaying) {
    pauseAudio();
  }
})

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

window.addEventListener('mousemove', (e) => {
  let windowWidth = document.documentElement.clientWidth;
  coordTrack = e.clientX - ((windowWidth - 267) / 2);
  coordVolume = e.clientX - ((windowWidth - 73) / 2);
})

trackLine.addEventListener('click', changeTime);
volume.addEventListener('click', changeVolume);

loop.addEventListener('click', () => {
  isLooping ? isLooping = false : isLooping = true;
  loop.classList.toggle('checked');
})

sound.addEventListener('click', ()=> {
  soundPanel.classList.toggle('hidden');
})

function nextSong () {
  pauseAudio();
    track += 1;
    if( track > playList.length - 1) {
      track = 0;
    }
    playing = playList[track];
    singer.innerText = playing.singer;
    trackName.innerText = playing.name;
    totalTime.innerText = playing.duration;
    img.setAttribute('src', playing.img);
  current = 0;
  currentTime.innerText = displayTime(0)
  playAudio();
}

function prevSong () {
  pauseAudio();
  track -= 1;
  if( track < 0) {
    track = playList.length - 1;
  }
  playing = playList[track];
  singer.innerText = playing.singer;
  trackName.innerText = playing.name;
  totalTime.innerText = playing.duration;
  img.setAttribute('src', playing.img);
  currentTime.innerText = displayTime(0)
  current = 0;
  playAudio();
}

function playAudio() {
  song.src = playing.src;
  song.currentTime = current;
  song.play();
  isPlaying = true;
  img.style.width = "120%";
  img.style.height = "120%";
  wrapper.classList.add('wrapper__back');
  playPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none"><path d="M29.1667 26.25V43.75M40.8333 26.25V43.75M61.25 35C61.25 38.4472 60.571 41.8606 59.2518 45.0454C57.9327 48.2302 55.9991 51.124 53.5616 53.5616C51.124 55.9991 48.2302 57.9327 45.0454 59.2518C41.8606 60.571 38.4472 61.25 35 61.25C31.5528 61.25 28.1394 60.571 24.9546 59.2518C21.7698 57.9327 18.876 55.9991 16.4384 53.5616C14.0009 51.124 12.0673 48.2302 10.7482 45.0454C9.42898 41.8606 8.75 38.4472 8.75 35C8.75 28.0381 11.5156 21.3613 16.4384 16.4384C21.3613 11.5156 28.0381 8.75 35 8.75C41.9619 8.75 48.6387 11.5156 53.5616 16.4384C58.4844 21.3613 61.25 28.0381 61.25 35Z" stroke="#E6E6E6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function pauseAudio() {
  song.pause();
  isPlaying = false;
  img.style.width = "100%";
  img.style.height = "100%";
  wrapper.classList.remove('wrapper__back');
  playPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none"><path d="M61.25 35C61.25 38.4472 60.571 41.8606 59.2518 45.0454C57.9327 48.2302 55.9991 51.124 53.5616 53.5616C51.124 55.9991 48.2302 57.9327 45.0454 59.2518C41.8606 60.571 38.4472 61.25 35 61.25C31.5528 61.25 28.1394 60.571 24.9546 59.2518C21.7698 57.9327 18.876 55.9991 16.4384 53.5616C14.0009 51.124 12.0673 48.2302 10.7482 45.0454C9.42898 41.8606 8.75 38.4472 8.75 35C8.75 28.0381 11.5156 21.3613 16.4384 16.4384C21.3613 11.5156 28.0381 8.75 35 8.75C41.9619 8.75 48.6387 11.5156 53.5616 16.4384C58.4844 21.3613 61.25 28.0381 61.25 35Z" stroke="#E6E6E6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M45.2468 34.1339C45.8954 34.5068 45.9198 35.4338 45.2917 35.8404L30.7101 45.2788C30.0448 45.7095 29.1667 45.2319 29.1667 44.4393L29.1667 26.6173C29.1667 25.8484 29.9985 25.3671 30.6652 25.7504L37.9167 29.9196L45.2468 34.1339Z" stroke="#E6E6E6" stroke-width="2.5"/></svg>'
}

function displayTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    let res = minutes + ":" + ((seconds < 10) ? '0'+seconds : seconds);
    return res;
}

function changeProgress() {
    let total = (+playing.duration[0] * 60) + (+playing.duration[2] * 10) + +playing.duration[3];
    let percent = (current / total) * 100;
    circle.style.left = `${percent}%`;
    progress.style.width = `${percent}%`;
}

function changeTime() {
  let total = (+playing.duration[0] * 60) + (+playing.duration[2] * 10) + +playing.duration[3];
  progress.style.width = `${coordTrack}px`;
  circle.style.left = `${coordTrack}px`;
  current = coordTrack * total / trackLine.clientWidth;
  song.currentTime = current;
  currentTime.innerText = displayTime(current);
}

function changeVolume() {
  let vol = (coordVolume - 78.5)* 0.75 * 2;
  song.volume = (vol / 100).toFixed(1);
  soundLine.style.width = `${vol}%`;
}

setInterval(() => {
  if(isPlaying && currentTime.innerText !== totalTime.innerText) {
    currentTime.innerText = displayTime(current);
    current += 1;
    changeProgress();
  } else if(isPlaying && currentTime.innerText === totalTime.innerText && !isLooping) {
    nextSong();
    currentTime.innerText = displayTime(0);
  } else if(isPlaying && currentTime.innerText === totalTime.innerText && isLooping){
    current = 0;
    currentTime.innerText = displayTime(0);
    playAudio();
  }
}, 1000);