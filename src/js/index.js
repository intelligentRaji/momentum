import "../css/owfont-regular.css";
import "../css/style.css";
import { showTime } from "./time.js";
import setLocalStorage from "./name.js";
import getBg from "./bg.js";
import getWeather from "./weather.js";
import loadQuote from "./quotes.js";
import player from "./player.js";
import Todo from "./Todo/Todo.js";
import Settings from "./Static/static.js";
import setSettingsList from "./settingsList.js";
import i18n from "i18next";
import Backend from "i18next-http-backend";

let lang;
const settings = JSON.parse(localStorage.getItem("RajiSettings"));
if (settings) {
  lang = Object.entries(settings.language).find(
    (element) => element[1] === "on"
  )[0];
} else {
  lang = "english";
}

i18n.use(Backend).init({
  lng: lang || "english",
  supportedLanguages: ["english", "russian", "belarusian"],
  fallbackLng: "russian",
  reloadResources: true,
  backend: {
    loadPath: "./locales/{{lng}}/translation.json",
  },
  initImmediate: false,
});

setSettingsList();
showTime();
setLocalStorage();
getBg();
getWeather();
loadQuote();
player();
Todo();
new Settings("div", "settings closed", document.body);
