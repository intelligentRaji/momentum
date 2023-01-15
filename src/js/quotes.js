export default async function loadQuote() {
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeQuote = document.querySelector(".change-quote");

  async function downloadQuotes() {
    const quotes = "quotes.json";
    let res = await fetch(quotes);
    let data = await res.json();

    let number = Math.floor(0 + Math.random() * data.length);

    quote.textContent = data[number].text;
    author.textContent = data[number].author;
  }

  downloadQuotes();

  changeQuote.addEventListener("click", downloadQuotes);
}
