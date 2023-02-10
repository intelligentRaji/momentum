import { showDate } from "./date.js";
import showGreeting from "./greeting.js";
import { hideSetction } from "./utils.js";

export function showTime() {
  const time = document.querySelector(".time");
  hideSetction(time);
  const settings = JSON.parse(localStorage.getItem("RajiSettings"));
  const lang = Object.entries(settings.language).find(
    (element) => element[1] === "on"
  )[0];
  let format = new Date();
  if (lang === "english") {
    time.textContent = new Intl.DateTimeFormat(["en-UK"], {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(format);
  } else {
    time.textContent = new Intl.DateTimeFormat(["ru-RU"], {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(format);
  }
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
