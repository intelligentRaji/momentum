import { showDate } from "./date.js";
import showGreeting from "./greeting.js";

export function showTime() {
  const time = document.querySelector(".time");
  let format = new Date();
  time.textContent = new Intl.DateTimeFormat(["ru-RU", "en-US", "en-UK"], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(format);
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
