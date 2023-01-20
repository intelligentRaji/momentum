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
      const cacheTime = 60 * 60 * 2000;
      let curTime = new Date();
      for (let item of arr) {
        if (+curTime - Date.parse(item[0]) > cacheTime) {
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
        const fakeImg = new Image();
        fakeImg.src = img;
        fakeImg.onload = () => {
          body.style.backgroundImage = `url(${img})`;
        };
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
      setLocalStorage();
    }

    async function prevUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]} nature&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
        const res = await fetch(url);
        const data = await res.json();
        const img = data.urls.regular;
        const time = new Date();
        const fakeImg = new Image();
        fakeImg.src = img;
        console.log(fakeImg.src);
        fakeImg.onload = () => {
          body.style.backgroundImage = `url(${img})`;
        };
        arr.push([time, img]);
      } else {
        if (number === 0) {
          number = arr.length - 1;
        } else {
          number -= 1;
        }
        loadBg();
      }
      timeCheck();
      setLocalStorage();
    }

    window.addEventListener("beforeunload", setLocalStorage);

    async function setFirstUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]} nature&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
        const res = await fetch(url);
        const data = await res.json();
        const img = data.urls.regular;
        const time = new Date();
        const fakeImg = new Image();
        fakeImg.src = img;
        fakeImg.onload = () => {
          body.style.backgroundImage = `url(${img})`;
        };
        arr.push([time, img]);
        console.log(arr.length);
      } else {
        loadBg();
      }
      timeCheck();
      setLocalStorage();
    }

    next.addEventListener("click", nextUnsplashBg);
    prev.addEventListener("click", prevUnsplashBg);

    setFirstUnsplashBg();
  }

  //!flickr
  async function getFlickrBg() {
    let arr = [];
    let number = Math.floor(Math.random() * arr.length);
    if (localStorage.getItem("unsplashArr")) {
      arr = JSON.parse(localStorage.unsplashArr);
    }

    function timeCheck() {
      const cacheTime = 60 * 60 * 2000;
      let curTime = new Date();
      for (let item of arr) {
        if (+curTime - Date.parse(item[0]) > cacheTime) {
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
        const fakeImg = new Image();
        fakeImg.src = img;
        console.log(fakeImg.src);
        fakeImg.onload = () => {
          body.style.backgroundImage = `url(${img})`;
        };
        arr.push([time, img]);
        console.log(arr.length);
      } else {
        if (number === arr.length - 1) {
          number = 0;
        } else {
          number += 1;
        }
        loadBg();
      }
      timeCheck();
      setLocalStorage();
    }

    async function prevUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]} nature&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
        const res = await fetch(url);
        const data = await res.json();
        const img = data.urls.regular;
        const time = new Date();
        const fakeImg = new Image();
        fakeImg.src = img;
        console.log(fakeImg.src);
        fakeImg.onload = () => {
          body.style.backgroundImage = `url(${img})`;
        };
        arr.push([time, img]);
        console.log(arr.length);
      } else {
        if (number === 0) {
          number = arr.length - 1;
        } else {
          number -= 1;
        }
        loadBg();
      }
      timeCheck();
      setLocalStorage();
    }

    window.addEventListener("beforeunload", setLocalStorage);

    async function setFirstUnsplashBg() {
      if (arr.length < 20) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=nature&extras=url_l&format=json&nojsoncallback=1`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const img = data.urls.regular;
        const time = new Date();
        const fakeImg = new Image();
        fakeImg.src = img;
        fakeImg.onload = () => {
          body.style.backgroundImage = `url(${img})`;
        };
        arr.push([time, img]);
        console.log(arr.length);
      } else {
        loadBg();
      }
      timeCheck();
      setLocalStorage();
    }

    next.addEventListener("click", nextUnsplashBg);
    prev.addEventListener("click", prevUnsplashBg);

    setFirstUnsplashBg();
  }

  //getGitBg();
  getUnsplashBg();
  //getFlickrBg();
}
