/**
 * Praktická maturitní zkouška: Karty
 * Skript: Hlavní herní logika
 * Autor: Antonín Vonderka
 * Datum: 2026 / 04
 */

const cards = document.querySelectorAll(".game__card--symbol");
const hiddenCard = document.querySelector(".game__card--hidden");
const resultText = document.getElementById("resultText");

const symbols = ["♠️", "♥️", "♣️"];
let selectedSymbol = "";
let isClickable = true;

/**
 * Spustí nové kolo hry.
 * Obnoví výchozí texty, vylosuje nový náhodný symbol a skryje hádanou kartu.
 */
function startNewRound() {
  isClickable = true;
  resultText.textContent = "Vyber kartu!";
  resultText.style.color = "var(--light-clr)";

  selectedSymbol = symbols[Math.floor(Math.random() * symbols.length)];

  hiddenCard.style.backgroundColor = "var(--indigo-clr)";
  hiddenCard.textContent = "";
}

/**
 * Zpracovává událost kliknutí na kartu.
 * Zjistí symbol z kliknuté karty, odhalí hádanou kartu a vyhodnotí výsledek.
 */
function handleCardClick(event) {
  if (!isClickable) return;
  isClickable = false;

  const clickedCard = event.currentTarget;
  const clickedSymbol = clickedCard.textContent.trim();

  hiddenCard.style.backgroundColor = "var(--light-clr)";
  hiddenCard.textContent = selectedSymbol;

  if (clickedSymbol === selectedSymbol) {
    resultText.textContent = "Správně! Uhádl jsi.";
    resultText.style.color = "var(--green-clr)";
  } else {
    resultText.textContent = "Špatně! Zkus to znovu.";
    resultText.style.color = "var(--red-clr)";
  }

  setTimeout(startNewRound, 2000);
}

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});

startNewRound();
