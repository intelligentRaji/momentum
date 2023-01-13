export default async function getWeather() {
  const weatherIcon = document.querySelector(".weather-icon");
  const weatherCont = document.querySelector(".description-container");
  const wind = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const weatherInput = document.querySelector(".city");
  weatherInput.value = "Minsk";
  weatherInput.value = localStorage.getItem("city");

  async function donwloadWeather() {
    let url =
      "https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=en&appid=824cddaac888e6d118ebadaa2e0e5598&units=metric";
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }

  let data = await donwloadWeather();

  function compareWeather() {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherCont.firstElementChild.textContent = `${Math.round(
      data.main.temp
    )}°C`;
    weatherCont.lastElementChild.textContent = `${data.weather[0].description}`;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }

  loadingWeather();

  async function changeWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&lang=en&appid=824cddaac888e6d118ebadaa2e0e5598&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }

  function loadingWeather() {
    donwloadWeather();
    compareWeather();
  }

  weatherInput.addEventListener("change", async function () {
    weatherIcon.className = "weather-icon owf";
    localStorage.setItem("city", weatherInput.value);
    data = await changeWeather();
    compareWeather();
  });
}
