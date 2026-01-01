"use strict";

/* 🌱 PERSONALIZE THESE */
const MEMORY_YEAR = 2025;
const NICKNAME = "mera besan ka laddoo";       // lowercase recommended
const LAST_WORD = "i love you so much"; // lowercase recommended

/* Utility */
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* Love page */
const noBtn = document.getElementById("noBtn");
function moveNo() {
  const box = document.querySelector(".love-buttons");
  noBtn.style.left = Math.random() * (box.clientWidth - 80) + "px";
  noBtn.style.top = Math.random() * (box.clientHeight - 40) + "px";
}
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

function loveYes() {
  show("p1");
}

/* Page logic */
function page1() {
  if (+yearInput.value === MEMORY_YEAR) show("p2");
  else alert("That year remembers something.");
}

function page2() {
  if (+logicInput.value === MEMORY_YEAR * 3 - 5) show("p3");
  else alert("Think gently.");
}

function page3() {
  if (nicknameInput.value.trim().toLowerCase() === NICKNAME) {
    show("p4");
  } else {
    alert("Say it the way you used to.");
  }
}

function page4() {
  if (lastWordInput.value.trim().toLowerCase() === LAST_WORD) {
    show("p5");
    initPuzzle();
  } else {
    alert("We always ended with something softer.");
  }
}

/* 🧩 Jigsaw Puzzle */
const size = 3;
let tiles = [];
let dragged = null;

function initPuzzle() {
  const puzzle = document.getElementById("puzzle");
  puzzle.innerHTML = "";
  tiles = [];

  const order = [...Array(9).keys()].sort(() => Math.random() - 0.5);

  order.forEach((pos, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.style.backgroundImage = "url('assets/memory.jpg')";
    tile.style.backgroundSize = "320px 320px";
    tile.style.backgroundPosition =
      `${-(pos % 3) * 106}px ${-Math.floor(pos / 3) * 106}px`;

    tile.addEventListener("dragstart", () => dragged = tile);
    tile.addEventListener("dragover", e => e.preventDefault());
    tile.addEventListener("drop", () => swap(tile));

    puzzle.appendChild(tile);
    tiles.push(tile);
  });
}

function swap(target) {
  if (!dragged || dragged === target) return;

  const temp = dragged.style.backgroundPosition;
  dragged.style.backgroundPosition = target.style.backgroundPosition;
  target.style.backgroundPosition = temp;

  dragged = null;
  checkSolved();
}

function checkSolved() {
  if (tiles.every((tile, i) =>
    tile.style.backgroundPosition ===
    `${-(i % 3) * 106}px ${-Math.floor(i / 3) * 106}px`
  )) {
    setTimeout(() => show("final"), 900);
  }
}
