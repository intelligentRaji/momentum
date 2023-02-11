import { hideSetction } from "./utils.js";
import i18n from "i18next";

export default function showGreeting() {
  let time = new Date();
  const greeting = document.querySelector(".greeting");
  greeting.classList.add("lng");
  const greetingContainer = document.querySelector(".greeting-container");
  hideSetction(greetingContainer);
  let greetPhrases = ["night", "morning", "afternoon", "evening"];
  greeting.id = greetPhrases[Math.floor(time.getHours() / 6)];
  greeting.textContent = i18n.t(greeting.id);
}
