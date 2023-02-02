import { showDate } from "./date.js";
import showGreeting from "./greeting.js";
import { hideSetction } from "./utils.js";

export function showTime() {
  const time = document.querySelector(".time");
  hideSetction(time);
  let format = new Date();
  time.textContent = new Intl.DateTimeFormat(["ru-RU"], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(format);
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
