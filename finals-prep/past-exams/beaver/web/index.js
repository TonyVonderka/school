/**
 * Praktická maturitní zkouška: Bobr
 * Skript: Hlavní herní logika, ovládání DOMu a počítání skóre
 * Autor: Antonín Vonderka
 * Datum: 2026 / 04
 */

let score = 0;
let lastHole = null;

const scoreDisplay = document.getElementById("score");
const allBeavers = document.querySelectorAll(".game__beaver");

/**
 * Vygeneruje náhodné číslo v zadaném rozmezí
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Vybere náhodného bobra a zajistí, aby se neobjevil dvakrát po sobě ve stejné noře.
 */
function getRandomBeaver(beavers) {
  const index = Math.floor(Math.random() * beavers.length);
  const selectedBeaver = beavers[index];

  if (selectedBeaver === lastHole) {
    return getRandomBeaver(beavers);
  }

  lastHole = selectedBeaver;
  return selectedBeaver;
}

/**
 * Hlavní herní smyčka: Zobrazí bobra a naplánuje jeho skrytí a zobrazení dalšího.
 */
function showBeaver() {
  const showTime = getRandomNumber(600, 900);
  const waitTime = getRandomNumber(900, 2300);
  const beaver = getRandomBeaver(allBeavers);

  beaver.classList.add("game__beaver--active");

  setTimeout(() => {
    beaver.classList.remove("game__beaver--active");

    setTimeout(() => {
      showBeaver();
    }, waitTime);
  }, showTime);
}

allBeavers.forEach((beaver) => {
  beaver.addEventListener("mousedown", function () {
    if (this.classList.contains("game__beaver--active")) {
      score++;
      scoreDisplay.textContent = score.toString().padStart(5, "0");

      this.classList.remove("game__beaver--active");
    }
  });
});

showBeaver();
