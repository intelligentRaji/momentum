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
  time.textContent = "0:00";
  settings.append(time);

  trackname.classList.add("play-trackname");
  settings.before(trackname);

  buttons.classList.add("play-buttons");
  playUl.before(buttons);

  for (let i = 0; i < playList.length; i++) {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = playList[i].title;
    playArr.push(li);
    playUl.append(li);
  }

  let number = 0;

  audio.volume = 0.05;

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
  }

  function pauseAudio() {
    play.classList.remove("pause");
    audio.pause();
  }

  function audioNext() {
    number === playList.length - 1 ? (number = 0) : (number += 1);
    createAudio();
    playAudio();
    numCheck();
  }

  function timeCalc() {
    time.textContent = `${playList[number].duration}`;
    audio.addEventListener("timeupdate", () => {
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

  bar.addEventListener("input", () => {
    audio.pause();
    bar.style.background = `-webkit-linear-gradient(left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${bar.value}%,rgba(255,255,255,0.4) ${bar.value}%,rgba(255,255,255,0.4) 100%)`;
    audio.currentTime = (audio.duration / 100) * bar.value;
    play.classList.remove("pause");
    bar.addEventListener("change", () => {
      playAudio();
      timeCalc();
    });
  });

  play.addEventListener("click", () => {
    if (!play.classList.contains("pause")) {
      playAudio();
      numCheck();
      timeCalc();
    } else {
      pauseAudio();
    }
  });

  audio.addEventListener("ended", () => {
    audioNext();
    timeCalc();
  });

  prev.addEventListener("click", () => {
    number === 0 ? (number = playList.length - 1) : (number -= 1);
    createAudio();
    playAudio();
    numCheck();
    timeCalc();
  });

  next.addEventListener("click", () => {
    audioNext();
    timeCalc();
  });

  playArr.forEach((e) => {
    e.addEventListener("click", () => {
      number = playArr.indexOf(e);
      createAudio();
      playAudio();
      numCheck();
      timeCalc();
    });
  });
}
