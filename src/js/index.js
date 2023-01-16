import "../css/owfont-regular.css";
import "../css/style.css";
import { showTime } from "./time.js";
import setLocalStorage from "./name.js";
import getBg from "./bg.js";
import getWeather from "./weather.js";
import loadQuote from "./quotes.js";
import player from "./player.js";

showTime();
setLocalStorage();
getBg();
getWeather();
loadQuote();
player();
