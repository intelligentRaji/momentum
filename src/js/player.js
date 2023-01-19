import urlvolume from "../assets/svg/volume.svg";
import urlvolumeoff from "../assets/svg/volume-off.svg";
import urlOrder from "../assets/svg/order.svg";
import urlRepeat from "../assets/svg/repeat.svg";
import urlRandom from "../assets/svg/random.svg";

export default async function player() {
  const audio = new Audio();
  const playList = await getPlaylist();
  const play = document.querySelector(".play");
  const prev = document.querySelector(".play-prev");
  const next = document.querySelector(".play-next");
  const playUl = document.querySelector(".play-list");
  const playArr = [];
  const bar = document.createElement("input");
  const settings = document.createElement("div");
  const time = document.createElement("p");
  const curtime = document.createElement("p");
  const trackname = document.createElement("p");
  const buttons = document.createElement("div");
  const volumeContainer = document.createElement("div");
  const volume = document.createElement("img");
  const volumeBar = document.createElement("input");
  const change = document.createElement("img");
  const urls = [urlOrder, urlRepeat, urlRandom];
  let tracksMemory = null;
  let firstTime = true;

  settings.classList.add("play-settings");
  playUl.before(settings);

  curtime.classList.add("play-time");
  curtime.textContent = "0:00";
  settings.append(curtime);

  bar.classList.add("play-bar");
  bar.type = "range";
  bar.min = "0";
  bar.max = "100";
  bar.value = "0";
  bar.step = "1";
  settings.append(bar);

  time.classList.add("play-time");
  time.textContent = "00:00";
  settings.append(time);

  trackname.classList.add("play-trackname");
  settings.before(trackname);

  buttons.classList.add("play-buttons");
  playUl.before(buttons);

  volumeContainer.classList.add("play-volumecontainer");
  buttons.append(volumeContainer);

  volume.classList.add("play-volume");
  volume.src = urlvolume;
  volumeContainer.append(volume);

  volumeBar.classList.add("volume-bar");
  volumeBar.type = "range";
  volumeBar.min = "0";
  volumeBar.max = "100";
  volumeBar.value = "0";
  volumeBar.step = "1";
  volumeContainer.append(volumeBar);

  let changeNumber = 0;

  change.classList.add("play-change");
  change.src = urls[changeNumber];
  buttons.append(change);

  for (let i = 0; i < playList.length; i++) {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = playList[i].title;
    playArr.push(li);
    playUl.append(li);
  }

  let number = 0;
  let memoryNumber = 0;

  function setVolume() {
    if (!localStorage.getItem("volume") === null) {
      volumeBar.value = 5;
      audio.volume = volumeBar.value / 100;
    } else {
      volumeBar.value = localStorage.getItem("volume");
      audio.volume = volumeBar.value / 100;
    }
    volumeBar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${volumeBar.value}%,rgba(255,255,255,0.4) ${volumeBar.value}%,rgba(255,255,255,0.4) 100%)`;
    if (volumeBar.value == 0) {
      volume.src = urlvolumeoff;
    } else {
      volume.src = urlvolume;
    }
  }

  setVolume();

  trackname.textContent = playList[number].title;

  async function getPlaylist() {
    const res = await fetch("./music.json");
    let data = await res.json();
    return data;
  }

  function createAudio() {
    audio.src = playList[number].src;
    audio.currentTime = 0;
  }

  createAudio();

  function randomTrackReverse() {
    number = Math.floor(Math.random() * playList.length);
    number == memoryNumber ? randomTrackReverse() : (memoryNumber = number);
  }

  function randomTrack() {
    tracksMemory.push(number);
    number = Math.floor(Math.random() * playList.length);
    number == memoryNumber ? randomTrack() : (memoryNumber = number);
  }

  function numCheck() {
    playArr.forEach((e) => {
      if (playArr.indexOf(e) === number) {
        e.classList.add("active");
      } else {
        e.classList.remove("active");
      }
    });
  }

  function playAudio() {
    play.classList.add("pause");
    audio.play();
    trackname.textContent = `${playList[number].title}`;
    firstTime = false;
  }

  function pauseAudio() {
    play.classList.remove("pause");
    audio.pause();
  }

  function audioNext() {
    if (change.src == urlOrder) {
      number === playList.length - 1 ? (number = 0) : (number += 1);
    } else if (change.src == urlRandom) {
      randomTrack();
    }
    createAudio();
    playAudio();
    numCheck();
  }

  function timeCalc() {
    audio.addEventListener("timeupdate", () => {
      if (isNaN(audio.duration)) {
        return;
      }
      bar.value = (audio.currentTime * 100) / audio.duration;
      bar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${bar.value}%,rgba(255,255,255,0.4) ${bar.value}%,rgba(255,255,255,0.4) 100%)`;
      let minutes = parseInt(audio.currentTime / 60);
      let seconds = String(parseInt(audio.currentTime - minutes * 60)).padStart(
        2,
        "0"
      );
      curtime.textContent = `${minutes}:${seconds}`;
      console.log(audio.duration);
    });
  }

  timeCalc();

  bar.addEventListener("input", () => {
    audio.pause();
    time.textContent = `${playList[number].duration}`;
    bar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${bar.value}%,rgba(255,255,255,0.4) ${bar.value}%,rgba(255,255,255,0.4) 100%)`;
    audio.currentTime = (audio.duration / 100) * bar.value;
    play.classList.remove("pause");
    bar.addEventListener("change", () => {
      playAudio();
    });
  });

  play.addEventListener("click", () => {
    if (!play.classList.contains("pause")) {
      if (change.src == urlRandom) {
        if (firstTime == true) {
          tracksMemory.push(number);
          number = Math.floor(Math.random() * playList.length);
          audio.src = playList[number].src;
          audio.currentTime = 0;
        }
      }
      time.textContent = `${playList[number].duration}`;
      playAudio();
      numCheck();
    } else {
      pauseAudio();
    }
  });

  audio.addEventListener("ended", () => {
    audioNext();
    time.textContent = `${playList[number].duration}`;
  });

  prev.addEventListener("click", () => {
    if (change.src == urlOrder) {
      if (audio.currentTime > 3.5) {
        number = number;
      } else {
        number === 0 ? (number = playList.length - 1) : (number -= 1);
      }
    } else if (change.src == urlRandom) {
      if (audio.currentTime > 3.5) {
        number = number;
      } else {
        if (tracksMemory.length == 0) {
          randomTrackReverse();
        } else {
          number = tracksMemory.pop();
        }
      }
    }
    time.textContent = `${playList[number].duration}`;
    createAudio();
    playAudio();
    numCheck();
  });

  next.addEventListener("click", () => {
    audioNext();
    time.textContent = `${playList[number].duration}`;
  });

  playArr.forEach((e) => {
    e.addEventListener("click", () => {
      number = playArr.indexOf(e);
      time.textContent = `${playList[number].duration}`;
      createAudio();
      playAudio();
      numCheck();
    });
  });

  change.addEventListener("click", () => {
    if (changeNumber == 2) {
      changeNumber = 0;
    } else {
      changeNumber += 1;
    }
    change.src = urls[changeNumber];
    if (change.src == urlRepeat) {
      audio.loop = true;
    } else {
      audio.loop = false;
    }
    if (change.src == urlRandom) {
      tracksMemory = [];
    } else {
      tracksMemory = null;
    }
  });

  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
    volumeBar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${volumeBar.value}%,rgba(255,255,255,0.4) ${volumeBar.value}%,rgba(255,255,255,0.4) 100%)`;
    localStorage.setItem("volume", volumeBar.value);
  });

  audio.addEventListener("volumechange", () => {
    if (volumeBar.value == 0) {
      volume.src = urlvolumeoff;
    } else {
      volume.src = urlvolume;
    }
  });

  volume.addEventListener("click", () => {
    if (volumeBar.value != 0) {
      volumeBar.value = 0;
      audio.volume = volumeBar.value / 100;
      volumeBar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${volumeBar.value}%,rgba(255,255,255,0.4) ${volumeBar.value}%,rgba(255,255,255,0.4) 100%)`;
    } else {
      volumeBar.value = localStorage.getItem("volume");
      audio.volume = volumeBar.value / 100;
      volumeBar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${volumeBar.value}%,rgba(255,255,255,0.4) ${volumeBar.value}%,rgba(255,255,255,0.4) 100%)`;
    }
  });
}
