console.log("Welcome to Spotify");
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
// new Audio('./songs/1.mp3'): Here, you're using the new keyword to create a new instance of the Audio object. This object represents an HTML <audio> element, which can be used to play audio files on a web page.
// audioElement.play();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
// The Array.from() method is used to create a new array from an iterable object. In this case, the iterable object is the collection of HTML elements returned by document.getElementsByClassName("songItem")
let masterSongsName = document.getElementById("masterSongsName");
let songs = [
  {
    songName: "Arabic Beats",
    filepath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Dream Sequences",
    filepath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Tumhari Kasam - Jhankar Beats",
    filepath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Rabba - Salam-E-Ishq",
    filepath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Oree Piya - Atif Aslam",
    filepath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Tere Bina - Salam-E-Ishq",
    filepath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Ekla Ghor - Rupam Islam",
    filepath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Choo Lo - Local Train",
    filepath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Bakhuda - Atif Aslam",
    filepath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Pal - Arijit Singh",
    filepath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songsName")[0].innerText = songs[i].songName;
});
// Handle Play or Pause using click event
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    masterPlay.classList.remove("fa-pause-circle");
    audioElement.pause();
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
// timeupdate is an event for time element as the song plays the time updates
audioElement.addEventListener("timeupdate", () => {
  // Updating the seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
// 100*(Current time/duration)=percentage
// So currentTime=(percentage*duration)/100
// Now the reason of doing this is that we can change the duration of the song according to the current position or time we set on the seekbar if we manually drag it
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongsName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  masterSongsName.innerText = songs[songIndex].songName;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  masterSongsName.innerText = songs[songIndex].songName;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
