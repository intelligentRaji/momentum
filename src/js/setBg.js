export default async function setBg() {
  const body = document.querySelector("body");
  let time = new Date();
  let timefase = ["night", "morning", "afternoon", "evening"];
  let quarter = Math.floor(time.getHours() / 6);
  const settings = JSON.parse(localStorage.getItem("RajiSettings"));
  let arr = [];
  if (localStorage.getItem("unsplashArr")) {
    arr = JSON.parse(localStorage.unsplashArr);
  }
  let cityArr = [];
  if (localStorage.getItem("unsplashCityArr")) {
    cityArr = JSON.parse(localStorage.unsplashCityArr);
  }
  let number = String(Math.floor(1 + Math.random() * (20 - 1))).padStart(
    2,
    "0"
  );
  let Unsplashnumber = Math.floor(Math.random() * arr.length);
  let UnsplashCityNumber = Math.floor(Math.random() * cityArr.length);
  let title;

  function setBg(settings) {
    const tag = getActiveTag(settings).toLowerCase();
    if (settings.PhotoSource.gitHub.Mode === "on") {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/intelligentRaji/stage1-tasks/assets/images/${timefase[quarter]}/${number}.jpg`;
      img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/intelligentRaji/stage1-tasks/assets/images/${timefase[quarter]}/${number}.jpg')`;
      };
    } else if (settings.PhotoSource.Unsplash.Mode === "on") {
      if (tag === "nature") {
        if (arr.length < 20) {
          getUnsplashUrl(tag);
        } else {
          loadUnsplashBg(tag);
        }
      } else if (tag === "city") {
        if (cityArr.length < 20) {
          getUnsplashUrl(tag);
        } else {
          loadUnsplashBg(tag);
        }
      }
      timeCheck(tag);
      setLocalStorage(tag);
    } else if (settings.PhotoSource.Flickr.Mode === "on") {
      getFlickrBg(tag);
    }
  }

  setBg(settings);

  async function getUnsplashUrl(tag) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timefase[quarter]},${tag}&client_id=PwfEKpizTrZ0GTTpCtQdGqIG0r19M5rO8VP8zqt_YcQ`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const img = data.urls.full;
    const time = new Date();
    const fakeImg = new Image();
    fakeImg.src = img;
    fakeImg.onload = () => {
      body.style.backgroundImage = `url(${img})`;
    };
    if (tag === "nature") {
      arr.push([time, img]);
    } else if (tag === "city") {
      cityArr.push([time, img]);
    }
  }

  function timeCheck() {
    const cacheTime = 2 * 60 * 60 * 1000;
    let curTime = new Date();
    for (let item of arr) {
      if (+curTime - Date.parse(item[0]) > cacheTime) {
        arr.shift();
      } else {
        break;
      }
    }
  }

  function loadUnsplashBg(tag) {
    const fakeImg = new Image();
    if (tag === "nature") {
      fakeImg.src = arr[Unsplashnumber][1];
      fakeImg.onload = () => {
        body.style.backgroundImage = `url(${arr[Unsplashnumber][1]})`;
      };
    } else if (tag === "city") {
      fakeImg.src = cityArr[UnsplashCityNumber][1];
      fakeImg.onload = () => {
        body.style.backgroundImage = `url(${cityArr[UnsplashCityNumber][1]})`;
      };
    }
  }

  function setLocalStorage(tag) {
    if (tag === "nature") {
      localStorage.unsplashArr = JSON.stringify(arr);
    } else if (tag === "city") {
      localStorage.unsplashCityArr = JSON.stringify(cityArr);
    }
  }

  function getActiveTag(settings) {
    if (settings.PhotoSource.gitHub.Mode === "on") {
      return "";
    }
    if (settings.PhotoSource.Unsplash.Mode === "on") {
      for (let item of settings.PhotoSource.Unsplash.Tags) {
        if (item.mode === "on") {
          return item.name;
        }
      }
    } else if (settings.PhotoSource.Flickr.Mode === "on") {
      for (let item of settings.PhotoSource.Flickr.Tags) {
        if (item.mode === "on") {
          return item.name;
        }
      }
    }
  }

  async function getFlickrBg(tag) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=${
      timefase[quarter]
    },${tag}&per_page=1&page=${getRandomNumber()}&extras=url_l&format=json&nojsoncallback=1&safe_search=1&tag_mode=all`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data || data.photos.photo[0].title === title) {
      getFlickrBg(tag);
    }
    title = data.photos.photo[0].title;
    const fakeImg = new Image();
    fakeImg.src = data.photos.photo[0].url_l;
    fakeImg.onload = () => {
      body.style.backgroundImage = `url(${data.photos.photo[0].url_l})`;
    };
  }

  function getRandomNumber() {
    const num = Math.floor(1 + Math.random() * (1000 - 1));
    return num;
  }
}
