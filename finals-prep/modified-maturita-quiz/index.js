/**
 * GLOBÁLNÍ PROMĚNNÉ
 */
let hwData = [],
  swData = [];
let currentQuizQueue = [],
  currentQuestionIndex = 0,
  score = 0;

/**
 * DOM ELEMENTY
 */
const htmlElement = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".icon");

const navBtns = {
  quiz: document.getElementById("nav-quiz"),
  review: document.getElementById("nav-review"),
};
const sections = {
  quiz: document.getElementById("quiz-section"),
  review: document.getElementById("review-section"),
};

const quizSetup = document.getElementById("quiz-setup");
const quizContainer = document.getElementById("quiz-container");
const quizResult = document.getElementById("quiz-result");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const categorySelect = document.getElementById("quiz-category");
const countInput = document.getElementById("quiz-count");
const maxCountDisplay = document.getElementById("max-count-display");

/**
 * TÉMA (DARK / LIGHT MODE)
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

function setTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

/**
 * NAČTENÍ DAT A INICIALIZACE
 */
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  try {
    const [hwRes, swRes] = await Promise.all([
      fetch("./data/hw.json"),
      fetch("./data/sw.json"),
    ]);
    hwData = (await hwRes.json()).map((q) => ({ ...q, category: "HW" }));
    swData = (await swRes.json()).map((q) => ({ ...q, category: "SW" }));

    updateMaxCount();
    renderReview("all");
  } catch (e) {
    console.error("Data error:", e);
    document.getElementById("review-container").innerHTML =
      '<p style="color: red;">Nepodařilo se načíst data.</p>';
  }
});

/**
 * LOGIKA NAVIGACE A NASTAVENÍ MAXIMA OTÁZEK
 */
function switchTab(tab) {
  Object.values(navBtns).forEach((btn) => btn.classList.remove("active"));
  Object.values(sections).forEach((sec) => sec.classList.add("hidden"));

  navBtns[tab].classList.add("active");
  sections[tab].classList.remove("hidden");
}

navBtns.quiz.addEventListener("click", () => switchTab("quiz"));
navBtns.review.addEventListener("click", () => switchTab("review"));

function updateMaxCount() {
  const cat = categorySelect.value;
  let poolLength = 0;
  if (cat === "hw") poolLength = hwData.length;
  else if (cat === "sw") poolLength = swData.length;
  else poolLength = hwData.length + swData.length;

  maxCountDisplay.textContent = poolLength;
  countInput.max = poolLength;

  if (parseInt(countInput.value) > poolLength) {
    countInput.value = poolLength;
  }
}

categorySelect.addEventListener("change", updateMaxCount);

/**
 * LOGIKA KVÍZU
 */
document.getElementById("start-btn").addEventListener("click", () => {
  const cat = categorySelect.value;
  let pool =
    cat === "hw" ? hwData : cat === "sw" ? swData : [...hwData, ...swData];

  let desiredCount = parseInt(countInput.value);
  if (isNaN(desiredCount) || desiredCount < 10) desiredCount = 10;
  if (desiredCount > pool.length) desiredCount = pool.length;

  currentQuizQueue = pool
    .sort(() => Math.random() - 0.5)
    .slice(0, desiredCount);

  currentQuestionIndex = 0;
  score = 0;

  quizSetup.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  document.getElementById("total-q-num").textContent = currentQuizQueue.length;
  showQuestion();
});

function showQuestion() {
  const q = currentQuizQueue[currentQuestionIndex];
  document.getElementById("current-q-num").textContent =
    currentQuestionIndex + 1;
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("feedback").className = "hidden";
  nextBtn.classList.add("hidden");
  answersContainer.innerHTML = "";

  Object.entries(q.answers).forEach(([key, text]) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = `${key}: ${text}`;
    btn.onclick = () => handleAnswer(key, btn);
    answersContainer.appendChild(btn);
  });
}

function handleAnswer(selectedKey, btn) {
  const q = currentQuizQueue[currentQuestionIndex];
  const isCorrect = selectedKey === q.correct;
  const feedback = document.getElementById("feedback");

  Array.from(answersContainer.children).forEach((b) => (b.disabled = true));

  if (isCorrect) {
    btn.classList.add("correct");
    feedback.textContent = "Výborně! Správná odpověď.";
    feedback.className = "success";
    score++;
  } else {
    btn.classList.add("wrong");
    feedback.textContent = `Špatně. Správně bylo ${q.correct}.`;
    feedback.className = "error";
  }

  if (q.explanation) {
    const expl = document.createElement("div");
    expl.className = "explanation-box";
    expl.innerHTML = `<strong>Vysvětlení:</strong> ${q.explanation}`;
    answersContainer.appendChild(expl);
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuizQueue.length) showQuestion();
  else endQuiz();
});

document.getElementById("end-early-btn").addEventListener("click", () => {
  const isCurrentAnswered = !nextBtn.classList.contains("hidden");

  const playedCount = isCurrentAnswered
    ? currentQuestionIndex + 1
    : currentQuestionIndex;

  currentQuizQueue = currentQuizQueue.slice(0, playedCount);

  endQuiz();
});

function endQuiz() {
  quizContainer.classList.add("hidden");
  quizResult.classList.remove("hidden");
  document.getElementById("score-display").textContent = score;
  document.getElementById("score-total").textContent = currentQuizQueue.length;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  quizResult.classList.add("hidden");
  quizSetup.classList.remove("hidden");
});

/**
 * PŘEHLED (REVIEW)
 */
function renderReview(filter) {
  const container = document.getElementById("review-container");
  container.innerHTML = "";
  let pool =
    filter === "hw"
      ? hwData
      : filter === "sw"
        ? swData
        : [...hwData, ...swData];

  pool.forEach((q) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
            <div class="review-question"><span class="tag">${q.category}</span> ${q.question}</div>
            <p class="review-answer">✔ ${q.correct}: ${q.answers[q.correct]}</p>
            ${q.explanation ? `<div class="explanation-box">${q.explanation}</div>` : ""}
        `;
    container.appendChild(div);
  });
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    renderReview(e.target.dataset.filter);
  });
});
