import { hideSetction } from "./utils.js";
import i18n from "i18next";

export default async function setWeather() {
  const weather = document.querySelector(".weather");
  const weatherIcon = document.querySelector(".weather-icon");
  const weatherCont = document.querySelector(".description-container");
  const wind = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const weatherInput = document.querySelector(".city");
  const weatherError = document.querySelector(".weather-error");
  hideSetction(weather);
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
      wind.textContent = `${i18n.t("wind")} ${Math.round(
        data.wind.speed
      )} ${i18n.t("ms")}`;
      humidity.textContent = `${i18n.t("humidity")} ${data.main.humidity}%`;
      weatherError.textContent = "";
    } catch (err) {
      weatherClear();
      weatherError.textContent = `ERROR: city not found for ${weatherInput.value}!`;
    }
  }

  loadingWeather();

  async function changeWeather() {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${
        weatherInput.value
      }&lang=${i18n.language.slice(
        0,
        2
      )}&appid=824cddaac888e6d118ebadaa2e0e5598&units=metric`;
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
}
