const button = document.getElementById("button");
const navbar = document.getElementById("navbar");
const list = document.getElementById("list");

button.addEventListener("click", () => {
  navbar.classList.toggle("translate-x-full");
});

list.addEventListener("click", () => {
  navbar.classList.toggle("translate-x-full");
});