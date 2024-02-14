let currFoxTile;
let score = 0;
let misses = 0;
let gameOver = false;
let foxInterval;
let hitSound = new Audio("pop.mp3");
let gameOverSound = new Audio("game_over.mp3");
let intervalTime = 1000; // Initial interval time for fox appearance

window.onload = function () {
  setGame();
};

function setGame() {
  // Set up the grid in HTML
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setFox() {
  if (gameOver) {
    return;
  }
  if (currFoxTile) {
    currFoxTile.innerHTML = "";
    misses++;
    if (misses >= 3) {
      endGame();
      return;
    }
  }
  let fox = document.createElement("img");
  fox.src = "./fox.png";

  let num = getRandomTile();
  currFoxTile = document.getElementById(num);
  currFoxTile.appendChild(fox);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currFoxTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
    misses = 0;
    hitSound.play(); // Play the hit sound
    // Adjust interval time based on the score
    if (score >= 50) {
      intervalTime = 500;
    } else if (score >= 100) {
      intervalTime = 700;
    } else if (score >= 150) {
      intervalTime = 1000;
    }
    clearInterval(foxInterval);
    foxInterval = setInterval(setFox, intervalTime); // Set the new interval
  }
}

function startGame() {
  foxInterval = setInterval(setFox, intervalTime); // Start with initial interval time
}

function stopGame() {
  clearInterval(foxInterval);
  gameOver = true;
}

function startOver() {
  clearInterval(foxInterval);
  gameOver = false;
  score = 0;
  misses = 0;
  document.getElementById("score").innerText = score.toString();
}

function endGame() {
  clearInterval(foxInterval);
  gameOver = true;
  document.getElementById("score").innerText = "GAME OVER: " + score.toString();
  gameOverSound.play(); // Play the game over sound
}
