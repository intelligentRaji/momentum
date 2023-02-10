import { hideSetction } from "./utils.js";
import i18n from "i18next";

export async function showDate() {
  const date = document.querySelector(".date");
  hideSetction(date);
  let format = new Date();
  if (i18n.language === "english") {
    date.textContent = new Intl.DateTimeFormat(["en-UK"], {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(format);
  } else if (i18n.language === "russian") {
    date.textContent = new Intl.DateTimeFormat(["ru-RU"], {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(format);
  } else if (i18n.language === "belarusian") {
    date.textContent = new Intl.DateTimeFormat(["be-BY"], {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(format);
  }
}
