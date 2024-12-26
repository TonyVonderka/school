const gridContainer = document.querySelector(".grid-container");
const robotKarel = document.querySelector(".robot-karel");

let position = { x: 1, y: 1 };
let direction = "right"; // "right", "down", "left", "up"
document.querySelector(".direction").textContent = `Direction: ${direction}`;

for (let i = 1; i <= 99; i++) {
  const square = document.createElement("div");
  square.className = "square";
  gridContainer.appendChild(square);
}

function updateKarelPosition() {
  robotKarel.style.gridColumn = position.x;
  robotKarel.style.gridRow = position.y;
}

function executeCommands() {
  const myCommands = document.getElementById("command-input").value.split("\n");
  myCommands.forEach((cmd) => {
    const parts = cmd.trim().toLowerCase().split(" ");
    const action = parts[0];
    const parameter = parseInt(parts[1]) || 1;

    if (action === "krok") {
      stepKarel(parameter);
    } else if (action === "vlevobok") {
      turnLeft(parameter);
    } else if (action === "vpravobok") {
      turnRight();
    } else if (action === "poloz") {
      placeItem(parts[1]);
    } else if (action === "reset") {
      reset();
    }
  });
}

function stepKarel(steps) {
  for (let i = 0; i < steps; i++) {
    if (direction === "right" && position.x < 10) position.x++;
    else if (direction === "down" && position.y < 10) position.y++;
    else if (direction === "left" && position.x > 1) position.x--;
    else if (direction === "up" && position.y > 1) position.y--;
    updateKarelPosition();
  }
}

function turnLeft(times) {
  const directions = ["right", "down", "left", "up"];
  for (let i = 0; i < times; i++) {
    const currentIndex = directions.indexOf(direction);
    direction = directions[(currentIndex + 3) % 4];
  }

  document.querySelector(".direction").textContent = `Direction: ${direction}`;
}

function placeItem(item) {
  const gridIndex = (position.y - 1) * 10 + position.x - 1;
  const gridSquare = gridContainer.children[gridIndex];
  const isColor = CSS.supports("color", item.toLowerCase());
  if (isColor) {
    gridSquare.style.backgroundColor = item.toLowerCase();
  } else {
    gridSquare.textContent = item.toUpperCase();
  }
}

function reset() {
  position = { x: 1, y: 1 };
  direction = "right";
  Array.from(gridContainer.children).forEach((square, index) => {
    if (square !== robotKarel) {
      square.textContent = "";
      square.style.backgroundColor = "white";
    }
  });
  updateKarelPosition();
}
