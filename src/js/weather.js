import { hideSetction } from "./utils.js";
import i18n from "i18next";

export default async function getWeather() {
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
      weatherError.textContent = "";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherCont.firstElementChild.textContent = `${Math.round(
        data.main.temp
      )}°C`;
      weatherCont.lastElementChild.textContent = `${data.weather[0].description}`;
      if (i18n.isInitialized) {
        wind.textContent = `${i18n.t("wind")} ${Math.round(
          data.wind.speed
        )} ${i18n.t("ms")}`;
      } else {
        i18n.on("loaded", () => {
          wind.textContent = `${i18n.t("wind")} ${Math.round(
            data.wind.speed
          )} ${i18n.t("ms")}`;
        });
      }
      if (i18n.isInitialized) {
        humidity.textContent = `${i18n.t("humidity")} ${data.main.humidity}%`;
      } else {
        i18n.on("loaded", () => {
          humidity.textContent = `${i18n.t("humidity")} ${data.main.humidity}%`;
        });
      }
    } catch (err) {
      weatherClear();
      if (i18n.isInitialized) {
        weatherError.textContent = i18n.t("WeatherCityError", {
          city: weatherInput.value,
        });
      } else {
        i18n.on("loaded", () => {
          weatherError.textContent = i18n.t("WeatherCityError", {
            city: weatherInput.value,
          });
        });
      }
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
      if (i18n.isInitialized) {
        weatherError.textContent = i18n.t("WeatherLoadError");
      } else {
        i18n.on("loaded", () => {
          weatherError.textContent = i18n.t("WeatherLoadError");
        });
      }
    }
  }

  function loadingWeather() {
    compareWeather();
  }

  weatherInput.addEventListener("change", async function () {
    weatherIcon.className = "weather-icon owf";
    localStorage.setItem("city", weatherInput.value);
    data = await changeWeather();
    compareWeather();
  });
}
