import { hideSetction } from "./utils.js";
import i18n from "i18next";

export default async function loadQuote() {
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeQuote = document.querySelector(".change-quote");
  const quotes = document.querySelector(".quotes");
  hideSetction(quotes);

  async function downloadQuotes() {
    const quotes = "quotes.json";
    let res = await fetch(quotes);
    let data = await res.json();

    let number = Math.floor(Math.random() * data.length);

    quote.classList.add("lng");
    author.classList.add("lng");
    quote.id = `text${number}`;
    author.id = `author${number}`;
    i18n.on("loaded", () => {
      quote.textContent = i18n.t(quote.id);
      author.textContent = i18n.t(author.id);
    });
  }

  async function changeQuotes() {
    const quotes = "quotes.json";
    let res = await fetch(quotes);
    let data = await res.json();

    let number = Math.floor(Math.random() * data.length);
    quote.id = `text${number}`;
    author.id = `author${number}`;
    quote.textContent = i18n.t(quote.id);
    author.textContent = i18n.t(author.id);
  }

  downloadQuotes();

  changeQuote.addEventListener("click", changeQuotes);
}
