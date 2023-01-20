export default function getBg() {
  const next = document.querySelector(".slide-next");
  const prev = document.querySelector(".slide-prev");
  const body = document.querySelector("body");
  let time = new Date();
  let timefase = ["night", "morning", "afternoon", "evening"];
  let quarter = Math.floor(time.getHours() / 6);

  function getGitBg() {
    let number = String(Math.floor(1 + Math.random() * (20 - 1))).padStart(
      2,
      "0"
    );

    function setBg() {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/intelligentRaji/stage1-tasks/assets/images/${timefase[quarter]}/${number}.jpg`;
      img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/intelligentRaji/stage1-tasks/assets/images/${timefase[quarter]}/${number}.jpg')`;
      };
    }

    setBg();

    function getSlideNext() {
      if (number == 20) {
        number = "01";
      } else {
        number = String(+number + 1).padStart(2, "0");
      }
      setBg();
    }

    function getPrevSlide() {
      if (number == 1) {
        number = "20";
      } else {
        number = String(+number - 1).padStart(2, "0");
      }
      setBg();
    }

    next.addEventListener("click", getSlideNext);
    prev.addEventListener("click", getPrevSlide);
  }

  //! unsplash
  async function getUnsplashBg() {
    let arr = [];
    let number = Math.floor(Math.random() * arr.length);
    if (localStorage.getItem("unsplashArr")) {
      arr = JSON.parse(localStorage.unsplashArr);
    }

    function timeCheck() {
      const hourMilliseconds = 3600000;
      let curTime = new Date();
      for (let item of arr) {
        console.log(curTime);
        console.log(new Date(item[0]));
        console.log(curTime - new Date(item[0]));
        if (+curTime - Date.parse(item[0]) > hourMilliseconds) {
          arr.shift();
        } else {
          break;
        }
      }
    }

    function setLocalStorage() {
      localStorage.unsplashArr = JSON.stringify(arr);
    }

    function loadBg() {
      const fakeImg = new Image();
      fakeImg.src = arr[number][1];
      console.log(fakeImg.src);
      fakeImg.onload = () => {
        body.style.backgroundImage = `url(${arr[number][1]})`;
      };
    }

    async function nextUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]} nature&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
        const res = await fetch(url);
        const data = await res.json();
        const img = data.urls.regular;
        const time = new Date();
        body.style.backgroundImage = `url(${img})`;
        arr.push([time, img]);
      } else {
        if (number === arr.length - 1) {
          number = 0;
        } else {
          number += 1;
        }
        loadBg();
      }
      timeCheck();
    }

    async function prevUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]} nature&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
        const res = await fetch(url);
        const data = await res.json();
        const img = data.urls.regular;
        const time = new Date();
        body.style.backgroundImage = `url(${img})`;
        arr.shift([time, img]);
      } else {
        if (number === 0) {
          number = arr.length - 1;
        } else {
          number -= 1;
        }
        loadBg();
      }
      timeCheck();
    }

    window.addEventListener("beforeunload", setLocalStorage);

    async function setFirstUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]} nature&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
        const res = await fetch(url);
        const data = await res.json();
        const img = data.urls.regular;
        const time = new Date();
        body.style.backgroundImage = `url(${img})`;
        arr.push([time, img]);
      } else {
        loadBg();
      }
      timeCheck();
    }

    next.addEventListener("click", nextUnsplashBg);
    prev.addEventListener("click", prevUnsplashBg);

    setFirstUnsplashBg();
  }

  //getGitBg();
  getUnsplashBg();
}
