import { hideSetction } from "./utils.js";

export function showDate() {
  const date = document.querySelector(".date");
  hideSetction(date);
  let format = new Date();
  date.textContent = new Intl.DateTimeFormat(["en-US", "en-UK"], {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(format);
}
