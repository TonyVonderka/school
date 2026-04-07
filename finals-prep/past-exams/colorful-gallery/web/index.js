/**
 * Praktická maturitní zkouška: Barevná galerie
 * Skript: Hlavní logika galerie
 * Autor: Antonín Vonderka
 * Datum: 2026 / 04
 */

const themeButtons = document.querySelectorAll(".header__theme--btn");

themeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const theme = e.target.getAttribute("data-theme-set");
    document.documentElement.setAttribute("data-theme", theme);
  });
});

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery__item img");

galleryImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    modal.style.display = "flex";
    modalImg.src = e.target.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
