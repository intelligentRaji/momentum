export default async function player() {
  const audio = new Audio();
  const playList = await getPlaylist();
  const play = document.querySelector(".play");
  const prev = document.querySelector(".play-prev");
  const next = document.querySelector(".play-next");
  const playUl = document.querySelector(".play-list");
  const playArr = [];

  for (let i = 0; i < playList.length; i++) {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = playList[i].title;
    playArr.push(li);
    playUl.append(li);
  }

  let number = 0;

  audio.volume = 0.05;

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

  play.addEventListener("click", () => {
    if (!play.classList.contains("pause")) {
      playAudio();
      numCheck();
    } else {
      pauseAudio();
    }
  });

  audio.addEventListener("ended", audioNext);

  prev.addEventListener("click", () => {
    number === 0 ? (number = playList.length - 1) : (number -= 1);
    createAudio();
    playAudio();
    numCheck();
  });

  next.addEventListener("click", audioNext);

  playArr.forEach((e) => {
    e.addEventListener("click", () => {
      number = playArr.indexOf(e);
      createAudio();
      playAudio();
      numCheck();
    });
  });
}
