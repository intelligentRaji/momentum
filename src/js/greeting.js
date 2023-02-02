import { hideSetction } from "./utils.js";

export default function showGreeting() {
  let time = new Date();
  const greeting = document.querySelector(".greeting");
  const greetingContainer = document.querySelector(".greeting-container");
  hideSetction(greetingContainer);
  let greetPhrases = [
    "Good night",
    "Good morning",
    "Good afternoon",
    "Good evening",
  ];
  greeting.textContent = `${greetPhrases[Math.floor(time.getHours() / 6)]},`;
}
