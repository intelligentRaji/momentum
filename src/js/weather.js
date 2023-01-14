export default async function getWeather() {
  const weatherIcon = document.querySelector(".weather-icon");
  const weatherCont = document.querySelector(".description-container");
  const wind = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const weatherInput = document.querySelector(".city");
  const weatherError = document.querySelector(".weather-error");
  if (localStorage.getItem("city") !== null) {
    weatherInput.value = localStorage.getItem("city");
  } else {
    weatherInput.value = "Minsk";
  }

  let data = await changeWeather();

  function weatherClear() {
    weatherCont.firstElementChild.textContent = "";
    weatherCont.lastElementChild.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }

  function compareWeather() {
    try {
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherCont.firstElementChild.textContent = `${Math.round(
        data.main.temp
      )}°C`;
      weatherCont.lastElementChild.textContent = `${data.weather[0].description}`;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherError.textContent = "";
    } catch (err) {
      weatherClear();
      weatherError.textContent = `ERROR: city not found for ${weatherInput.value}!`;
    }
  }

  loadingWeather();
  console.log(weatherInput.value);

  async function changeWeather() {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&lang=en&appid=824cddaac888e6d118ebadaa2e0e5598&units=metric`;
      let res = await fetch(url);
      let data = await res.json();
      weatherError.textContent = "";
      return data;
    } catch (err) {
      weatherClear();
      weatherError.textContent = "ERROR: weather didn't load";
    }
  }

  function loadingWeather() {
    changeWeather();
    compareWeather();
  }

  weatherInput.addEventListener("change", async function () {
    weatherIcon.className = "weather-icon owf";
    localStorage.setItem("city", weatherInput.value);
    console.log(weatherInput.value);
    data = await changeWeather();
    compareWeather();
  });
}
